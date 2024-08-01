import { Injectable,Inject } from '@angular/core';
import { BaseApiService } from './base.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseApiService {


  constructor(http: HttpClient) {
    super(http,'todos')
   }
}
