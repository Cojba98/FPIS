import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {PlaniraniProizvodSerije} from "../planirani-proizvod-serije";
import {ArtiklSerije} from "../artikl-serije";
import {LoadingController, ModalController} from "@ionic/angular";
import {DodavanjeProizvodaComponent} from "../dodavanje-proizvoda/dodavanje-proizvoda.component";
import {PlanService} from "../plan.service";
import {Router} from "@angular/router";
import {IzmenaProizvodaComponent} from "../izmena-proizvoda/izmena-proizvoda.component";

@Component({
  selector: 'app-novi-plan',
  templateUrl: './novi-plan.page.html',
  styleUrls: ['./novi-plan.page.scss'],
})
export class NoviPlanPage implements OnInit {
  IDPlana: number;
  planiraniProizvodi: PlaniraniProizvodSerije[] = [];
  artikliZaSeriju: ArtiklSerije[] = [];
  mleko: string;

  constructor(private modalController: ModalController, private planServis: PlanService, private router: Router, private loadingController: LoadingController ) {

  }

  ngOnInit() {

  }

  ionViewWillEnter(){

    this.loadingController.create({message: 'Molimo sacekajte...'}).then((loading) => {
      loading.present();
      this.planServis.pokreniUnos().subscribe(()=>{
        console.log("Pokrenut unos novog plana");
        this.planServis.noviIDPlana().subscribe((id)=>{
          this.IDPlana = id;
          loading.dismiss();
        });
      });
    })


  }


  sacuvajPlan() {
  this.planServis.sacuvajPlan().subscribe((ret: boolean)=>{
    console.log("Plan sacuvan: " + ret);
    this.router.navigate([''],{queryParams: {plan: ret}});
  })


  }

  openModal(){
  this.modalController.create({
    component: DodavanjeProizvodaComponent,
    componentProps: {roditelj: this}
  }).then((modal)=>{
    modal.present();
  })
  }

  openModalIzmena(IDArtikla: string, IDNalepnice: string, kolicina: string){
    console.log("openModalIzmena");
    this.modalController.create({
      component: IzmenaProizvodaComponent,
      componentProps: {roditelj: this, idProizvoda : IDArtikla, idNalepnice: IDNalepnice, kolicina: kolicina}
    }).then((modal)=>{
      modal.present();
    })
  }


  preuzmiPlaniraneProizvode(){
    this.planServis.vratiPlaniraneProizvode().subscribe((planiraniProizvodi)=>{
      // @ts-ignore
      if(!planiraniProizvodi.planiraniProizvodSerije.length || planiraniProizvodi.planiraniProizvodSerije.length<2){
        // @ts-ignore
        this.planiraniProizvodi = Array(planiraniProizvodi.planiraniProizvodSerije);
      }else{
        // @ts-ignore
        this.planiraniProizvodi = planiraniProizvodi.planiraniProizvodSerije;
      }
      this.preuzmiArtikleZaSeriju();
      this.preuzmiKolicinuMleka();
    })
  }

  preuzmiArtikleZaSeriju(){
    this.planServis.vratiArtikleZaSeriju().subscribe((artikli)=>{
      // @ts-ignore
      if(!artikli.artiklZaSeriju.length || artikli.artiklZaSeriju.length<2){
        // @ts-ignore
        this.artikliZaSeriju = Array(artikli.artiklZaSeriju);
      }else{
        // @ts-ignore
        this.artikliZaSeriju = artikli.artiklZaSeriju;
      }
    })
  }

  preuzmiKolicinuMleka(){
    this.planServis.vratiKolicinuMleka().subscribe((mleko)=>{
    this.mleko = String(mleko) + 'l';
    })
  }


  ukloniPlaniraniProizvodSerije(IDArtikla: number, IDNalepnice: number) {
    this.planServis.ukloniPlaniraniProizvod(IDArtikla, IDNalepnice).subscribe(()=>{
      this.preuzmiPlaniraneProizvode();
    });
  }

  izmeniPlaniraniProizvodSerije(IDArtikla: number, IDNalepnice: number, kolicina: number)
  {

    this.planServis.pripremiProizvodZaIzmenu(IDArtikla, IDNalepnice).subscribe( () =>{
      this.openModalIzmena(String(IDArtikla), String(IDNalepnice), String(kolicina));

    })


  }
}
