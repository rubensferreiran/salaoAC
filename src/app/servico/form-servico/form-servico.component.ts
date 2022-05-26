import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Servico } from 'src/app/models/Servico';
import { ServicoService } from 'src/app/service/servico.service';

@Component({
  selector: 'app-form-servico',
  templateUrl: './form-servico.component.html',
  styleUrls: ['./form-servico.component.scss']
})
export class FormServicoComponent implements OnInit {

  titlePage = 'Cadastro de Serviço';

  serverMessegeError: string[] = [];

  form!: FormGroup;

  servico: Servico = new Servico();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private servicoService: ServicoService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  cadastrarServico(){
    const servico: Servico = Object.assign(new Servico(), this.form.value);
    this.servicoService.insert(servico).subscribe(
      servico => this.actionForSuccess(servico),
      error => this.actionsForError(error)
    )
    this.form.reset();
  }

  private initForm(){
    this.form = this.formBuilder.group({
      id: [null],
      tipoServico: [null, [Validators.required]],
      valor: [null, [Validators.required]]
    });
  }
  
  private actionForSuccess(servico: Servico){
    this.toastr.success('Operação realizada com sucesso');
  }

  private actionsForError(error: {status: number, _body: string}) {
    this.toastr.error('Ocorreu um erro ao processar sua operação');
    if(error.status === 422){
      this.serverMessegeError = JSON.parse(error._body).errors;
    } else {
      this.serverMessegeError = ['Falha na comunicação com o servidor. Por favor, tente novamente mais tarde.']
    };
  }

}
