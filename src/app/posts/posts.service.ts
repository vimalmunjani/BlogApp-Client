import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postList: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ status: number, message: string, data: Post[]}>('http://localhost:3000/api/post').subscribe((res) => {
      this.postList = res.data;
      this.updatedPosts.next([...this.postList]);
    });
    return this.postList;
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  addPost(post: Post) {

    this.http.post('http://localhost:3000/api/post', post).subscribe((res) => {
      console.log('res', res);
      this.getPosts();
    });

    // this.postList.push(post);
    // this.updatedPosts.next([...this.postList]);
  }

  deletePost(postId: string) {
    this.http.delete<{ status: number, message: string, data: Post[]}>(`http://localhost:3000/api/post/${postId}`).subscribe(res => {

    if (res.status === 200) {
      const filteredPosts = this.postList.filter((p) => p._id !== postId);
      this.postList = filteredPosts;
      this.updatedPosts.next([...this.postList]);
      return;
    } else {
      console.log('error occured deleting post');
    }

    });
  }
}
