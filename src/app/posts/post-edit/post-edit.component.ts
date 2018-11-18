import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  private postID;
  post: Post;
  isLoading = false;

  constructor(private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService) { }

  ngOnInit() {

    this.post = {
      _id: this.postID,
      title: '',
      content: ''
    };


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get('postID')) {
        this.postID = paramMap.get('postID');
        this.postsService.getPostById(this.postID).subscribe((post) => {
            this.post.title = post.title;
            this.post.content = post.content;
        }, (error) => {
          console.log('error', error.message);
        });
      }

    });
  }

  onSavePost(form: NgForm) {

    if (form.invalid) {
      this.snackBar.open('Enter Required Fields', 'OK', {
        duration: 2000,
      });
      return;
    }

    const updatedPost: Post = {
      _id: this.postID,
      title: form.value.postTitle,
      content: form.value.postContent
    };

    this.isLoading = true;
    this.postsService.editPost(updatedPost).subscribe((res) => {
      console.log('res' , res);
      if (res.status === 200) {
        this.postsService.getPosts();
        this.isLoading = false;
        this.router.navigate(['']);
      } else {
        this.isLoading = false;
        this.snackBar.open('Error Updating Post', 'OK', {
          duration: 2000,
        });
        return;
      }
    });
    // form.resetForm();
    // this.postCreated.emit(newPost);

  }

}
