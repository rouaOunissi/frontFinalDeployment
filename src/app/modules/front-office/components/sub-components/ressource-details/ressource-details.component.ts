import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../ressource-service/ressource.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ressource-details',
  templateUrl: './ressource-details.component.html',
  styleUrls: ['./ressource-details.component.css']
})
export class RessourceDetailsComponent implements OnInit{

  ressourceContent: string  = ''; 
  fileContent: string  = '';
  qrCodeUrl: string = '';
  constructor(
    private route: ActivatedRoute, // Importer ActivatedRoute
    private ressourceService: RessourceService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) { }

  ressource = {
    idRessource: 0,
    typeR: '',
    description: '',
    idUser: '',
    nbrReact: 0,
    titre: '',
    urlFile: '',
    dateCreation: new Date(),
    fileName: '',
    fileType: '',

  };

  
    ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getRessourceByID(id);
      this.checkUserReaction(id);
      this.checkUserReaction2(id);
      const userId = 1;

      this.ressourceService.checkUserReaction(id, userId).subscribe(
        (hasReacted: boolean) => {
          this.isLiked = hasReacted; // Mettre à jour l'état du cœur
          if (hasReacted) {
            this.reactedRessources.push(id);
          }
        },
        (error) => {
          console.error('Error checking user reaction:', error);
        }
      );
      
    });
  
  }
    
  checkUserReaction(idRessource: number): void {
    const userId = 1;
    this.ressourceService.findReactionByIdReactionAndIdUser(idRessource, userId).subscribe(
      (reaction: any) => {
        if (reaction) {
          this.reactedRessources.push(idRessource);
        }
      },
      (error) => {
        console.error('Error checking user reaction:', error);
      }
    );
  }


  checkUserReaction2(idRessource: number): void {
    const reactionState = localStorage.getItem(`reaction_${idRessource}`);
    if (reactionState === 'liked') {
      this.isLiked = true;
    } else if (reactionState === 'disliked') {
      this.isLiked = false;
    }
  }

  reactedRessources: number[] = [];
  isLiked: boolean = false;
  
  reactToRessource(idRessource: number): void {
    this.ressourceService.reactToRessource(idRessource).subscribe(
      (res) => {
        console.log(res);
        if (!this.isLiked) {
          // Augmenter le nombre de réactions après un like réussi
          this.ressource.nbrReact++; // Incrémenter le nombre de réactions
          this.reactedRessources.push(idRessource);
        } else {
          // Diminuer le nombre de réactions après un dislike
          this.ressource.nbrReact--; // Décrémenter le nombre de réactions
          // Retirer la réaction de la liste
          const index = this.reactedRessources.indexOf(idRessource);
          if (index !== -1) {
            this.reactedRessources.splice(index, 1);
          }
        }
        // Inverser l'état du bouton
        this.isLiked = !this.isLiked;
         // Enregistrer l'état de la réaction dans le stockage local
         localStorage.setItem(`reaction_${idRessource}`, this.isLiked ? 'liked' : 'disliked');
      },
      (error) => {
        console.log(error);
        alert("Try again!");
      }
    );
  }
  
  

  // Méthode pour vérifier si l'utilisateur a réagi à une ressource
  isReacted(idRessource: number): boolean {
    return this.reactedRessources.includes(idRessource);
  }


  getPdfUrl(urlFile: string): SafeResourceUrl {
      const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost/Files/${urlFile}`);
      return sanitizedUrl;
  }

    formatDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: '2-digit' };
      return date.toLocaleDateString('en-GB', options);
    }
    

    getRessourceByID(id: number): void {
    this.ressourceService.getRessourceByID(id).subscribe(
      (data: any) => {
        this.ressource = data;
        this.ressource.dateCreation = new Date(this.ressource.dateCreation); 
        
      const url = this.ressource.urlFile;
      this.generateQrCode();
    
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRessourceContent(url: string): void {
    this.ressourceService.getRessourceContent(url).subscribe(
      (content: string) => {
        this.fileContent = content;
      },
      error => {
        console.error('Failed to fetch file content:', error);
      }
    );
  }

  getFileContent(id: number): void {
    this.ressourceService.getFileContent(id).subscribe(
      (data: any) => {

        const blob = new Blob([data], { type: 'application/octet-stream' });

        const url = window.URL.createObjectURL(blob);
  

        window.open(url, '_blank');
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching file content:', error);
      }
    );
  }
  
  
  deleteRessource(idRessource: number): void {
    console.log(idRessource);
    this.ressourceService.deleteRessource(idRessource).subscribe(
      () => {
        console.log('Ressource deleted successfully!');
        this.router.navigate(['/front/main/ressource']);
      },
      (error) => {
        console.log(error);
      }
    );
  } 
  
  downloadFile(): void {
    if (this.ressource.urlFile) {
        const fileId = this.ressource.urlFile; 
        const fileName = this.ressource.fileName;
        const downloadUrl = `http://localhost:8060/api/v1/download/download/${fileId}/${fileName}`;

        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
        anchor.download = fileName;

        anchor.click();
    }
}

generateQrCode(): void {
  const downloadUrl = `http://localhost:8060/api/qr/generate`;
  this.http.post(downloadUrl, this.ressource, { responseType: 'blob' }).subscribe(
    (data: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.qrCodeUrl = e.target.result;
      };
      reader.readAsDataURL(data);
    },
    (error) => {
      console.error('Error generating QR code:', error);
    }
  );
}



}







