import { Component, OnInit } from '@angular/core';
import { BookmarkService } from './services/bookmark-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  bookmarks: any[] = [];
  title = '';
  url = '';
  category = '';
  searchQuery = '';
  errorMessage = '';
  searchTimeout: any;

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit() {
    this.loadBookmarks();
  }

  loadBookmarks() {
    this.bookmarkService.getBookmarks().subscribe({
      next: (data: any) => {
        this.bookmarks = data;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load bookmarks';
      }
    });
  }

  addBookmark() {
    this.errorMessage = '';
    const bookmark = {
      title: this.title,
      url: this.url,
      category: this.category
    };

    this.bookmarkService.addBookmark(bookmark).subscribe({
      next: () => {
        this.loadBookmarks();
        this.title = '';
        this.url = '';
        this.category = '';
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Failed to add bookmark';
      }
    });
  }

  deleteBookmark(id: number) {
    this.bookmarkService.deleteBookmark(id).subscribe({
      next: () => {
        this.loadBookmarks();
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Failed to delete bookmark';
      }
    });
  }

  onSearch() {
    this.errorMessage = '';
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      if (this.searchQuery.length < 2) {
        this.loadBookmarks();
        return;
      }

      this.bookmarkService
        .searchBookmarks(this.searchQuery)
        .subscribe({
          next: (data: any) => {
            this.bookmarks = data;
          },
          error: (err: any) => {
            this.errorMessage = 'Search failed';
          }
        });
    }, 300);
  }
}