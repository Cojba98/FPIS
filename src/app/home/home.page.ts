import {Component, Input} from '@angular/core';
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

  constructor(private planServis: PlanoviService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
   this.serija = this.route.snapshot.queryParams.serija;
   console.log(this.serija);
  }

}
