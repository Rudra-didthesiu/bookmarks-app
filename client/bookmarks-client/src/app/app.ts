import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookmarkService } from './services/bookmark-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  bookmarks: any[] = [];

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit() {
    this.bookmarkService.getBookmarks().subscribe((data: any) => {
      this.bookmarks = data;
      console.log(data);
    });
  }
}