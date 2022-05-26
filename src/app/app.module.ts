import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormClienteComponent } from './cliente/form-cliente/form-cliente.component';
import { ListClienteComponent } from './cliente/list-cliente/list-cliente.component';
import { FormProdutoComponent } from './produto/form-produto/form-produto.component';
import { ListProdutoComponent } from './produto/list-produto/list-produto.component';
import { FormServicoComponent } from './servico/form-servico/form-servico.component';
import { ListServicoComponent } from './servico/list-servico/list-servico.component';
import { FormServicoRealizadoComponent } from './servico-realizado/form-servico-realizado/form-servico-realizado.component';
import { ListServicoRealizadoComponent } from './servico-realizado/list-servico-realizado/list-servico-realizado.component';
import { FormDespesaComponent } from './despesa/form-despesa/form-despesa.component';
import { ListDespesaComponent } from './despesa/list-despesa/list-despesa.component';
import { FormMovimentacaoDiariaComponent } from './movimentacao-diaria/form-movimentacao-diaria/form-movimentacao-diaria.component';
import { ListMovimentacaoDiariaComponent } from './movimentacao-diaria/list-movimentacao-diaria/list-movimentacao-diaria.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormClienteComponent,
    ListClienteComponent,
    FormProdutoComponent,
    ListProdutoComponent,
    FormServicoComponent,
    ListServicoComponent,
    FormServicoRealizadoComponent,
    ListServicoRealizadoComponent,
    FormDespesaComponent,
    ListDespesaComponent,
    FormMovimentacaoDiariaComponent,
    ListMovimentacaoDiariaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressAnimation: 'decreasing',
      progressBar: true,
      preventDuplicates: true
    })
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
