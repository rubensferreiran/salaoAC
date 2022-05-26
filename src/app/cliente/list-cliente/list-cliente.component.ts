import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.scss']
})
export class ListClienteComponent implements OnInit {

  titlePage: string = 'Cadastro de Cliente';

  clientes: Cliente[] | undefined;

  constructor(
    private toastr: ToastrService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe((clientes: Cliente[]) => { this.clientes = clientes });
  }

  removeCliente(cliente: Cliente) {
    const mustDelete = ('Deseja realmente excluir?');
    if (mustDelete) {
      this.clienteService.delete(cliente.id).subscribe(() => this.clientes = this.clientes?.filter(element => element != cliente),
        error => this.toastr.error('Erro ao tentar excluir.'));
    }
  }
}
