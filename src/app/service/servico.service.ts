import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Servico } from '../models/Servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private apiPath = 'http://localhost:3000/servico';

  constructor(
    private _http: HttpClient
  ) { }

  public getAll(): Observable<Servico[]>{
    return this._http.get(this.apiPath).pipe(
      catchError(this.handleaerror),
      map(this.jsonDataToServicos)
    );
  }

  public getById(id: number): Observable<Servico>{
    const url = `${this.apiPath}/${id}`;
    return this._http.get(url).pipe(
      catchError(this.handleaerror),
      map(this.jsonDataToServico)
    );
  }

  public insert (servicos: Servico): Observable<Servico> {
    return this._http.post(this.apiPath, servicos).pipe(
      catchError(this.handleaerror),
      map(this.jsonDataToServico)
    );
  }

  public update(servico: Servico): Observable<Servico> {
    const url = `${this.apiPath}/${servico.id}`;
    return this._http.put(url, servico).pipe(
      catchError(this.handleaerror),
      map(this.jsonDataToServico)
    );
  }

  public delete(id: any):Observable<any> {
    const url = `${this.apiPath}/ ${id}`;
    return this.delete(url).pipe(
      catchError(this.handleaerror),
      map(() => null)
    );
  }

  private jsonDataToServicos(jsonData: any[]): Servico[]{
    const servicos: Servico[] = [];
    jsonData.forEach(element => servicos.push(element as Servico));
    return servicos;
  }

  private jsonDataToServico(jsonData: any): Servico{
    return jsonData as Servico;
  }

  private handleaerror(error: any): Observable<any>{
    let erroMessege = '';
    if(error.error instanceof ErrorEvent){
      erroMessege = error.error.messege;
    } else {
      erroMessege = `Error Code: ${error.status}\n Messege: ${error.messege}`;
    }
    console.log(erroMessege);
    return throwError(erroMessege);
  }
}
