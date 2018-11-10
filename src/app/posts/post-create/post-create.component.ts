import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  @Output()
  postCreated = new EventEmitter<Post>();

  constructor() { }

  ngOnInit() {
  }

  onSavePost(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const newPost: Post = {
      title: form.value.postTitle,
      content: form.value.postContent
    };

    this.postCreated.emit(newPost);

  }

}
