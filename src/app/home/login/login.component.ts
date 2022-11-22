import { AutenticacaoService } from './../../autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = '';
  senha = '';

  constructor(private authService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.autenticar(this.usuario, this.senha).subscribe(() => {
      console.log('Autenticado com sucesso!');
      this.router.navigate(['animais'])
    },(erro) => {
      console.log('usuario:'+this.usuario);
      console.log('senha:'+this.senha);
      alert('Usuário ou senha inválido!');
    })
  }
}
