import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta
  constructor(private route: ActivatedRoute, private ofertaService : OfertasService ) { }

  ngOnInit() {
    console.log('Id da oferta: ', this.route.snapshot.params['id']) // Recuperando id da oferta usando snapshot
    //this.route.params.subscribe( (parametro: any) => console.log(parametro.id)) // Recuperando id da oferta através de um subscribe
    this.ofertaService.getOfertaPorId(this.route.snapshot.params['id'])
      .then( (oferta: Oferta) => {
        this.oferta = oferta; console.log(this.oferta)
      })
  }

}
