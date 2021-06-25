import { Component, OnInit } from '@angular/core';
import {PlaniraniProizvodSerije} from "../planirani-proizvod-serije";
import {ArtiklSerije} from "../artikl-serije";
import {CisternaSerije} from "../cisterna-serije";
import {ProizvodSerijeService} from "../proizvod-serije.service";
import {ArtiklSerijeService} from "../artikl-serije.service";
import {CisternaSerijeService} from "../cisterna-serije.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SerijaService} from "../serija.service";
import {PlanoviService} from "../planovi.service";
import {NgForm} from "@angular/forms";
import {Serija} from "../serija";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-serija',
  templateUrl: './serija.page.html',
  styleUrls: ['./serija.page.scss'],
})
export class SerijaPage implements OnInit {

  proizvodiSerije: PlaniraniProizvodSerije[];
  artikliSerije: ArtiklSerije[];
  cisterneSerije: CisternaSerije[];
  cisterne: any[];
  idCisterne: number;
  kolicinaMleka: number;
  dodavanje = false;
  LOT: string;
  IDPlanova: number[];
  datumCisterne: any;
  ukupnoMleko: number;
  lotovi: string[];

  constructor(private proizvodiSerijeServis: ProizvodSerijeService, private artiklSerijeServis: ArtiklSerijeService,
              private cisterneSerijeServis: CisternaSerijeService, private route: ActivatedRoute,
              private serijaServis: SerijaService, private planoviServis: PlanoviService,
              private router: Router, private loadingController: LoadingController) {

  }


  ionViewWillEnter(){
    this.loadingController.create({message: 'Molimo sacekajte...'}).then((loading) => {
      loading.present();



      this.serijaServis.pokreniUnos().subscribe(() => {
        console.log("Uspesno pokrenut unos");
        this.ucitajSvePodatke();
        this.serijaServis.vratiLotove().subscribe(()=>{
          this.serijaServis.uzmiLotove.subscribe((lotovi)=>{
            this.lotovi = lotovi;
            console.log("Lotovi:")
            console.log(this.lotovi);
          })
        })
        loading.dismiss();
      }, error => {
        console.log("Greska prilikom pokretanja unosa");
      });
    })



  }


  ngOnInit() {

  }

  uzmiSveCisterneSerije(){
    this.cisterneSerijeServis.uzmiSve().subscribe((cisterne: any) => {
      if(cisterne) {
        if (cisterne.cisternaSerije.length > 1) {
          this.cisterneSerije = cisterne.cisternaSerije;
        } else {
          // @ts-ignore
          this.cisterneSerije = Array(cisterne.cisternaSerije);
        }
      }else{
        this.cisterneSerije = [];
      }
    }, error => {
      console.log(error.message || 'Nije moguce ucitati plan')

    });
  }

  postaviKolicinuProizvodaSerije(idArtikla: number, idNalepnice: number, event) {

    const kol = this.proizvodiSerije.filter(s => s.sp.IDArtikla === idArtikla && s.n.IDNalepnice===idNalepnice);
    kol[0].kolicina = event.target.value;
    this.proizvodiSerijeServis.postaviKolicinuProizvodaSerije(idArtikla, idNalepnice,event.target.value).subscribe(()=>{
      this.ucitajSvePodatke();
    })
  }

  postaviKolicinuArtiklaSerije(idArtikla: number, event) {

    const kol = this.artikliSerije.filter(s => s.artikl.IDArtikla == idArtikla);
    kol[0].kolicina = event.target.value;
    this.artiklSerijeServis.postaviKolicinuArtiklaSerije(idArtikla,event.target.value).subscribe(()=>{
      this.ucitajSvePodatke();
    })
  }

  ukloniProizvodSerije(idArtikla: number, idNalepnice: number){
    this.proizvodiSerijeServis.ukloniProizvodSerije(idArtikla, idNalepnice).subscribe(()=>{
      this.ucitajSvePodatke();
    });
  }

  izborCisterne() {
    this.datumCisterne = this.cisterne.filter(s => s.IDCisterne == this.idCisterne)[0].datum;
    this.ukupnoMleko = this.cisterne.filter(s => s.IDCisterne == this.idCisterne)[0].ukupnoOtkupljenoMleko;
    this.cisterneSerijeServis.izborCisterne(this.idCisterne).subscribe(() => {
      console.log("Uspesno postavljena cisterna");
    }, error => {
      console.log(error.message || 'Nije moguce postaviti cisternu')
    });
  }

