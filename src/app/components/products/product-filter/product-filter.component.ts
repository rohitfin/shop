import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})
export class ProductFilterComponent implements OnInit {

  @Input() allProductCount = 0;
  @Input() inStockProductCount = 0;
  @Input() outOfStockProductCount = 0;

  @Output() sendFilter: EventEmitter<string> = new EventEmitter<string>();


  ngOnInit(): void {
  }


  filterProducts(filter: string){
    this.sendFilter.emit(filter);
  }

}
