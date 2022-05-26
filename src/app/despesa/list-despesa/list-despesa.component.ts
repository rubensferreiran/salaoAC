import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Despesa } from 'src/app/models/Despesa';
import { DespesaService } from 'src/app/service/despesa.service';

@Component({
  selector: 'app-list-despesa',
  templateUrl: './list-despesa.component.html',
  styleUrls: ['./list-despesa.component.scss']
})
export class ListDespesaComponent implements OnInit {

  title = 'Cadastrar Despesas';

  despesas: Despesa[] | undefined;

  constructor(
    private toastr: ToastrService,
    private despesaService: DespesaService
  ) { }

  ngOnInit(): void {
    this.despesaService.getAll().subscribe((despesas: Despesa[]) => {
      this.despesas = despesas;
    })
  }

  removeDespesa(despesa: Despesa) {
    const mustDelete = ('Deseja realmente excluir?');
    if (mustDelete) {
      this.despesaService.delete(despesa.id).subscribe(() => this.despesas = this.despesas?.filter(element => element != despesa),
        error => this.toastr.error('Erro ao tentar excluir.'));
    }
  }

}
