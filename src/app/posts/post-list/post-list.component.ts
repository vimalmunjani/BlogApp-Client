import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('posts') postList = [];

  constructor() { }

  ngOnInit() {

  }

}
