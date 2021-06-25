import {AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {SopstveniProizvod} from "../sopstveni-proizvod";
import {PlaniraniProizvodSerije} from "../planirani-proizvod-serije";
import {ArtiklSerije} from "../artikl-serije";
import {PlanoviService} from "../planovi.service";
import {Plan} from "../plan";
import {DodavanjeProizvodaComponent} from "../dodavanje-proizvoda/dodavanje-proizvoda.component";
import {PlanService} from "../plan.service";
import {Router} from "@angular/router";
import {LoadingController, ModalController} from "@ionic/angular";
import {IzmenaProizvodaComponent} from "../izmena-proizvoda/izmena-proizvoda.component";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {
  IDPlana: any;
  planiraniProizvodi: PlaniraniProizvodSerije[] = [];
  artikliZaSeriju: ArtiklSerije[] = [];
  IDPlanova: Plan[];
  idPlana: any;
  mleko: string;

  constructor(private planoviServis: PlanoviService, private planServis: PlanService, private router: Router,
              private modalController: ModalController, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.loadingController.create({message: 'Molimo sacekajte...'}).then((loading) => {
      loading.present();
      this.planServis.pokreniUnos().subscribe(()=>{
        console.log('Pokrenut unos');
        this.planoviServis.uzmiSve().subscribe((planovi: any) => {
          this.IDPlanova = planovi.planProizvodnjeSerije;
          console.log(planovi.planProizvodnjeSerije);
loading.dismiss();
        }, error => {

        });

      })
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
      console.log(this.planiraniProizvodi);
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

  izborPlana(){
    this.planServis.izborPlana(this.idPlana).subscribe(()=>{
      this.preuzmiPlaniraneProizvode();
    });
  }

  postaviKolicinuProizvodaSerije(IDArtikla: number, IDNalepnice: number, event) {
    const kol = this.planiraniProizvodi.find(s => s.sp.IDArtikla === IDArtikla && s.n.IDNalepnice===IDNalepnice);
    kol.kolicina = event.target.value;
    this.planServis.promeniKolicinu(IDArtikla, IDNalepnice, kol.kolicina).subscribe(()=>{
      this.preuzmiPlaniraneProizvode();
      this.preuzmiArtikleZaSeriju();
    });

  }

  izmeniPlaniraniProizvodSerije(IDArtikla: number, IDNalepnice: number, kolicina: number)
  {

    this.planServis.pripremiProizvodZaIzmenu(IDArtikla, IDNalepnice).subscribe( () =>{

      this.openModalIzmena(String(IDArtikla), String(IDNalepnice), String(kolicina));

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
}
