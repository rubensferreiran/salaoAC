import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.scss']
})
export class FormProdutoComponent implements OnInit {

  titleCard = 'Cadastro de Porduto';

  serverMessegeError: string[] = [];

  form!: FormGroup;

  produto: Produto = new Produto();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  cadastrarProduto(){
    const produto: Produto = Object.assign(new Produto(), this.form.value);
    this.produtoService.insert(produto).subscribe(
      produto => this.actionsForSuccess(produto),
      error => this.actionsForError(error)
    )
    this.form.reset();
  }

  private initForm(){
    this.form = this.formBuilder.group({
      id: [null],
      nomeProduto: [null, [Validators.required]],
      tipoProduto: [null, [Validators.required]],
      valor: [null, [Validators.required]]
    })
  }

  private actionsForSuccess(produto: Produto) {
    this.toastr.success('Operação realizada com sucesso');
  }

  private actionsForError(error: {status: number, _body: string}){
    this.toastr.error('Ocorreu um erro ao processar sua operação');
    if(error.status === 422){
      this.serverMessegeError = JSON.parse(error._body).errors;
    } else {
      this.serverMessegeError = ['Falha na comunicação com o servidor. Por favor tente novamente mais tarde']
    };
  }

}
