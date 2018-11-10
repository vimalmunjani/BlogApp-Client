import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  @Output()
  postCreated = new EventEmitter<Post>();

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSavePost(form: NgForm) {

    if (form.invalid) {
      this.snackBar.open('Missing Fields', 'OK', {
        duration: 2000,
      });
      return;
    }

    const newPost: Post = {
      title: form.value.postTitle,
      content: form.value.postContent
    };

    this.postCreated.emit(newPost);

  }

}
