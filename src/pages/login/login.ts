import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, Loading, LoadingController, NavController, NavParams,} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    
    public loginForm: FormGroup;
    public loading: Loading;
    public user;
    
    
  constructor(public navCtrl: NavController,
			        public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
			        public authProvider: AutenticacaoProvider,
			        formBuilder: FormBuilder,
 			        public navParams: NavParams) {

	      this.loginForm = formBuilder.group({
		      email: ['',Validators.compose([Validators.required, EmailValidator.isValid])],
          password: ['',Validators.compose([Validators.required, Validators.minLength(6)])
          ]});
        }
	
  	goToSignup():void {
      this.navCtrl.setRoot('signup');
    }

    /*
	  goToResetPassword():void {
		 
    }
    */
    
	  loginUser(): void {
		  if (!this.loginForm.valid) {
			  console.log('Informações invalidas');
		  }else{
			  const email = this.loginForm.value.email;
			  const password = this.loginForm.value.password;
		  	this.authProvider.loginUser(email, password).then(authData => {
          console.log("loginUser.user ,", authData.user.uid, ", key ",authData.key);
          console.log("lOGOU");
          this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(HomePage);
				  });
        },error => {
					this.loading.dismiss().then(() => {
            if(error.code == "auth/wrong-password"){
              const alert: Alert = this.alertCtrl.create({
                message: "Senha incorreta, tente novamente",
                buttons: [{ text: 'Ok', role: 'cancel' }]
              });
              alert.present();
              console.log("Error ,", error);
            }else if(error.code == "auth/user-not-found"){
              const alert: Alert = this.alertCtrl.create({
                message: "Email incorreta, tente novamente",
                buttons: [{ text: 'Ok', role: 'cancel' }]
              });
              alert.present();
              console.log("Error ,", error);
            }
						
					});
				}
			);
			this.loading = this.loadingCtrl.create();
			this.loading.present();
		}
	}
}
