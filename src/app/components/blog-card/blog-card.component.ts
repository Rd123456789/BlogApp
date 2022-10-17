import { Component, OnInit, OnDestroy } from "@angular/core";
import { BlogService } from "src/app/services/blog.service";
import { Post } from "src/app/models/post";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CommentService } from "src/app/services/comment.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AppUser } from "src/app/models/appuser";

@Component({
  selector: "app-blog-card",
  templateUrl: "./blog-card.component.html",
  styleUrls: ["./blog-card.component.scss"],
})
export class BlogCardComponent implements OnInit, OnDestroy {
  config: any;
  pageSizeOptions = [];
  blogPost$: Observable<Post[]>;
  store:string = localStorage.getItem('any')
  stylestr:any = "<span class='styl'>&#x27A1;</span>"
  strStore:string = 'assets/garlic.jpg'

  user$ : Observable<AppUser[]>
  
  appUser$ = this.authService.appUser$;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private blogService: BlogService,
  
    private commentService: CommentService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBarService: SnackbarService
  ) {
    this.pageSizeOptions = [100];
   
    this.config = {

      itemsPerPage: this.pageSizeOptions
    };
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: ParamMap) => {
        this.config.currentPage = params.get("100");
        this.blogPost$ = this.blogService.getAllPosts();
      });
      this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe((param2:ParamMap)=>{
        this.config.currentPage = param2.get('100')
        this.user$ = this.blogService.getAllUser()
      });

  }
 

  delete(postId: string) {
    if (confirm("Are you sure?")) {
      this.blogService.deletePost(postId).then(() => {
        this.commentService.deleteAllCommentForBlog(postId);
        this.snackBarService.showSnackBar("Blog post deleted successfully");
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
