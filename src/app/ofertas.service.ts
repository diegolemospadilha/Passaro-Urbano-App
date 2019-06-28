import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';

import { HttpClient } from '@angular/common/http'
import { URL_API_OFERTAS, URL_API_COMO_USAR, URL_API_ONDE_FICA } from './app.api';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  constructor(private http: HttpClient) { }

  public getOfertas(): Promise<Oferta[]> {
     return this.http.get(`${URL_API_OFERTAS}?destaque=true`).toPromise()
              .then( (resposta: any) => resposta)
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
    return this.http.get(`${URL_API_OFERTAS}?categoria=${categoria}`).toPromise()
              .then( (resposta: any) => resposta )
  }

  public getOfertaPorId( id: number): Promise<Oferta>{
    return this.http.get(`${URL_API_OFERTAS}?id=${id}`).toPromise()
            .then( (resposta : any) => resposta.shift(0) )
  }

  /**
   * Método que busca as informações no banco de dados referentes a como usar e onde fica de cada oferta.
   * @param id = id da oferta
   */
  public getMaisInformacoesOfertaPorId(id: number, tipoInformacao: string): Promise<string>{
    let busca : String
    tipoInformacao === 'como-usar' ? busca = URL_API_COMO_USAR : busca = URL_API_ONDE_FICA
    return this.http.get(`${busca}?id=${id}`).toPromise()
    .then( (resposta : any) => resposta.shift(0).descricao )
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
