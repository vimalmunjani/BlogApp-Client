import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  @Output()
  postCreated = new EventEmitter<Post>();

  constructor(private snackBar: MatSnackBar,
    private postsService: PostsService) { }

  ngOnInit() {
  }

  onSavePost(form: NgForm) {

    if (form.invalid) {
      this.snackBar.open('Enter Required Fields', 'OK', {
        duration: 2000,
      });
      return;
    }

    const newPost: Post = {
      title: form.value.postTitle,
      content: form.value.postContent
    };

    this.postsService.addPost(newPost);
    form.resetForm();
    // this.postCreated.emit(newPost);

  }

}
