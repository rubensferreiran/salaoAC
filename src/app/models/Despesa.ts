export class Despesa {
    id!: number;
    fornecedor!: string;
    valorPagoFornecedor!: number;
    dataPagamento: Date = new Date();
}