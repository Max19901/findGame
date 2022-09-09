import {Injectable} from "@angular/core";
import {map, Observable, of} from "rxjs";
import DataJson from "../api-data/data.json";
import {IDashboardData, IMappingDashboardData} from "../interfaces/dasboard.interface";

@Injectable({providedIn: 'root'})
export class DashboardService {
  public getCardsData(): Observable<IMappingDashboardData[]> {
    return of(DataJson).pipe(map(this._mapDashboardData.bind(this)));
  }

  private _mapDashboardData(dashboard: IDashboardData[]): IMappingDashboardData[] {
    return [...this._filteredUniqItems(dashboard), ...this._filteredUniqItems(dashboard)];
  }

  private _filteredUniqItems(data: IDashboardData[]): IMappingDashboardData[] {
    let table: any = {};
    return this._mapDashboard(data).filter((item: IMappingDashboardData) => (!table[item.firstName] && (table[item.firstName] = 1)));
  }

  private _mapDashboard(dashboard: IDashboardData[]): IMappingDashboardData[] {
    return dashboard.map((item: IDashboardData) => {
      const {firstName, id, image} = item;
      return {firstName, id, image, rotate: false}
    })
  }

  public shuffleData(data: IMappingDashboardData[]): IMappingDashboardData[] {
    return data.sort(() => Math.round(Math.random() * 100) - 50);
  }

  public isSelectedCardMatched(firstCard: IMappingDashboardData, secondCard: IMappingDashboardData): boolean {
    return firstCard.id === secondCard.id;
  }
}
