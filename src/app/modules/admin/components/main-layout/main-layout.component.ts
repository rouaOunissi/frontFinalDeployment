import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/modules/front-office/services/userService/localStorage/local-storage.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  activeComponent : string = "";
  constructor(private localStorageService: LocalStorageService , private router: Router) {

  }

  title = "Dashboard"
  
  setActiveComponent(componentName: string) {
    this.activeComponent = componentName;
  }

  logout(){
    this.localStorageService.logout();
    this.router.navigateByUrl("/front/login");

  }

}
