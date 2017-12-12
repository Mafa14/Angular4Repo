import { Injectable } from '@angular/core';
import { CommonHttpService } from 'services/http-services/common-http-service';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
    services: CommonHttpService;

    constructor(services: CommonHttpService) {
        this.services = services;
    }

    getAll() {
        return this.services.get('/api/product/');
    }

    add(product: Product) {
        return this.services.post('/api/product', product);
    }

    update(product: Product) {
        return this.services.put('/api/product', product);
    }

    delete(id: string) {
        return this.services.delete('/api/product/' + id);
    }
}