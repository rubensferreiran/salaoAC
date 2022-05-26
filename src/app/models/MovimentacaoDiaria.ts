import { Despesa } from "./Despesa";
import { ServicoRealizado } from "./ServicoRealizado";

export class MovimentacaoDiaria {
    id!: number;
    servicoRealizado!: ServicoRealizado;
    despesa!: Despesa;
    dataMovimentacao: Date = new Date();
}