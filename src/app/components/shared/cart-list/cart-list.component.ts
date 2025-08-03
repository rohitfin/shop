import { Component, OnInit, WritableSignal } from '@angular/core';
import { Product } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-cart-list',
  imports: [],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent implements OnInit {

  constructor(
    public productService: ProductService,
  ) { 
    
  }
  
  ngOnInit(): void {
  }

  removeProduct(product: Product){
    this.productService.removeFromCartProduct(product);
  }

  addQuantity(product: Product){
    this.productService.addProductQuantity(product);
  }

  removeQuantity(product: Product){
    this.productService.removeProductQuantity(product);
  }



}
