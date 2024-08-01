import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  private _toastr = inject(ToastrService);
 
  handleError(error: HttpErrorResponse, detail: string) {
    this._toastr.error(detail, 'error');
    return throwError(() => new Error(detail, error.error));
  }

}
