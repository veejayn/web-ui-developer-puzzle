import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.confirmedAddToReadingList({ book })),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ item })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  confirmAddReadingListBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedAddToReadingList),
      concatMap(({ book }) => {
        return this.snackBarOperation(
          book.title + ' has been added to Reading List.',
          'Undo'
        )
          .onAction()
          .pipe(
            map(() =>
              ReadingListActions.removeFromReadingList({
                item: { ...book, bookId: book.id },
              })
            )
          );
      })
    )
  );

  confirmRemoveReadingListBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedRemoveFromReadingList),
      concatMap(({ item }) => {
        return this.snackBarOperation(
          item.title + ' has been removed from Reading List.',
          'Undo'
        )
          .onAction()
          .pipe(
            map(() =>
              ReadingListActions.addToReadingList({
                book: { ...item, id: item.bookId },
              })
            )
          );
      })
    )
  );

  snackBarOperation(message: string, action: string) {
    return this.matSnackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private matSnackBar: MatSnackBar
  ) {}
}
