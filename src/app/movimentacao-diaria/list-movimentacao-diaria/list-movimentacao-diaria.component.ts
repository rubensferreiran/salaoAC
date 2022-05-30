import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Despesa } from 'src/app/models/Despesa';
import { MovimentacaoDiaria } from 'src/app/models/MovimentacaoDiaria';
import { ServicoRealizado } from 'src/app/models/ServicoRealizado';
import { DespesaService } from 'src/app/service/despesa.service';
import { MovimentacaoDiariaService } from 'src/app/service/movimentacao-diaria.service';
import { ServicoRealizadoService } from 'src/app/service/servico-realizado.service';

@Component({
  selector: 'app-list-movimentacao-diaria',
  templateUrl: './list-movimentacao-diaria.component.html',
  styleUrls: ['./list-movimentacao-diaria.component.scss']
})
export class ListMovimentacaoDiariaComponent implements OnInit {

  title = 'Movimentação Diária';

  despesas: Despesa[] = [];

  servicosRealizados: ServicoRealizado[] = [];
  

  todos!: number
  
  constructor(
    private toastr: ToastrService,
    private servicoRealizadoService: ServicoRealizadoService,
    private despesaService: DespesaService

  ) { }

  ngOnInit(): void {
    this.servicoRealizadoService.getAll().subscribe((servicosRealizados: ServicoRealizado[]) => {
      this.servicosRealizados = servicosRealizados
    });
    this.despesaService.getAll().subscribe((despesas: Despesa[]) => {
      this.despesas = despesas;
    });
  }

  caixaTotal(){
    this.todos = (this.servicosRealizados.reduce((produto, valor) => produto += valor.valor, 0) - this.despesas.reduce((produto, valor) => produto += valor.valor, 0));
    return this.todos;
  }

}
