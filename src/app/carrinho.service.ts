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
      itemEncontradoNoCarrinho.valor += itemCarrinho.valor
    } else {
      this.itensCarrinho.push(itemCarrinho)
    } 
  }

  public calcularValorTotalCompras(): number {
    let total: number = 0
    this.itensCarrinho.map( (item: ItemCarrinho) => total+= item.valor * item.quantidade)
    return total
  }

  public alterarQtdeDoItem(item: ItemCarrinho, operador: string): void {
    if(operador === '+'){
      item.quantidade += 1
    } else if (operador === '-'){
      item.quantidade -= 1
      if(item.quantidade === 0){
        let index = this.itensCarrinho.indexOf(item)
        if(index !== -1){
          this.itensCarrinho.splice(index, 1)
        }
      }
    }
  } 

  public limparCarrinho(): void {
    this.itensCarrinho = []
  }
}
