import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;
  service: ProductService;
  isReady:boolean;

  constructor(service: ProductService) {
    this.service = service;
    this.onResponse = this.onResponse.bind(this);
  }

  ngOnInit() {
    this.service.getAll().subscribe(this.onResponse);
  }

  onResponse(products: Array<Product>) {
    this.isReady = true;
    this.products = products;
  }

  searchProduct(product: Product){
    
  }
}
