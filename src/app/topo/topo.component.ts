import { CarrinhoService } from './../carrinho.service';
import { Oferta } from './../shared/oferta.model';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
//import '../common-utils/rxjs-extensions'
@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit,OnChanges{

  public ofertas: Observable<Oferta[]>
  public subjectPesquisa: Subject<string> = new Subject<string>()
  
  constructor(private ofertasService: OfertasService,private carrinho : CarrinhoService) { }
  
  contador = 0
  
  ngOnChanges(changes: SimpleChanges): void {

   }

  ngOnInit() {
        
    CarrinhoService.emitContator.subscribe((i)=>{
      this.contador = i
    })
     this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000), // Realiza a requisição a API após 1 segundo
      distinctUntilChanged(), // Se a pesquisa atual for igual a anterior a requisição a API NÃO é executada
      switchMap((termo: string) => {
        if(termo.trim() === ''){ // se termo de pesquisa for vazio retorna um array de Ofertas vazio
          return of<Oferta[]>([])
        }
        //console.log('String enviada para API: ',  termo)
        return this.ofertasService.pesquisarOfertas(termo)
      }),
      catchError( (error: any) => {
        //console.log(error)
        return of<Oferta[]>([])
      })
      
    )

    
 
    
    // Aqui obtem o retorno do subject que realiza a requisição a API
    //this.ofertas.subscribe( (ofertas : Oferta[]) => this.ofertas2 = ofertas )
  }

  public pesquisa(termoDaBusca : string): void {
    //console.log('Keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca) // subject recebe o parametro quando este estiver pronto
  }

  public limpaPesquisa(termoDaBusca : string): void {
    this.subjectPesquisa.next('')
  }

}
