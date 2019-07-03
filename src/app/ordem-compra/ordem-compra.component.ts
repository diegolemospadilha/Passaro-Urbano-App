import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number

  public endereco: string = ''
  public numero: number = null
  public complemento: string = ''
  public formaPagamento: string = ''

  /* Variaveis para controle de validação dos campos */
  public enderecoValido : boolean
  public numeroValido : boolean
  public complementoValido : boolean
  public formaPagamentoValido : boolean

  /* Variaveis para controle dos estados primitivos dos campos */
  public enderecoEstadoPrimitivo : boolean = true
  public numeroEstadoPrimitivo : boolean = true
  public complementoEstadoPrimitivo : boolean = true
  public formaPagamentoEstadoPrimitivo : boolean = true

  /* Variavel p/ controle de submissão do form */
  public formEstado : string = 'disabled'

  public pedido: Pedido = new Pedido(null,'', null, '','')
  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    //this.ordemCompraService.efetivarCompra()
  }
  
  public atualizaEndereco(endereco : string): void {
    this.endereco = endereco
    this.enderecoEstadoPrimitivo = false
    if(this.endereco.length > 3){
      this.enderecoValido = true
    } else {
      this.enderecoValido = false
    }

    //console.log(this.endereco)
    this.habilitaEnvioForm()
  }
  
  public atualizaNumero(numero: number): void {
    this.numero = numero
    this.numeroEstadoPrimitivo = false
    if(this.numero > 0){
      this.numeroValido = true
    } else {
      this.numeroValido = false
    }
    this.habilitaEnvioForm()
  }
  
  public atualizaComplemento( complemento: string): void {
    this.complemento = complemento
    this.complementoEstadoPrimitivo = false
    if(this.complemento.length > 0){
      this.complementoValido = true
    }
    //console.log(this.complemento)
    this.habilitaEnvioForm()
  }
  
  public atualizaFormaPagamento(formaPagamento: string): void {
    this.formaPagamento = formaPagamento
    this.formaPagamentoEstadoPrimitivo = false
    if(this.formaPagamento.length > 0){
      this.formaPagamentoValido = true
    } else {
      this.formaPagamentoValido = false
    }
    //console.log(this.formaPagamento)
    this.habilitaEnvioForm()
  }

  public habilitaEnvioForm(): void {
    if (this.enderecoValido && this.numeroValido && this.formaPagamentoValido){
      this.formEstado = ''
    } else {
      this.formEstado = 'disabled'
    }
  }

  public confirmarCompra(): void {
    this.pedido.endereco = this.endereco
    this.pedido.numero = this.numero
    this.pedido.complemento = this.complemento
    this.pedido.formaPagamento = this.formaPagamento
    this.ordemCompraService.efetivarCompra(this.pedido).subscribe(
      (pedido: Pedido) => this.idPedidoCompra = pedido.id
    )
  }
}
