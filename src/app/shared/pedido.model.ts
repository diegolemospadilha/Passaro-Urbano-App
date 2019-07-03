export class Pedido {
    constructor(
        public id : number,
        public endereco: string,
        public numero: number,
        public complemento: string,
        public formaPagamento: string
    ){}
}