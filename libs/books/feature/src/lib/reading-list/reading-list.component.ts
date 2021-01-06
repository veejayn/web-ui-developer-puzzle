import { undoRemoveFromReadingList } from './../../../../data-access/src/lib/+state/reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.store.dispatch(undoRemoveFromReadingList({ item }));
  }
}
