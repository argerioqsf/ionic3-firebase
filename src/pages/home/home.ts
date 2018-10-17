import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private auth: AutenticacaoProvider) {

  }

  logout(){
    this.auth.logoutUser();
  }

}
