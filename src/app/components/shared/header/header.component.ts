import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { CartListComponent } from '../cart-list/cart-list.component';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  imports: [CartListComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  cartCount;
  private offcanvasService = inject(NgbOffcanvas);

  
  ngOnInit(): void {
  }

  constructor(
    private productService: ProductService
  ){
  this.cartCount = this.productService.cartCount;

  }


  openCart(content: TemplateRef<any>, type: string) {
		this.offcanvasService.open(content, { position: 'end', panelClass: 'canvasMedium' });
	}

}
