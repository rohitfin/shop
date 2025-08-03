import { Component, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../../core/services/product.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ProductListComponent,
    ProductSearchComponent,
    ProductFilterComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {

  products = signal<Product[]>([]);
  productsAfterCartAction = this.products.asReadonly();

  originalProducts: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = signal(false);
  isError = signal(false);
  isNoData = signal(false);

  allProductCount = 0;
  inStockProductCount = 0;
  outOfStockProductCount = 0;

  constructor(private title: Title, private productService: ProductService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  //#region Get Product
  getProduct() {
    this.isLoading.set(true); 
    this.products.set([]); this.allProductCount = 0;
    this.originalProducts = []; this.filteredProducts = [];
    this.productService.observable_Product.subscribe(
      (res: any) => {
        if (res) {
          this.originalProducts = res;
          this.products.set(res);

          this.allProductCount = res.length;
          this.inStockProductCount = this.originalProducts.filter(
            (el) => el.is_in_inventory
          ).length;
          this.outOfStockProductCount = this.originalProducts.filter(
            (el) => !el.is_in_inventory
          ).length;
        } else {
          this.isNoData.set(true);
        }
        this.isLoading.set(false);
      },
      (error: any) => {
        this.isError.set(true);
        this.isLoading.set(false);
      }
    );
  }
  //#endregion

  //#region Search Product
  getSearch(searchText: any) {
    // console.log("Get Search Product ", searchText);

    const query = searchText?.trim().toLowerCase();

    this.isLoading.set(true);
    this.isNoData.set(false);

    const sourceProduct = this.filteredProducts.length > 0 ? this.filteredProducts : this.originalProducts;

    if(!query){
      this.products.set(sourceProduct);
      this.isLoading.set(false);
      return;
    }

    const filtred = sourceProduct.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description
          ?.toLowerCase()
          .includes(searchText.toLowerCase())
    );

    this.products.set(filtred);
    this.isNoData.set(filtred.length === 0);
    this.isLoading.set(false);
  }

  //#endregion

  //#region getFilterProducts
  getFilterProducts(filter: string): void {
    // console.log("Filter from Filter Comp => ", filter);

    let filteredProducts = [];
    if (filter === 'inStock') {
      filteredProducts = this.originalProducts.filter(
        (product) => product.is_in_inventory
      );
    } else if (filter === 'outOfStock') {
      filteredProducts = this.originalProducts.filter(
        (product) => !product.is_in_inventory
      );
    } else {
      filteredProducts = this.originalProducts;
    }
    this.filteredProducts = filteredProducts;
    this.products.set(filteredProducts);
  }
  //#endregion


  

}
