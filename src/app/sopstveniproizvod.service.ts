import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {SopstveniProizvod} from "./sopstveni-proizvod";
import {environment} from "../environments/environment";
import {PlaniraniProizvodSerije} from "./planirani-proizvod-serije";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SopstveniproizvodService {

  constructor(private http: HttpClient) { }

  uzmiSve(): Observable<SopstveniProizvod[]>{
    let url = environment.apiUrl + 'plan/listaProizvoda';
    return  this.http.get<SopstveniProizvod[]>(url);
  }

}
