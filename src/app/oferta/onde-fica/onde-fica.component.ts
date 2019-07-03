import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService]
})
export class OndeFicaComponent implements OnInit {

  public descricao : string
  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      (parametros: Params) => {
        this.ofertasService.getMaisInformacoesOfertaPorId( parametros.id,'onde-fica' )
          .then( (descricao : string) => this.descricao = descricao)
      }
    )
  }

}
