import {Nalepnica} from './nalepnica';
import {SopstveniProizvod} from './sopstveni-proizvod';

export interface PlaniraniProizvodSerije {
  kolicina: number
  n: Nalepnica
  sp: SopstveniProizvod
  status: string
}
