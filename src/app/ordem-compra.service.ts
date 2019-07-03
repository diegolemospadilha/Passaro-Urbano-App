import { Pedido } from './shared/pedido.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API_PEDIDOS } from './app.api';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrdemCompraService {

    constructor(private http: HttpClient){}
    public efetivarCompra(pedido: Pedido): Observable<any>{
        //console.log(pedido)

        return this.http.post(`${URL_API_PEDIDOS}`, pedido).pipe(
            map( (resposta: any) => resposta)) 
    }
}