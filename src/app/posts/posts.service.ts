import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getPostById(postId: string): Observable<Post> {
    return this.http.get<{ status: number, message: string, data: Post}>(`http://localhost:3000/api/post/${postId}`)
    .pipe(map((res) => {
      return res.data;
    }));
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  addPost(post) {

    console.log('post', post);
   return this.http.post<{ status: number, message: string, data: Post}>('http://localhost:3000/api/post', post);

    // this.postList.push(post);
    // this.updatedPosts.next([...this.postList]);
  }

  editPost(post: Post) {
  console.log('post service - edit post', post);
  return this.http.put<{ status: number, message: string, data: Post}>('http://localhost:3000/api/post', post);

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
