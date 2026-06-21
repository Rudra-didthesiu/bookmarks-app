import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private apiUrl = 'http://localhost:3000/api/bookmarks';

  constructor(private http: HttpClient) {}

  getBookmarks() {
    return this.http.get(this.apiUrl);
  }
}