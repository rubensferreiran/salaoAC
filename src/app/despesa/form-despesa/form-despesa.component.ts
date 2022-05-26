import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Despesa } from 'src/app/models/Despesa';
import { DespesaService } from 'src/app/service/despesa.service';

@Component({
  selector: 'app-form-despesa',
  templateUrl: './form-despesa.component.html',
  styleUrls: ['./form-despesa.component.scss']
})
export class FormDespesaComponent implements OnInit {

  titlePage = 'Cadastro de Despesas';

  serverErrorMessege: string[] = [];

  despesas: Despesa = new Despesa();

  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private despesaService: DespesaService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  cadastrarDespesa(){
    const despesa: Despesa = Object.assign(new Despesa(), this.form.value);
    this.despesaService.insert(despesa).subscribe(
      despesa => this.actionForSuccess(despesa),
      error => this.actionForError(error)
    );
    this.form.reset();
  }

  private initForm(){
    this.form = this.formBuilder.group({
      id: [null],
      fornecedor: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      dataPagamento: [null, [Validators.required]],
    })
  }

  private actionForSuccess(despesa: Despesa){
    this.toastr.success('Operação realizada com sucesso.');
  }

  private actionForError(error: {status: number, _body: string}){
    this.toastr.error('Ocorreu um erro ao procesar sua operação.');
    if(error.status === 422){
      this.serverErrorMessege = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessege = ['Falha na comunicação com o servidor. Por favor, tente novamente mais tarde.']
    };
  }

}
