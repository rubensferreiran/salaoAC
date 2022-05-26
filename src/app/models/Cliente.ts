export class Cliente {
    id!: number;
    nome!: string;
    telefone!: number;
    dataNascimento!: Date;
    eMail!: string;
    endereco!: Endereco;
}

export class Endereco {
    rua!: string;
    numero!: string;
    bairro!: string;
    complemento!: string;
    cidade!: string;
    estado!: string;
}