import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormClienteComponent } from './cliente/form-cliente/form-cliente.component';
import { ListClienteComponent } from './cliente/list-cliente/list-cliente.component';
import { FormDespesaComponent } from './despesa/form-despesa/form-despesa.component';
import { ListDespesaComponent } from './despesa/list-despesa/list-despesa.component';
import { HomeComponent } from './home/home.component';
import { FormMovimentacaoDiariaComponent } from './movimentacao-diaria/form-movimentacao-diaria/form-movimentacao-diaria.component';
import { ListMovimentacaoDiariaComponent } from './movimentacao-diaria/list-movimentacao-diaria/list-movimentacao-diaria.component';
import { FormProdutoComponent } from './produto/form-produto/form-produto.component';
import { ListProdutoComponent } from './produto/list-produto/list-produto.component';
import { FormServicoRealizadoComponent } from './servico-realizado/form-servico-realizado/form-servico-realizado.component';
import { ListServicoRealizadoComponent } from './servico-realizado/list-servico-realizado/list-servico-realizado.component';
import { FormServicoComponent } from './servico/form-servico/form-servico.component';
import { ListServicoComponent } from './servico/list-servico/list-servico.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},

  {path: 'form-cliente', component: FormClienteComponent},
  {path: 'list-cliente', component: ListClienteComponent},

  {path: 'form-produto', component: FormProdutoComponent},
  {path: 'list-produto', component: ListProdutoComponent},

  {path: 'form-servico', component: FormServicoComponent},
  {path: 'list-servico', component: ListServicoComponent},

  {path: 'form-servico-realizado', component: FormServicoRealizadoComponent},
  {path: 'list-servico-realizado', component: ListServicoRealizadoComponent},

  {path: 'form-despesa', component: FormDespesaComponent},
  {path: 'list-despesa', component: ListDespesaComponent},

  {path: 'form-movimentacao-diaria', component: FormMovimentacaoDiariaComponent},
  {path: 'list-movimentacao-diaria', component: ListMovimentacaoDiariaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
