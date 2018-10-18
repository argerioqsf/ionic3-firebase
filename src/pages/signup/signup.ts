import { Component } from '@angular/core';
import { Alert, IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'signup'
})

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupForm: FormGroup;
  public loading: Loading;
  public user;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
			        public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
			        public authProvider: AutenticacaoProvider,
			        formBuilder: FormBuilder) {
    
    this.signupForm = formBuilder.group({
      email: ['',Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
      nickname: ['',Validators.compose([Validators.required, Validators.maxLength(20)])]
    });

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  Login(){
    this.navCtrl.setRoot(LoginPage);
  }

  signupUser(): void {
    if (!this.signupForm.valid) {
      console.log('Informações invalidas');
    }else{
      const password = this.signupForm.value.password;
      this.signupForm.value.password = null;
      this.authProvider.signup(this.signupForm.value, password).then(authData => {
        console.log("CRIOU");
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: "Conta criada com sucesso.",
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          alert.present();
          this.navCtrl.setRoot(HomePage);
        });
      },error => {
        this.loading.dismiss().then(() => {
          if(error == "Error: The email address is already in use by another account."){
            this.signupForm.value.password = password;
            this.signupForm.value.Cpassword = password;
            this.loading.dismiss().then(() => {
                const alert2: Alert = this.alertCtrl.create({
                title:'O endereço de e-mail já está sendo usado por outra conta.',
                buttons: ["Ok"]
            });
            alert2.present();
            });
          }else{
            this.signupForm.value.password = password;
            this.signupForm.value.Cpassword = password;
            this.loading.dismiss().then(() => {
              const alert2: Alert = this.alertCtrl.create({
                title:'Ocorreu algum probelma inesperado, Por favor, tente novamente',
                subTitle: this.signupForm.value,
                message: error,
                buttons: [{ text: "Ok", role: "cancel" }]
              });
              alert2.present();
            });
          }
        });
      }
    );
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}

}
