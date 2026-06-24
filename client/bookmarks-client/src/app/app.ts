import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookmarkService } from './services/bookmark-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
// Define properties for bookmarks
  bookmarks: any[] = [];
title = '';
url = '';
category = '';
searchQuery = '';

  constructor(private bookmarkService: BookmarkService) {}

ngOnInit() {
  this.loadBookmarks();
}
// load bookmark method
loadBookmarks() {
  this.bookmarkService.getBookmarks().subscribe((data: any) => {
    this.bookmarks = data;
  });
}
// add bookmark method
addBookmark() {
  const bookmark = {  
    title: this.title,
    url: this.url,
    category: this.category
  };

  this.bookmarkService.addBookmark(bookmark).subscribe(() => {
    this.loadBookmarks();

    this.title = '';
    this.url = '';
    this.category = '';
  });
}

deleteBookmark(id: number) {
  this.bookmarkService.deleteBookmark(id).subscribe(() => {
    this.loadBookmarks();
  });
}

onSearch() {

  if (this.searchQuery.length < 2) {
    this.loadBookmarks();
    return;
  }

  this.bookmarkService
    .searchBookmarks(this.searchQuery)
    .subscribe((data: any) => {
      this.bookmarks = data;
    });
}

}