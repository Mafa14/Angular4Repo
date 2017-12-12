import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ContactUsService } from '../../services/contact-us.services';
import { ContactUs } from '../../models/contact-us.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactUsForm: FormGroup;
  formBuilder: FormBuilder;
  service: ContactUsService;

  success: boolean;
  process: boolean;

  constructor(formBuilder: FormBuilder, service: ContactUsService) {
    this.formBuilder = formBuilder;
    this.service = service;

    this.success = false;
    this.process = false;

    this.contactUsForm = this.formBuilder.group({
      'ContactName': ['', Validators.compose([Validators.required])],
      'ContactEmail': ['', Validators.compose([Validators.required])],
      'ContactMessage': ['', Validators.compose([Validators.required])]
    });

    // Initialize the bindings on the methods to the current state
    this.onSubmit = this.onSubmit.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.onError = this.onError.bind(this);
  }

  ngOnInit() {
  }

  onSubmit(data: ContactUs): void {
    this.process = true;

    this.service.add(data).subscribe(
      this.onResponse,
      this.onError
    );
  }

  onError(err: any) {
    this.process = false;
    alert(err);
  }

  onResponse(response: any) {
    this.process = false;
    this.success = true;

    alert(response);
  }
}
