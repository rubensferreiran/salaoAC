import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServicoRealizado } from 'src/app/models/ServicoRealizado';
import { ServicoRealizadoService } from 'src/app/service/servico-realizado.service';

@Component({
  selector: 'app-list-servico-realizado',
  templateUrl: './list-servico-realizado.component.html',
  styleUrls: ['./list-servico-realizado.component.scss']
})
export class ListServicoRealizadoComponent implements OnInit {

  titlePage = 'Cadastro de Serviços Realizados';

  servicosRealizados: ServicoRealizado[] = [];

  constructor(
    private toastr: ToastrService,
    private servicoRealizadoService: ServicoRealizadoService
  ) { }

  ngOnInit(): void {
    this.servicoRealizadoService.getAll().subscribe((servicosRealizados: ServicoRealizado[]) => {
      this.servicosRealizados = servicosRealizados
      console.log(servicosRealizados)
    });
  }

  removeServicoRealizado(servicoRealizado: ServicoRealizado) {
    const mustDelete = ('Deseja realmente excluir?');
    if(mustDelete) {
      this.servicoRealizadoService.delete(servicoRealizado.id).subscribe(() => this.servicosRealizados = this.servicosRealizados?.filter(element => element != servicoRealizado),
      error => this.toastr.error('Error ao tentar excluir.'));
    }
  }

}
