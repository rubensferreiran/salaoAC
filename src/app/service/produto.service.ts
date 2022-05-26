import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiPath = 'http://localhost:3000/produto';

  constructor(
    private _http: HttpClient
  ) { }
  
  public getAll(): Observable<Produto[]>{
    return this._http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToProdutos)
    );
  }

  public getById(id: number): Observable<Produto>{
    const url = `${this.apiPath}/${id}`;
    return this._http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToProduto)
    );
  }

  public insert(produtos: Produto): Observable<Produto> {
    return this._http.post(this.apiPath, produtos).pipe(
      catchError(this.handleError),
      map(this.jsonDataToProduto)
    );
  }

  public update(produto: Produto): Observable<Produto>{
    const url = `${this.apiPath}/${produto.id}`;
    return this._http.put(url, produto).pipe(
      catchError(this.handleError),
      map(this.jsonDataToProduto)
    );
  }

  public delete(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`;
    return this._http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }
  
  private jsonDataToProdutos(jsonData: any[]): Produto[] {
    const produtos:  Produto[] = [];
    jsonData.forEach(element => produtos.push(element as Produto));
    return produtos;
  }

  private jsonDataToProduto(jsonData: any): Produto {
    return jsonData as Produto;
  }

  private handleError(error: any): Observable<any>{
    let errorMessege = '';
    if(error.error instanceof ErrorEvent){
      errorMessege = error.error.message
    } else {
      errorMessege = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    console.log(errorMessege);
    return throwError(errorMessege);
  }
}
