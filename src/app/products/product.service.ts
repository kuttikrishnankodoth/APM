import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ProductService {
    private productUrl: string = 'api/products/products.json';
    constructor(private http: HttpClient) {

    }
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(tap(data => console.log(JSON.stringify(data)), catchError(this.handleError)));
    }
    handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An Error occurred: ${err.error.message} `;
        } else {
            errorMessage = `Server returned code:${err.status},error message is:${err.message}`
        }
        console.error(errorMessage);
        return throwError(errorMessage);

    }
}