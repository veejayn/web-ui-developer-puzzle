import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit {
  books$ = this.store.pipe(select(getAllBooks));

  /*
    Creating a suscription for Instant Search value Changes
  */
  instantSearchSubscription: Subscription;

  searchForm = this.fb.group({
    term: '',
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    /*
      Instant Search Subscription if Value Changes in the searchForm (term)
    */
    this.instantSearchSubscription = this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchKey) => {
        if (searchKey.term) {
          this.searchBooks();
        } else {
          this.store.dispatch(clearSearch());
        }
      });
  }

  /*
    OnDestroy is used to destroy any subscriptions that has been subscribed
  */
  ngOnDestroy(): void {
    if (this.instantSearchSubscription) {
      this.instantSearchSubscription.unsubscribe();
    }
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
