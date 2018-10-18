import {Injectable} from '@angular/core';
import firebase from 'firebase';
@Injectable()

export class AutenticacaoProvider{
constructor() {}
	
  loginUser(email: string, password: string): Promise<any> {
		return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  resetPassword(email:string):Promise<void> {
      return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
      return firebase.auth().signOut();
  }

  signup(singup,password): Promise<any> {
	return firebase.auth().createUserWithEmailAndPassword(singup.email, password).then(newUser => {
		  console.log("newUser.user.uid, ",newUser.user.uid);
		  singup.id = newUser.user.uid;
		  console.log("singup: ", singup);
		firebase.database().ref(`/usuario/${singup.id}`).set(singup).then(()=>{console.log("Sucesso");});
  });
  }

}