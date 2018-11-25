import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-input-rename
  // @Input('posts') postList: Post[] = [];
  postList: Post[] = [];
  posts$: Subscription;
  isLoading = false;

  private isLoggedIn = false;
  private authStatus$: Subscription;

  constructor(private postsService: PostsService,
              private auth: AuthService) { }

  ngOnInit() {
    this.isLoading = true;

    this.postsService.getPosts();

    this.posts$ = this.postsService.getUpdatedPosts().subscribe((posts: Post[]) => {
      this.postList = posts;
      console.log('fetched post -', this.postList);
      this.isLoading = false;
    });

    this.isLoggedIn = this.auth.getLogInState();

    this.authStatus$ = this.auth.getAuthState().subscribe((loginStatus) => {
      this.isLoggedIn = loginStatus;
    });

  }

  deletePost(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.posts$.unsubscribe();
    this.authStatus$.unsubscribe();
  }

}
