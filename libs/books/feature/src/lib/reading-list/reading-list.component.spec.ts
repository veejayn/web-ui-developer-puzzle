import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SharedTestingModule,
  createReadingListItem,
} from '@tmo/shared/testing';
import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { Store } from '@ngrx/store';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let dispatchSpy: jest.SpyInstance;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removeFromReadingList action ', () => {
    const item = createReadingListItem('A');
    component.removeFromReadingList(item);
    expect(dispatchSpy).toHaveBeenCalled;
  });

  it('markAsFinishedReadingFromList action', () => {
    const item = createReadingListItem('A');
    component.markAsFinishedReadingFromList(item);
    expect(dispatchSpy).toHaveBeenCalled;
  });
});
