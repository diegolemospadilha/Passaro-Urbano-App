import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number
  public itensCarrinho: ItemCarrinho[]

  public formulario: FormGroup = new FormGroup({
    'endereco' : new FormControl(null, [ Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    'numero' : new FormControl(null, [ Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
    'complemento' : new FormControl(null),
    'formaPagamento' : new FormControl(null, [ Validators.required ])
  })

  constructor(private ordemCompraService: OrdemCompraService, private carrinhoService : CarrinhoService) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItensDoCarrinho();
  }

  public confirmarCompra(): void {
    let pedido: Pedido = new Pedido(
      null, this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento
    )

    this.ordemCompraService.efetivarCompra(pedido).subscribe(
      (pedido: Pedido) => {
        this.idPedidoCompra = pedido.id
      }
    )
  }
}
