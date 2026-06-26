import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { BookmarkService } from './bookmark-service';

describe('BookmarkService', () => {
  let service: BookmarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(BookmarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