  unosKolicine(){
    console.log("Izmena...")
    this.cisterneSerijeServis.unosKolicine(this.kolicinaMleka).subscribe(() => {
      console.log("Uspesno postavljena kolicina");
    }, error => {
      console.log(error.message || 'Nije moguce postaviti kolicinu')
    });
  }

  dodajCisternu() {
    this.cisterneSerijeServis.dodajCisternu().subscribe(() => {
      console.log("Uspesno dodata kolicina");
    }, error => {
      console.log(error.message || 'Nije moguce dodati cisternu')
    });
    this.dodavanje = true;
  }

  ubaciCisternuUKolekciju() {
    this.cisterneSerijeServis.ubaciCisternuUKolekciju().subscribe(() => {
      console.log("Uspesno ubacena cisterna");
    }, error => {
      console.log(error.message || 'Nije moguce ubaciti cisternu')
    });
    this.dodavanje = false;
    this.idCisterne = 0;
    this.kolicinaMleka = 0;
    this.uzmiSveCisterneSerije();

  }


  sacuvajSeriju() {

    this.serijaServis.sacuvajSeriju(this.LOT).subscribe((ret) => {
      console.log("Uspesno sacuvana serija");
      this.router.navigate([''],{queryParams: {serija: ret}});
    }, error => {
      console.log(error.message || 'Nije moguce sacuvati seriju')
    });
  }

  prikazi(SerijaForm: NgForm) {
    console.log(SerijaForm);
  }

  async izbrisiCisternuSerije(IDCisterne: number) {
    this.cisterneSerijeServis.izbrisiCisternuSerije(IDCisterne).subscribe(() => {
      console.log("Uspesno izbrisana cisterna");
      this.uzmiSveCisterneSerije();
    }, error => {
      console.log(error.message || 'Nije moguce obrisati cisternu');
    })

  }

  izborPlana(value: number) {
    this.planoviServis.izborPlana(value).subscribe(() => {
      console.log("Uspesno izabran plan");
    }, error => {
      console.log(error.message || 'Nije moguce izabrati plan');
    });
    this.ucitajSvePodatke();
  }

  ucitajSvePodatke(){
    this.proizvodiSerijeServis.uzmiSve().subscribe((proizvodiSerije: any) => {
      if(proizvodiSerije){
        if(proizvodiSerije.proizvodSerije.length>1) {
          this.proizvodiSerije = proizvodiSerije.proizvodSerije;
        }else{
          // @ts-ignore
          this.proizvodiSerije = Array(proizvodiSerije.proizvodSerije);
        }
      }else{
        this.proizvodiSerije = [];
      }
    }, error => {
      console.log(error.message || 'Nije moguce ucitati plan')
    });

    this.artiklSerijeServis.uzmiSve().subscribe((artikli: any) => {
      if(artikli){
        if(artikli.artiklSerije.length>1) {
          this.artikliSerije = artikli.artiklSerije;
        }else{
          // @ts-ignore
          this.artikliSerije = Array(artikli.artiklSerije);
        }
      }else{
        artikli = [];
      }
    }, error => {
      console.log(error.message || 'Nije moguce ucitati plan')
    });

    this.uzmiSveCisterneSerije();

    this.cisterneSerijeServis.uzmiSveCisterne().subscribe((cisterne: any) => {
      console.log("Cisterne: " + cisterne.cisterna);
      if(cisterne.cisterna.length>1) {
        this.cisterne = cisterne.cisterna;
      }else{
        // @ts-ignore
        this.cisterne = Array(cisterne.cisterna);
      }
    }, error => {
      console.log(error.message || 'Nije moguce ucitati cisterne')
    });
  }

  izborSerije(lot: string) {
    this.serijaServis.izborSerije(lot).subscribe(()=>{
      this.ucitajSvePodatke();
      console.log("Uspesno izabrana serija");
    }, error => {
      console.log("Greska prilikom izbora serije");
    })
    this.LOT = lot;
  }

  ukloniArtiklSerije(IDArtikla: number){
    this.artiklSerijeServis.ukloniArtiklSerije(IDArtikla).subscribe(()=>{
      console.log("Uspesno obrisan artikl");
      this.ucitajSvePodatke();
    }, error => {
      console.log("Greska prilikom brisanja artikla");
    })
  }

}
