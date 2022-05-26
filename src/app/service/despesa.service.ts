import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Despesa } from '../models/Despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  private apiPath = 'http://localhost:3000/despesa';

  constructor(
    private _http: HttpClient
  ) { }

  public getAll(): Observable<Despesa[]>{
    return this._http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToDespesas)
    );
  }

  public getById(id: number): Observable<Despesa>{
    let url = `${this.apiPath}/${id}`;
    return this._http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToDespesa)
    );
  }

  public insert(despesa: Despesa): Observable<Despesa>{
    return this._http.post(this.apiPath, despesa).pipe(
      catchError(this.handleError),
      map(this.jsonDataToDespesa)
    );
  }

  public update(despesa: Despesa): Observable<Despesa>{
    let url = `${this.apiPath}/${despesa.id}`;
    return this._http.put(url, despesa).pipe(
      catchError(this.handleError),
      map(this.jsonDataToDespesa)
    );
  }

  public delete(despesa: any): Observable<any>{
    let url = `${this.apiPath}/${despesa}`;
    return this._http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

    private jsonDataToDespesas(jsonData: any[]): Despesa[]{
      const despesa: Despesa[] = [];
      jsonData.forEach(element => despesa.push(element as Despesa));
      return despesa;
    }

  private jsonDataToDespesa(jsonData: any): Despesa{
    return jsonData as Despesa;
  }

  private handleError(error: any): Observable<any>{
    let messegeError = '';
    if(error.error instanceof ErrorEvent){
      messegeError = error.error.messege;
    } else {
      messegeError = `Error Code: ${error.status}\n Messege: ${error.messege}`;
    }
    console.log(messegeError);
    return throwError(messegeError);
  }
}
