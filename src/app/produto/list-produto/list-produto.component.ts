import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.scss']
})
export class ListProdutoComponent implements OnInit {

  title = 'Cadastrar Produtos';

  produtos: Produto[] | undefined;

  constructor(
    private toastr: ToastrService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.produtoService.getAll().subscribe((produtos: Produto[]) => {this.produtos = produtos});
  }

  removeProduto(produto: Produto) {
    const mustDelete = ('Deseja realmente excluir?');
    if(mustDelete){
      this.produtoService.delete(produto.id).subscribe(() => this.produtos = this.produtos?.filter(element => element != produto),
      error => this.toastr.error('Erro ao tentar excluir.'));
    }
  }

}
