import { Component, OnInit } from '@angular/core';
import {SopstveniProizvod} from "../sopstveni-proizvod";
import {PlaniraniProizvodSerije} from "../planirani-proizvod-serije";
import {ArtiklSerije} from "../artikl-serije";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {
  IDPlana: any;
  proizvodiSerije: PlaniraniProizvodSerije[] = [];
  artikliSerije: ArtiklSerije[] = [];

  constructor() { }

  ngOnInit() {
  }

  sacuvajPlan() {
    
  }
}
