import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Servico } from 'src/app/models/Servico';
import { ServicoService } from 'src/app/service/servico.service';

@Component({
  selector: 'app-list-servico',
  templateUrl: './list-servico.component.html',
  styleUrls: ['./list-servico.component.scss']
})
export class ListServicoComponent implements OnInit {

  title = 'Cadastrar Serviço';

  servicos: Servico[] | undefined;

  constructor(
    private toastr: ToastrService,
    private servicoService: ServicoService
  ) { }

  ngOnInit(): void {
    this.servicoService.getAll().subscribe((servicos: Servico[]) => {this.servicos = servicos});
  }

  removeSservico(servico: Servico) {
    const mustDelete = ('Deseja realmente excluir?');
    if(mustDelete){
      this.servicoService.delete(servico.id).subscribe(() => this.servicos = this.servicos?.filter(element => element != servico),
      error => this.toastr.error('Erro ao tentar excluir.'));
    }
  }

}
