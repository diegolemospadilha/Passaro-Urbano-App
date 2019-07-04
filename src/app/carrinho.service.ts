import { Injectable } from '@angular/core';
import { ItemCarrinho } from './shared/item-carrinho.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  
  public itensCarrinho: ItemCarrinho[] = []
  
  constructor() { }
  
  public exibirItensDoCarrinho(): ItemCarrinho[] {
    return this.itensCarrinho
  }

  public addItemAoCarrinho(itemCarrinho: ItemCarrinho) {
    /** Verificando se item a ser add no carrinho já existe ou não. Retorna a referência do obj caso exista*/
    let itemEncontradoNoCarrinho = this.itensCarrinho.find( (item: ItemCarrinho) => item.id === itemCarrinho.id)
    if(itemEncontradoNoCarrinho){
      itemEncontradoNoCarrinho.quantidade += 1
    } else {
      this.itensCarrinho.push(itemCarrinho)
    }
    
  }
}
