import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  textoDigitado;
  dadosUsuario;
  dadosOutros;
  conversas = [];
  mensagens = [];

  constructor(
    public navCtrl: NavController,
    private auth: AutenticacaoProvider,
    private firebaseProvider: FirebaseProvider) {

      this.getMessage();
  }

  getMessage(){

    this.firebaseProvider.refOn('usuario/'+firebase.auth().currentUser.uid).on('value', snap =>{
      this.dadosUsuario = snap.val();
    });

    this.firebaseProvider.refOn('conversas/').on('value', snap =>{
      this.mensagens = [];
      snap.forEach(conversas =>{
        this.mensagens.push(conversas.val());
      });
    });
  }

  logout(){
    this.auth.logoutUser();
  }

  ajusteTextArea(event: any){
    let textarea: any = event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    return;
  }

  enviarMensagem(textoDigitado){
    if(textoDigitado != ''){
      let fila = this.firebaseProvider.fila();
      this.firebaseProvider.set("conversas/"+fila,{
        usuario: this.dadosUsuario.nickname,
        mensagem: textoDigitado,
        hora: fila
      });
      this.textoDigitado = '';
    }
  }

}
