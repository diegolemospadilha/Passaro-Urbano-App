export class ItemCarrinho {
    constructor(
        public id: number,
        public img: object,
        public titulo: string,
        public descricao_oferta: string,
        public quantidade: number,
        public valor: number
    ){}
}