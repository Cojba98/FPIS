import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SopstveniProizvod} from "./sopstveni-proizvod";
import {environment} from "../environments/environment";
import {Nalepnica} from "./nalepnica";

@Injectable({
  providedIn: 'root'
})
export class NalepniceService {

  constructor(private http: HttpClient) { }

  uzmiSve(): Observable<Nalepnica[]>{
    let url = environment.apiUrl + 'plan/listaNalepnica';
    return  this.http.get<Nalepnica[]>(url);
  }
}
