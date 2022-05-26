export class Despesa {
    id!: number;
    fornecedor!: string;
    valor!: number;
    dataPagamento: Date = new Date();
}