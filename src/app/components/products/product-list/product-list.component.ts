import { Component, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { Product } from '../../../core/models/product';
import { CommonModule } from '@angular/common';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  @Input() product!: Product;

  offcanvasService = inject(NgbOffcanvas);

  selectProduct !: Product;


  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  
  ngOnInit(): void {

  }


  //#region on image error
  defaultImage = 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.defaultImage;
  }
  //#endregion

  //#region product detail btn  
  openProductDetail(content: TemplateRef<any>, selectProduct: Product) {
    this.selectProduct = selectProduct;
    this.offcanvasService.open(content, { position: 'end' });
  }
  //#endregion

  //#region addToCartProduct
  addToCartProduct(newProduct: Product){
    if(newProduct.isCart){
      newProduct["isCart"] = false;
      newProduct["cartQuantity"] = 0;
      this.productService.removeFromCartProduct(newProduct);
    }else {
      newProduct["isCart"] = true;
      newProduct["cartQuantity"] = 1;
      this.productService.addToCartProduct(newProduct);
    }
  }
  //#endregion



}
