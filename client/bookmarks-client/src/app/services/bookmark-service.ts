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

//addBookmark method
  addBookmark(bookmark: any) {
  return this.http.post(this.apiUrl, bookmark);
}

//searchBookmarks method 
searchBookmarks(query: string) {
  return this.http.get(
    `${this.apiUrl}/search?q=${query}`
  );
}

//deleteBookmark method
deleteBookmark(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
}