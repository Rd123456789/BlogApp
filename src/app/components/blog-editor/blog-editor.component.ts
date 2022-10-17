import { Component, OnInit, OnDestroy } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Post } from "src/app/models/post";
import { DatePipe } from "@angular/common";
import { BlogService } from "src/app/services/blog.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AppUser } from "src/app/models/appuser";
import { AuthService } from "src/app/services/auth.service";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AngularFireStorage, AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask } from "@angular/fire/compat/storage";

@Component({
  selector: "app-blog-editor",
  templateUrl: "./blog-editor.component.html",
  styleUrls: ["./blog-editor.component.scss"],
  providers: [DatePipe],
})
export class BlogEditorComponent implements OnInit, OnDestroy {
  public Editor = ClassicEditor;
  ckeConfig: any;
  postData = new Post();
  blog:Post
  formTitle = "Add";
  postId;
  appUser: AppUser;
  private unsubscribe$ = new Subject<void>();
  private downloadUrl:Observable<string>;
  private angularref :AngularFireStorageReference
  public snapshot :Observable<any>
  private task_url : AngularFireUploadTask
  image :string

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private blogService: BlogService,
    private router: Router,
    private authService: AuthService,
    private store: AngularFireStorage,
    
    // private ref_url = AngularFireStorageModule
  ) {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: ParamMap) => {
        this.postId = params.get("id");
      });
  }

  ngOnInit() {
    this.authService.appUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((appUser) => (this.appUser = appUser));

    this.setEditorConfig();
    if (this.postId) {
      this.formTitle = "Edit";
      this.blogService
        .getPostbyId(this.postId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((result) => {
          this.setPostFormData(result);
        });
    }
  }
  setPostFormData(postFormData) {
    this.postData.title = postFormData.title;
    this.postData.content = postFormData.content;
    this.postData.photo_url = this.image
  }

  saveBlogPost() {
    if (this.postId) {
      this.blogService.updatePost(this.postId, this.postData).then(() => {
        this.router.navigate(["/"]);
      });
    } else {
      this.postData.createdDate = this.datePipe.transform(
        Date.now(),
        "MM-dd-yyyy HH:mm"
      );
      this.postData.author = this.appUser.name;
      this.blogService.createPost(this.postData).then(() => {
        this.router.navigate(["/"]);
      });
    }
  }
  uploadImg(event){
    const file = event.target.files[0]
    const path = `blogs/${file.name }`
    console.log('any');
    
    if (file.type.split('/')[0]!='image'){
      return alert('Please choose Image !')
      // console.log('not');
      
    }
    else{
      const task = this.store.upload(path,file)
      console.log('file uploaded');
      this.angularref = this.store.ref(path)
      this.task_url = this.angularref.put(file)

      this.downloadUrl = this.angularref.getDownloadURL()
      this.downloadUrl.subscribe(url =>this.image = url)
      console.log(this.image);
      
      
      
      
      // this.downloadUrl.subscribe(url )=>this.blogService)
      
    }
  }

   
  setEditorConfig() {
    this.ckeConfig = {
      removePlugins: ["ImageUpload", "MediaEmbed", "EasyImage"],
      heading: {
        options: [
          
          { model: "Formatted", view: "pre", title: "Formatted" },
        ],
      },
    };
  }

  cancel() {
    this.router.navigate(["/"]);
  }
  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
