import { Component, OnDestroy } from "@angular/core";
import { Post } from "src/app/models/post";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { BlogService } from "src/app/services/blog.service";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnDestroy {
  postData$: Observable<Post>;
  postId;
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private blogService: BlogService) {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: ParamMap) => {
        this.postId = params.get("id");
        this.postData$ = this.blogService.getPostbyId(this.postId);
      });
     
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
