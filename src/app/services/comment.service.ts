import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Comments } from "../models/comment";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  constructor(private db: AngularFirestore) {}

  saveComment(comment: Comments) {
    const commentData = JSON.parse(JSON.stringify(comment));
    return this.db.collection("comments").add(commentData);
  }

  getAllCommentsForBlog(blogId: string): Observable<Comments[]> {
    const comments = this.db
      .collection<Comments>("comments", (ref) =>
        ref.where('blogId' ,'==',blogId)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((c) => ({
            commentId: c.payload.doc["id"],
            ...c.payload.doc.data(),
          }));
        })
      );
    console.log((comments));
    return comments
   
    
  }
  getPostbyId(id: string): Observable<Comments> {
    const blogDetails = this.db.doc<Comments>("blogs/" + id).valueChanges();
    return blogDetails;
  }

  deleteAllCommentForBlog(blogId: string) {
    const commentsToDelete = this.db
      .collection("comments", (ref) => ref.where("blogId", "==", blogId))
      .snapshotChanges();

    commentsToDelete.forEach((commentList) => {
      commentList.forEach((comment) => {
        this.db.doc("comments/" + comment.payload.doc["id"]).delete();
      });
    });
  }

  deleteSingleComment(commentId: string) {
    return this.db.doc("comments/" + commentId).delete();
  }
}
