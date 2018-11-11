import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postList: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  constructor() { }

  getPosts() {
    return this.postList;
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  addPost(post: Post) {
    this.postList.push(post);
    this.updatedPosts.next([...this.postList]);
  }
}
