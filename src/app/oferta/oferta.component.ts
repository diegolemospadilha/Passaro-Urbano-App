import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { interval, Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta
  public tempoObservableSubscription: Subscription
  public myObservableSubscription: Subscription

  constructor(private route: ActivatedRoute, private ofertaService : OfertasService ) { }

  ngOnInit() {
    console.log('Id da oferta: ', this.route.snapshot.params['id']) // Recuperando id da oferta usando snapshot
    this.ofertaService.getOfertaPorId(this.route.snapshot.params['id'])
     .then( (oferta: Oferta) => {
        this.oferta = oferta; console.log(this.oferta)
      }) 

      let tempo = interval(2000)
      this.tempoObservableSubscription = tempo.subscribe( (intervalo: number) => {
      console.log(intervalo)
    })
    
    /**
     * param observer : Parametro obtido no Observable
     */
    let meuObservableTeste = Observable.create(
       (observer: Observer<number>) => {
         observer.next(1)
         observer.next(2)
         // observer.error("Algum erro foi gerado") // Usado para tratativas de erro
         observer.complete() // Finaliza a stream do observer
        })

    /**
     * Observable
     */
     this.myObservableSubscription = meuObservableTeste.subscribe(
       (numero : number) => console.log(numero * 2),
       (error : string)  => console.log(error),
       () => console.log("Algum erro foi encontrado.")
     )
  }

  ngOnDestroy(){
    this.tempoObservableSubscription.unsubscribe()
    this.myObservableSubscription.unsubscribe()
  }
    //  this.route.params.subscribe( 
    //       (parametro: any) => console.log(parametro.id), // Recuperando id da oferta através de um subscribe
    //       (error: any) => console.log(error),
    //       () => console.log('Processamento foi classificado como concluido')
    //   )}

    

}
