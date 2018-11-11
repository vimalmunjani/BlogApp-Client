import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  // tslint:disable-next-line:no-input-rename
  // @Input('posts') postList: Post[] = [];
  postList: Post[] = [];
  private postsSub: Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsService.getUpdatedPosts().subscribe((posts: Post[]) => {
      this.postList = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
