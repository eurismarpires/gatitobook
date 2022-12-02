import { RodapeModule } from './componentes/rodape/rodape.module';
import { CabecalhoModule } from './componentes/cabecalho/cabecalho.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ //define quais componentes/pipes/diretivas pertencem ao módulo
    AppComponent,
  ],
  imports: [            //define quais módulos a aplicação precisa importar
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CabecalhoModule,
    RodapeModule
  ],
  providers: [], //os serviços que serão utilizados pelos componentes
  bootstrap: [AppComponent], //módulo principal da aplicação
  exports: [] //quais componetes ficaram visíveis para outros módulos
})
export class AppModule { }
