import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  constructor(private http: HttpClient) { }

  public getOfertas(): Promise<Oferta[]> {
     return this.http.get('http://localhost:3000/ofertas?destaque=true').toPromise()
              .then( (resposta: any) => resposta)
  }


    /*

    public getOfertas(): Array<Oferta> {
      return this.ofertas;
    }
  
    // Recuperando as ofertas usando promises
    public getOfertas2(): Promise<Oferta[]> {
      return new Promise( (resolve, reject) => {
        
        let retorno = true;
        //retorno ? resolve( this.ofertas ) : reject({codigo_erro: 404, message: 'Servidor não disponível.'})
        retorno ? setTimeout(() => resolve( this.ofertas ) , 3000) : reject({codigo_erro: 404, message: 'Servidor não disponível.'})
      }).then( (ofertas : Oferta[]) => {
        console.log("Executando primeiro then")
        return ofertas;
      }).then( (ofertas : Oferta[]) => {
        console.log("Executando segundo then")
        return ofertas;
      })
    }
    */
}
