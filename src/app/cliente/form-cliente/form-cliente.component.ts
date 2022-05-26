import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente, Endereco } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {

  titleCard = 'Cadastro de Cliente';

  serverMessegeError: string[] = [];

  form!: FormGroup;

  cliente: Cliente = new Cliente();


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  cadastrarCliente() {
    const cliente: Cliente = Object.assign(new Cliente(), this.form.value);
    cliente.endereco = this.cliente.endereco;
    this.clienteService.insert(cliente).subscribe(
      cliente => this.actionsForSuccess(cliente),
      error => this.actionsForError(error)
    )
    this.form.reset();
  }

  editarCliente(){
    
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required]],
      eMail: [null, [Validators.required]],
      rua: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      complemento: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado: [null, [Validators.required]]
    })
  }

  private actionsForSuccess(cliente: Cliente) {
    this.toastr.success('Operação realizada com sucesso.');
  }

  private actionsForError(error: { status: number, _body: string }) {
    this.toastr.error('Ocorreu um erro ao processar sua operação');
    if (error.status === 422) {
      this.serverMessegeError = JSON.parse(error._body).errors;
    } else {
      this.serverMessegeError = ['Falha na comunicação com o servidor. Por favor tente novamente mais tarde.']
    };

  }
}
