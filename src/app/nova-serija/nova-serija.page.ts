import { Component, OnInit } from '@angular/core';
import {PlanoviService} from '../planovi.service';
import {PlanService} from '../plan.service';
import {Plan} from '../plan';
import {PlaniraniProizvodSerije} from '../planirani-proizvod-serije';
import {ActivatedRoute, Router} from '@angular/router';
import {ArtiklSerije} from '../artikl-serije';
import {ArtiklSerijeService} from '../artikl-serije.service';
import {ProizvodSerijeService} from '../proizvod-serije.service';
import {CisternaSerije} from '../cisterna-serije';
import {CisternaSerijeService} from '../cisterna-serije.service';
import {environment} from "../../environments/environment";
import {Cisterna} from "../cisterna";
import {SerijaService} from "../serija.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-nova-serija',
  templateUrl: './nova-serija.page.html',
  styleUrls: ['./nova-serija.page.scss'],
})
export class NovaSerijaPage implements OnInit {

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

  constructor(private proizvodiSerijeServis: ProizvodSerijeService, private artiklSerijeServis: ArtiklSerijeService,
              private cisterneSerijeServis: CisternaSerijeService, private route: ActivatedRoute,
              private serijaServis: SerijaService, private planoviServis: PlanoviService,
              private router: Router) {

  }

  ngOnInit() {
    this.serijaServis.pokreniUnos().subscribe(() => {
      console.log("Uspesno pokrenut unos");
    }, error => {
      console.log("Greska prilikom pokretanja unosa");
    });

    this.ucitajSvePodatke();
    this.planoviServis.uzmiSve().subscribe((planovi: any) => {
      this.IDPlanova = planovi.planProizvodnjeSerije;
      console.log(planovi.planProizvodnjeSerije);
    }, error => {

    });

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
    this.proizvodiSerijeServis.ukloniProizvodSerije(idArtikla, idNalepnice);
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
      console.log(ret);
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
      this.ucitajSvePodatke();
    }, error => {
      console.log(error.message || 'Nije moguce izabrati plan');
    });

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
}
