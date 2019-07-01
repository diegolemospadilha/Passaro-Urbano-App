import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable } from 'rxjs';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  
  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
  }

  public pesquisa(termoDaBusca : string): void {
    //console.log(termoDaBusca)
    this.ofertas = this.ofertasService.pesquisarOfertas(termoDaBusca)
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas), // 1 param  - fluxo a ser executado 
      (erro: any) => console.log('Mensagem de erro', erro.message), // 2 param -  função para tratativa de algum erro que aconteça durante o fluxo
      () => console.log('Execução do fluxo finalizado com sucesso') // 3 param -  Método complete realizado após execução do fluxo
    )
  }

}
