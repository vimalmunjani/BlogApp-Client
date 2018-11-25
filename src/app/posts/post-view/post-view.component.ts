import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  private isLoading = false;
  private post: Post;
  private postFetchError = false;
  constructor(private route: ActivatedRoute,
              private postService: PostsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {

      const postID = paramMap.get('postID');
      if (!postID) {
        this.postFetchError = true;
        return;
      }
      this.getPostById(postID);
    });
  }

  getPostById(postID: string): void {

    this.isLoading = true;
    this.postService.getPostById(postID).subscribe((post) => {
        this.post = post;
        this.postFetchError = false;
        this.isLoading = false;
    }, (error) => {
      console.log('from the post view component - ', error);
      this.postFetchError = true;
      this.isLoading = false;
    });

  }

}
