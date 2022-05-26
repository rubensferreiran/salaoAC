import { Cliente } from "./Cliente";
import { Produto } from "./Produto";
import { Servico } from "./Servico";

export class ServicoRealizado {
    id!: number;
    cliente!: Cliente;
    servicos: Servico[] = [];
    produtos: Produto[] = [];
    valor!: number;
    dataServicoRealizado: Date = new Date;
}