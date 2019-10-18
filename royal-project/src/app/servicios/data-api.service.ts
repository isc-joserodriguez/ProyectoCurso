import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiUrl = environment.urlMongo + 'datas';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor() { }
}
