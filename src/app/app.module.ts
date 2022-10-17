import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { environment, firebaseConfig2 } from "../environments/environment";
import { RouterModule } from "@angular/router";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FormsModule } from "@angular/forms";
// import { HttpClientModule } from "@angular/common/http";
import { NgMaterialModule } from "./ng-material/ng-material.module";
import { NgxPaginationModule } from "ngx-pagination";
import { BlogComponent } from "./components/blog/blog.component";
import { CommentsComponent } from "./components/comments/comments.component";
import { HomeComponent } from "./components/home/home.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { ScrollerComponent } from "./components/scroller/scroller.component";
import { BlogEditorComponent } from "./components/blog-editor/blog-editor.component";
import { BlogCardComponent } from "./components/blog-card/blog-card.component";
import { ExcerptPipe } from "./customPipes/excerpt.pipe";
import { SlugPipe } from "./customPipes/slug.pipe";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
// import { HttpClientModule } from "@angular/common/http";

import { PaginatorComponent } from "./components/paginator/paginator.component";
import { HttpClientModule } from "@angular/common/http";

import { AuthGuard } from "./guards/auth.guard";
import { AdminAuthGuard } from "./guards/admin-auth.guard";
import { ShareIconsModule } from "ngx-sharebuttons/icons";
import { ShareButtonsConfig, ShareModule } from "ngx-sharebuttons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireModule } from "@angular/fire/compat";
import { NewPipePipe } from "./customPipes/new-pipe.pipe";
// import { HttpClientXsrfModule } from "@angular/common/http";
// import {HttpClient} from "@angular/http";



@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    CommentsComponent,
    HomeComponent,
    NavBarComponent,
    ScrollerComponent,
    BlogEditorComponent,
    BlogCardComponent,
    ExcerptPipe,
    SlugPipe,
   

    PaginatorComponent,
    
  ],
  
    
  imports: [
    AngularFireModule.initializeApp(firebaseConfig2),
    AngularFirestoreModule,
    ShareIconsModule,
    NgxPaginationModule,
    HttpClientModule,
    HttpClientModule,
    FontAwesomeModule,
  
    BrowserModule,
    BrowserAnimationsModule,
  
    NgMaterialModule,
    CKEditorModule,
    FormsModule,
    RouterModule.forRoot(
      [
        { path: "", component: HomeComponent, pathMatch: "full" },
        { path: "page/:pagenum", component: HomeComponent },
        {
          path: "addpost",
          component: BlogEditorComponent,
          canActivate: [AuthGuard],
        },
        {
          path: "editpost/:id",
          component: BlogEditorComponent,
          canActivate: [AuthGuard],
        },
        { path: "blog/:id/:slug", component: BlogComponent },
        { path: "**", component: HomeComponent },
      ],
      { relativeLinkResolution: "legacy" }
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
