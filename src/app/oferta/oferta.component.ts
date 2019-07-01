import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { interval, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta
 

  constructor(private route: ActivatedRoute, private ofertaService : OfertasService ) { }

  ngOnInit() {
    console.log('Id da oferta: ', this.route.snapshot.params['id']) // Recuperando id da oferta usando snapshot
    this.ofertaService.getOfertaPorId(this.route.snapshot.params['id'])
     .then( (oferta: Oferta) => {
        this.oferta = oferta; console.log(this.oferta)
      }) 
  }

  ngOnDestroy(){
    
  }
    //  this.route.params.subscribe( 
    //       (parametro: any) => console.log(parametro.id), // Recuperando id da oferta através de um subscribe
    //       (error: any) => console.log(error),
    //       () => console.log('Processamento foi classificado como concluido')
    //   )}

    

}
