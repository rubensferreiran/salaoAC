import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiPath = 'http://localhost:3000/cliente';

  constructor(
    private _http: HttpClient
  ) { }

  public getAll(): Observable<Cliente[]> {
    return this._http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToClientes)
    );
  }

  public getById(id: number): Observable<Cliente> {
    const url = `${this.apiPath}/${id}`;
    return this._http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCliente)
    );
  }

  public getByNome(nome: string): Observable<Cliente[]> {
    const url = `${this.apiPath}?nome=${nome}`;
    return this._http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToClientes)
    );
  }

  public insert(cliente: Cliente): Observable<Cliente> {
    return this._http.post(this.apiPath, cliente).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCliente)
    );
  }

  public update(cliente: Cliente): Observable<Cliente> {
    const url = `${this.apiPath}/${cliente.id}`;
    return this._http.put(url, cliente).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCliente)
    );
  }

  public delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this._http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonDataToClientes(jsonData: any[]): Cliente[] {
    const clientes: Cliente[] = [];
    jsonData.forEach(elemnt => clientes.push(elemnt as Cliente));
    return clientes;
  }

  private jsonDataToCliente(jsonData: any): Cliente {
    return jsonData as Cliente;
  }

  private handleError(error: any): Observable<any> {
    let errorMessege = '';
    if (error.error instanceof ErrorEvent) {
      errorMessege = error.error.message;
    } else {
      errorMessege = `Erro Code: ${error.status}\n Message: ${error.messeage}`;
    }
    console.log(errorMessege);
    return throwError(errorMessege);
  }
}
