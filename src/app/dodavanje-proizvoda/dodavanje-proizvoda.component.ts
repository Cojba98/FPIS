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
  selector: 'app-dodavanje-proizvoda',
  templateUrl: './dodavanje-proizvoda.component.html',
  styleUrls: ['./dodavanje-proizvoda.component.scss'],
})
export class DodavanjeProizvodaComponent implements OnInit, OnDestroy {

  proizvodi: SopstveniProizvod[] = [];
  nalepnice: Nalepnica[] = [];
  idProizvoda: number;
  idNalepnice: number;
  kolicina: number;
  @Input() roditelj: NoviPlanPage;

  constructor(private proizvodiServis: SopstveniproizvodService, private nalepniceService: NalepniceService, private modalKontroler: ModalController,
              private planServis: PlanService) { }

  ngOnInit() {

    this.planServis.kreirajNoviProizvod().subscribe(()=>{
      this.proizvodiServis.uzmiSve().subscribe((proizvodi: SopstveniProizvod[])=>{
        // @ts-ignore
        if(proizvodi.sopstveniProizvod.length <2){
          // @ts-ignore
          this.proizvodi = Array(proizvodi.sopstveniProizvod);
        }else {
          // @ts-ignore
          this.proizvodi = proizvodi.sopstveniProizvod;
        }
      })

      this.nalepniceService.uzmiSve().subscribe((nalepnice)=>{
        // @ts-ignore
        // @ts-ignore
        if(!nalepnice.nalepnica.length || nalepnice.nalepnica.length <2){
          // @ts-ignore
          this.nalepnice = Array(nalepnice.nalepnica);
        }else {
          // @ts-ignore
          this.nalepnice = nalepnice.nalepnica;
        }
      })
    })




  }

  dodajProizvod() {
    this.planServis.dodajProizvod().subscribe(()=>{
      this.idProizvoda = undefined;
      this.idNalepnice = undefined;
      this.kolicina = undefined;
      this.planServis.kreirajNoviProizvod().subscribe(()=>{

      })
    });
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
    this.modalKontroler.dismiss();
  }

  ngOnDestroy(){
    this.roditelj.preuzmiPlaniraneProizvode();
  }

}
