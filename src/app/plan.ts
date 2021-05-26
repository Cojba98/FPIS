import {PlaniraniProizvodSerije} from './planirani-proizvod-serije';

export interface Plan {
  IDPlanaSerije: number,
  status: string
  planiraniProizvodiSerije: PlaniraniProizvodSerije[]
}
