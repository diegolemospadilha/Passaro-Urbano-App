import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'nome' : new FormControl(null, [ Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    'email' : new FormControl(null, [ Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    'menssagem' : new FormControl(null),
  })

   enviado: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public enviar(): void {
    this.enviado = true;
   }
}
