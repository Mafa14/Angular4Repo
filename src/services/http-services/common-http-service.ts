import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonHttpService {
    http: Http;
    router: Router;
    baseUrl: string;

    constructor(http: Http, router: Router) {
        this.http = http;
        this.router = router;
        this.baseUrl = this.getBaseUrl();
    }

    baseHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    getBaseUrl(): string {
        return 'http://localhost:52878';
    }

    get(url: string): any {
        return this.http.get(
            `${this.baseUrl}${url}`,
            this.getRequestOptions())
            .map(data => data.json())
            .catch(res => this.onError(res));
    }

    getFile(url: string): Observable<Response> {
        return this.http.get(
            `${this.baseUrl}${url}`,
            this.getFileRequestOptions())
            .map(data => {
                return {
                    blob: data.blob(),
                    filename: data.headers.get('FileName'),
                    type: data.headers.get('content-type')
                };
            })
            .catch(res => this.onError(res));
    }

    post(url: string, data: any): Observable<Response> {
        return this.http.post(
            `${this.baseUrl}${url}`,
            JSON.stringify(data),
            this.getRequestOptions())
            .catch(res => this.onError(res));
    }

    postWithFile(url: string, data: any, file: File): Observable<Response> {
        let formData: FormData = new FormData();

        formData.append('file', file, file.name);

        if (data !== "" && data !== undefined && data !== null) {
            for (var property in data) {
                if (data.hasOwnProperty(property)) {
                    formData.append(property, data[property]);
                }
            }
        }

        return this.http.post(
            `${this.baseUrl}${url}`,
            formData,
            this.getFilePostRequestOptions())
            .catch(res => this.onError(res));
    }

    put(url: string, data: any): Observable<Response> {
        return this.http.put(
            `${this.baseUrl}${url}`,
            JSON.stringify(data),
            this.getRequestOptions())
            .catch(res => this.onError(res));
    }

    delete(url: string): Observable<Response> {
        return this.http.delete(
            `${this.baseUrl}${url}`,
            this.getRequestOptions())
            .catch(res => this.onError(res));
    }

    getRequestOptions(): RequestOptions {
        const headers = new Headers(this.baseHeaders);

        return new RequestOptions({
            headers: headers
        });
    }

    getFilePostRequestOptions(): RequestOptions {
        const headers = new Headers();

        return new RequestOptions({
            headers: headers
        });
    }

    getFileRequestOptions(): RequestOptions {
        const headers = new Headers(this.baseHeaders);

        return new RequestOptions({
            headers: headers,
            responseType: ResponseContentType.Blob
        });
    }

    onError(response: any): Observable<any> {
        switch (response.status) {
            default:
                return Observable.throw(response);
        }
    }
}
