import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EventComponent } from './components/sub-components/event/event.component';
import { CoursComponent } from './components/sub-components/cours/cours.component';
import { ProjetComponent } from './components/sub-components/projet/projet.component';
import { ProblemComponent } from './components/sub-components/problem/problem.component';
import { RessourceComponent } from './components/sub-components/ressource/ressource.component';
import { PaimentComponent } from './components/sub-components/paiment/paiment.component';
import { HomaPageComponent } from './components/homa-page/homa-page.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfilComponent } from './components/user/profil/profil.component';
import { EditProfilComponent } from './components/user/edit-profil/edit-profil/edit-profil.component';
import { ShowRequestComponent } from './components/sub-components/projet/showRequest/show-request/show-request.component';
import { RessourceDetailsComponent } from './components/sub-components/ressource-details/ressource-details.component';
import { RessourceAddComponent } from './components/sub-components/ressource-add/ressource-add.component';
import { RessourceUpdateComponent } from './components/sub-components/ressource-update/ressource-update.component';
import {DisplayVideoComponent} from "./components/sub-components/cours/Rihem/display-video/display-video.component";
import { VideoDisplayerComponent } from 'src/app/video-displayer/video-displayer.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { ForgetPasswordComponent } from './components/user/forget-password/forget-password.component';
import { NotificationsComponent } from './components/sub-components/projet/notifications/notifications.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ChatBotComponent } from './components/sub-components/problem/salim/chat-bot/chat-bot.component';
import { DetailsIssueComponent } from './components/sub-components/problem/salim/details-issue/details-issue.component';
import { UpdateIssueComponent } from './components/sub-components/problem/salim/update-issue/update-issue.component';
import { DisplayAllCommentComponent } from './components/sub-components/problem/salim/display-all-comment/display-all-comment.component';
import { AlertBanComponent } from './components/alert-ban/alert-ban.component';
import { CoursDetailsComponent } from './components/sub-components/cours/Rihem/cours-details/cours-details.component';
import { PaymentIntComponent } from './components/sub-components/purshase/payment-int/payment-int.component';
import { SuccededComponent } from './components/sub-components/purshase/succeded/succeded.component';
import { AccountSellerComponent } from './components/sub-components/purshase/account-seller/account-seller.component';



const routes: Routes = [
  {path : "main" , component:HomaPageComponent,canActivate: [AuthGuardService]
   , children:[
    {path: "event" , component:EventComponent},
    {path: "cours" , component:CoursComponent},
    {path: "project" , component:ProjetComponent ,children:[
      {path:"showRequest" , component:ShowRequestComponent}
    ]},
    {path: "issue" , component:ChatBotComponent },
    {path: "issue/goToissue" , component:ProblemComponent },
    {path: "issue/goToissue/display" ,component:DetailsIssueComponent},
    {path: "issue/goToissue/update-issue/:id_issue" ,component:UpdateIssueComponent},
    {path: "issue/goToissue/displayAllComment/:id_issue" ,component:DisplayAllCommentComponent},
    {path: "issue/goToissue/goToChat" ,component:ChatBotComponent},    {path: "ressource" , component:RessourceComponent},
    {path: "ressourceDetails/:id" , component:RessourceDetailsComponent},
    {path: "ressourceAdd" , component:RessourceAddComponent},
    {path: "ressourceUpdate/:id" , component:RessourceUpdateComponent},
    {path: "finance" , component:PaimentComponent},
    {path:"profil",component:ProfilComponent,children:[
      {path:"editProfil/:id",component:EditProfilComponent},{path:"notification",component:NotificationsComponent}
    ]},
    {path: "display-video" , component:DisplayVideoComponent},
    {path: "display-videoo" , component:VideoDisplayerComponent},
    {path:"course-details/:id",component:CoursDetailsComponent , children:[{path:"purchase",component:PaymentIntComponent}]},
    {path:'succeeded', component:SuccededComponent},
    {path:'accountTotal',component:AccountSellerComponent},
  
  ]},
  {path : "footer" , component:FooterComponent},
  {path: "header" , component:HeaderComponent},
  {path:"login" , component:LoginComponent},
  {path:"register" , component:RegisterComponent},
  {path:"set-password" , component:ChangePasswordComponent},
  {path:"forgetPassword",component:ForgetPasswordComponent},
  {path:"NotFound",component:NotFoundComponent},
  {path:"banAlert",component:AlertBanComponent},
 
   

  
    



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
