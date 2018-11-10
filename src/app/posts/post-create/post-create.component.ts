import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';

  @Output()
  postCreated = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSavePost() {

    const newPost = {
      title: this.enteredTitle,
      content: this.enteredContent
    };

    this.postCreated.emit(newPost);

  }

}
