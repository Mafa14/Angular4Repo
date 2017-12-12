import { Injectable } from '@angular/core';
import { CommonHttpService } from 'services/http-services/common-http-service';
import { ContactUs } from '../models/contact-us.model';

@Injectable()
export class ContactUsService {
    services: CommonHttpService;

    constructor(services: CommonHttpService) {
        this.services = services;
    }

    add(contactUs: ContactUs) {
        return this.services.post('/api/contactus', contactUs);
    }
}