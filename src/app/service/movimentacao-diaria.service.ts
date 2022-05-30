import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { MovimentacaoDiaria } from '../models/MovimentacaoDiaria';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoDiariaService {

  private apiPath = 'http://localhost:3000/movimentacao-diaria';

  constructor(
    private _http: HttpClient
  ) { }
  
  public getAll(): Observable<MovimentacaoDiaria[]>{
    return this._http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToMovimentacoesDiarias)
    );
  }

  public getById(id: number): Observable<MovimentacaoDiaria>{
    const url = `${this.apiPath}/${id}`;
    return this._http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToMovimentacaoDiaria)
    );
  }

  public insert(movimentacaoDiaria: MovimentacaoDiaria): Observable<MovimentacaoDiaria>{
    return this._http.post(this.apiPath, movimentacaoDiaria).pipe(
      catchError(this.handleError),
      map(this.jsonDataToMovimentacaoDiaria)
    );
  }

  public update(movimentacaoDiaria: MovimentacaoDiaria): Observable<MovimentacaoDiaria>{
    const url = `${this.apiPath}/${movimentacaoDiaria.id}`;
    return this._http.put(url, movimentacaoDiaria).pipe(
      catchError(this.handleError),
      map(this.jsonDataToMovimentacaoDiaria)
    );
  }

  public delete(id: number):Observable<any>{
    const url = `${this.apiPath}/${id}`;
    return this._http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonDataToMovimentacoesDiarias(jsonData: any[]): MovimentacaoDiaria[]{
    const movimentacoesDiarias: MovimentacaoDiaria[] = [];
    jsonData.forEach(element => movimentacoesDiarias.push(element as MovimentacaoDiaria));
    return movimentacoesDiarias;
  }

  private jsonDataToMovimentacaoDiaria(jsonData: any): MovimentacaoDiaria{
    return jsonData as MovimentacaoDiaria;
  }

  private handleError(error: any): Observable<any>{
    let erroMessege = '';
    if(error.erorr instanceof ErrorEvent){
      erroMessege = error.error.messege;
    } else {
      erroMessege = `Error Code: ${error.status}\n Message: ${error.messege}`;
    }
    console.log(erroMessege);
    return throwError(erroMessege);
  }
}
