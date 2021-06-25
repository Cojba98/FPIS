import {AfterContentInit, AfterViewInit, Component, DoCheck, Input, OnChanges} from '@angular/core';
import {PlanoviService} from '../planovi.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  IDPlanova: number[];
  serija: string = 'neutral';
  plan: string = 'neutral';

  constructor(private planServis: PlanoviService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.serija = 'neutral';
    this.plan = 'neutral';
    this.serija = this.route.snapshot.queryParams.serija;
    this.plan = this.route.snapshot.queryParams.plan;
  }


}
