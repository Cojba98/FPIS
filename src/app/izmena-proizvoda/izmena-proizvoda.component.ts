import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SopstveniProizvod} from "../sopstveni-proizvod";
import {SopstveniproizvodService} from "../sopstveniproizvod.service";
import {Nalepnica} from "../nalepnica";
import {NalepniceService} from "../nalepnice.service";
import {ModalController} from "@ionic/angular";
import {PlanService} from "../plan.service";
import {NoviPlanPage} from "../novi-plan/novi-plan.page";

@Component({
  selector: 'app-izmena-proizvoda',
  templateUrl: './izmena-proizvoda.component.html',
  styleUrls: ['./izmena-proizvoda.component.scss'],
})
export class IzmenaProizvodaComponent implements OnInit {

  proizvodi: SopstveniProizvod[] = [];
  nalepnice: Nalepnica[] = [];
  idProizvoda: any;
  idNalepnice: any;
  kolicina: any;

  @Input() roditelj: NoviPlanPage;

  constructor(private proizvodiServis: SopstveniproizvodService, private nalepniceService: NalepniceService, private modalKontroler: ModalController,
              private planServis: PlanService) { }

  ngOnInit() {
  console.log('NG init izmena');

      this.proizvodiServis.uzmiSve().subscribe((proizvodi: SopstveniProizvod[])=>{
        // @ts-ignore
        if(proizvodi.sopstveniProizvod && proizvodi.sopstveniProizvod.length <2){
          // @ts-ignore
          this.proizvodi = Array(proizvodi.sopstveniProizvod);
        }else {
          // @ts-ignore
          this.proizvodi = proizvodi.sopstveniProizvod;
        }

      this.nalepniceService.uzmiSve().subscribe((nalepnice)=>{
        // @ts-ignore
        // @ts-ignore
        if(nalepnice.nalepnica && (!nalepnice.nalepnica.length || nalepnice.nalepnica.length <2)){
          // @ts-ignore
          this.nalepnice = Array(nalepnice.nalepnica);
        }else {
          // @ts-ignore
          this.nalepnice = nalepnice.nalepnica;
        }

      })
    })


  }


  postaviProizvod(){
    if(this.idProizvoda) {
      this.planServis.postaviProizvod(this.idProizvoda).subscribe(() => {
        console.log("Postavljen proizvod: " + this.idProizvoda)
      });
    }
  }

  postaviNalepnicu(){
    if(this.idNalepnice) {
      this.planServis.postaviNalepnicu(this.idNalepnice).subscribe(() => {
        console.log("Postavljena nalepnica: " + this.idNalepnice)
      });
    }
  }

  postaviKolicinu() {
    if (this.kolicina) {
      this.planServis.postaviKolicinu(this.kolicina).subscribe(() => {
        console.log("Postavljena kolicina: " + this.kolicina)
      });
    }
  }

  zatvoriFormu() {
 //   this.planServis.sacuvajIzmene().subscribe(() =>{
      this.modalKontroler.dismiss();
  //  })

  }

  ngOnDestroy(){
    this.roditelj.preuzmiPlaniraneProizvode();
  }




}
