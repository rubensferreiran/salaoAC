import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';
import { Produto } from 'src/app/models/Produto';
import { Servico } from 'src/app/models/Servico';
import { ServicoRealizado } from 'src/app/models/ServicoRealizado';
import { ClienteService } from 'src/app/service/cliente.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { ServicoRealizadoService } from 'src/app/service/servico-realizado.service';
import { ServicoService } from 'src/app/service/servico.service';

@Component({
  selector: 'app-form-servico-realizado',
  templateUrl: './form-servico-realizado.component.html',
  styleUrls: ['./form-servico-realizado.component.scss']
})
export class FormServicoRealizadoComponent implements OnInit {

  titlePage: string = 'Serviço Realizado';

  serverErrorMessege: string[] = [];

  form!: FormGroup;

  servicoRealizado: ServicoRealizado = new ServicoRealizado();

  clienteSelecionado!: Cliente;

  clientes: Cliente[] = [];

  servicoSelecionado!: Servico;

  servicos: Servico[] = [];

  servicosUtilizados: Servico[] = [];

  produtoSelecionado!: Produto;

  produtos: Produto[] = [];

  produtosUltilizados: Produto[] = [];

  todos!: number;

  constructor(
    private servicoRealizadoService: ServicoRealizadoService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private servicoService: ServicoService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getClientes();
    this.getServicos();
    this.getProdutos();
  }

  getClientes() {
    this.clienteService.getAll().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    })
  }

  getProdutos() {
    this.produtoService.getAll().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    })
  }

  getServicos() {
    this.servicoService.getAll().subscribe((servicos: Servico[]) => {
      this.servicos = servicos;
    })
  }

  inserirProduto() {
    let produtoSelecionado = this.form.controls['produto'].value;
    this.produtosUltilizados.push(produtoSelecionado);
    this.form.controls['produto'].reset();
    this.calcularProdutosServicos();
  }

  deletatProduto() {
    let produtoSelecionado = this.form.controls['produto'].value;
    this.produtosUltilizados.splice(produtoSelecionado, 1);
  }

  inserirServico() {
    let servicoSelecionado = this.form.controls['servico'].value;
    this.servicosUtilizados.push(servicoSelecionado);
    this.form.controls['servico'].reset();
    this.calcularProdutosServicos();
  }

  deletarServico() {
    let produtoSelecionado = this.form.controls['produto'].value;
    this.servicosUtilizados.splice(produtoSelecionado, 1);
  }

  calcularProdutosServicos() {
    this.todos = (this.produtosUltilizados.reduce((soma, produto) => soma += produto.valor, 0) + this.servicosUtilizados.reduce((soma, produto) => soma += produto.valor, 0));
    return this.todos;
    // let produtos = this.produtosUltilizados.reduce((soma, produto) => {
    //   return soma + produto.valor
    // }, 0);
    // let servico = this.servicosUtilizados.reduce((soma, produto) => {
    //   return soma + produto.valor
    // }, 0);
    // return this.todos = produtos + servico;
  }

  cadastraServicoRealiazado() {
    const servicoRealizado: ServicoRealizado = Object.assign(new ServicoRealizado(), this.form.value);
    servicoRealizado.valor = this.todos;
    servicoRealizado.produtos = this.produtosUltilizados;
    servicoRealizado.servicos = this.servicosUtilizados;
    this.servicoRealizadoService.insert(servicoRealizado).subscribe(
      servicoRealizado => this.actionForSuccess(servicoRealizado),
      error => this.actionsForError(error)
    )
    this.form.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      cliente: [this.clienteSelecionado],
      servico: [this.servicoSelecionado],
      produto: [this.produtoSelecionado],
      valor: [null, [Validators.required]],
      dataServicoRealizado: [null, [Validators.required]]
    });
  }

  private actionForSuccess(servicoRealizado: ServicoRealizado) {
    this.toastr.success('Operação realizada com sucesso.');
  }

  private actionsForError(error: { status: number, _body: string }) {
    this.toastr.error('Ocorreu um error so processar sua operação');
    if (error.status === 422) {
      this.serverErrorMessege = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessege = ['Falha na comunicação com o servidor. Por favor, tente novamente mais tarde.']
    };
  }

}
