import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ServicoRealizado } from '../models/ServicoRealizado';

@Injectable({
  providedIn: 'root'
})
export class ServicoRealizadoService {

  private apiPath = 'http://localhost:3000/servico-realizado';

  constructor(
    private _http: HttpClient
  ) { }

  public getAll(): Observable<ServicoRealizado[]>{
    return this._http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToServicosRealizados)
    );
  }

  public getById(id: number): Observable<ServicoRealizado>{
    const url = `${this.apiPath}/${id}`;
    return this._http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToServicoRealizado)
    );
  }

  public insert(servicosRelizados: ServicoRealizado): Observable<ServicoRealizado>{
    return this._http.post(this.apiPath, servicosRelizados).pipe(
      catchError(this.handleError),
      map(this.jsonDataToServicoRealizado)
    );
  }

  public update(servicoRealizado: ServicoRealizado): Observable<ServicoRealizado>{
    const url = `${this.apiPath}/${servicoRealizado.id}`;
    return this._http.put(url, servicoRealizado).pipe(
      catchError(this.handleError),
      map(this.jsonDataToServicoRealizado)
    );
  }

  public delete(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`;
    return this._http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonDataToServicosRealizados(jsonData: any[]): ServicoRealizado[] {
    const servicosRelizados: ServicoRealizado[] = [];
    jsonData.forEach(element => servicosRelizados.push(element as ServicoRealizado));
    return servicosRelizados;
  }

  private jsonDataToServicoRealizado(jsonData: any): ServicoRealizado{
    return jsonData as ServicoRealizado;
  }

  private handleError(error: any): Observable<any> {
    let erroMessege = '';
    if(error.error instanceof ErrorEvent){
      erroMessege = error.error.messege;
    } else {
      erroMessege = `Error Code: ${error.status}/n Messege: ${error.messege}`;
    }
    console.log(erroMessege);
    return throwError(erroMessege);
  }
}
