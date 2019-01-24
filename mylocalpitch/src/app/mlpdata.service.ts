import { Injectable } from '@angular/core';
import { _ } from 'underscore';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MLPDataService {

  endpoint: string = 'https://api-v2.mylp.info/pitches/';
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getAllPitches(): Observable<any> {
    return this.http.get(this.endpoint + 'products').pipe(
      map(this.extractData));
  }

  // https://api-v2.mylp.info/pitches/32990/slots?filter[starts]=2018-01-09&filter[ends]=2018-01-15
  // https://api-v2.mylp.info/pitches/pitches/32990/slots?filter[starts]=2018-01-09&filter[ends]=2018-01-15
  getSlot(id, startDate, endDate): Observable<any> {
    return this.http.get(this.endpoint + id + '/slots?filter[starts]=' + startDate + '&filter[ends]=' + endDate).pipe(
      map(this.extractData));
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    // if (totalPages <= 10) {
    //     // less than 10 total pages so show all
    //     startPage = 1;
    //     endPage = totalPages;
    // } else {
    //     // more than 10 total pages so calculate start and end pages
    //     if (currentPage <= 6) {
    //         startPage = 1;
    //         endPage = 10;
    //     } else if (currentPage + 4 >= totalPages) {
    //         startPage = totalPages - 9;
    //         endPage = totalPages;
    //     } else {
    //         startPage = currentPage - 5;
    //         endPage = currentPage + 4;
    //     }
    // }
    
    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage+2;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}

}
