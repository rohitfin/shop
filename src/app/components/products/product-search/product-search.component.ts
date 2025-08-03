import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounce, debounceTime, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent implements OnInit, OnDestroy {

  searchText: string = "";
  @Output() sendSearch: EventEmitter<string> = new EventEmitter();

  searchSubject: Subject<string> = new Subject<string>();
  searchDestroy$ = new Subject<void>();


  ngOnInit(): void {

    this.searchSubject.pipe(
      debounceTime(1000), // ✅ Debounce for 300ms
      takeUntil(this.searchDestroy$)   // ✅ Cleanup on destroy
    )
      .subscribe((value: string) => {
        this.sendSearch.emit(value);
      })

  }

  constructor() { }

  ngOnDestroy(): void {
    this.searchDestroy$.next();
    this.searchDestroy$.complete();
  }

  onSearch(event: any): void {
    this.searchText = event.target.value;
    this.searchSubject.next(this.searchText);
  }

}
