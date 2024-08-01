import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, catchError, of, retry } from 'rxjs';
import { environment } from '../../environments/enviroment.local';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApiService {
  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient, public endPoint: string) {}
  public get<T>(): Observable<T> {
    return this.http.get<T>(this.route()).pipe(retry(2));
  }

  public getById<T>(id: string): Observable<T> {
    const url = `${this.route()}?id=${id}`;
    return this.http.get<T>(url).pipe(retry(2));
  }

  /*public getByViewId(id: string): Observable<ViewOnlyType[]> {
    const url = `${this.route()}/GetViewOnly?id=${id}`;
    return this.http.get<ViewOnlyType[]>(url).pipe(retry(2));
  }

  public paginate(data: PaginateQuery): Observable<PaginateResult> {
    return this.http.post<PaginateResult>(this.route() + '/paginate', data).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return of({ total: 0, list: [] });
        } else {
          throw error;
        }
      })
    );
  }*/

  public save<T>(data: T): Observable<T> {
    return this.http.post<T>(this.route(), data).pipe(retry(2));
  }

  public update<T>(data: T): Observable<T> {
    return this.http.put<T>(this.route(), data).pipe(retry(1));
  }

  public delete(id: string): Observable<object> {
    const url = `${this.route()}/${id}`;
    return this.http.delete(url).pipe(retry(2));
  }

  /*public getDropdown(): Observable<DropdownModel[]> {
    return this.http.options<DropdownModel[]>(this.route()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return of([]);
        } else {
          throw error;
        }
      })
    );
  }

  public suggest(term?: string) {
    const query = encodeURIComponent(term || '');
    if (!query) {
      return of([]);
    }
    const url = `${this.route()}/suggest/${query}`;
    return this.http.get<DropdownModel[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return of([]);
        } else {
          throw error;
        }
      })
    );
  }*/
  protected route = (): string => `${this.baseUrl}/${this.endPoint}`;
}
