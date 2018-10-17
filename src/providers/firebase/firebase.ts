import { Injectable } from '@angular/core';
import firebase from 'firebase';
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  user;
  constructor() {
    console.log('Hello FirebaseProvider Provider');
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user.uid;
        //unsubscribe();
      }
    });
  }

  list(path){
    return new Promise((resolve, reject)=>{
			let list = [];
			firebase.database().ref(path).once("value",userProfileSnapshot=>{
				let result = userProfileSnapshot;
				result.forEach(element => {
					list.push(element.val());
        });
        console.log("result/list: ",list);
				resolve(list);
			},error=>{
        console.log("Erro/list: ",error);
				resolve("Erro");
			});
		  });
  }
  object(path){
    return new Promise((resolve, reject)=>{
			firebase.database().ref(path).once("value",userProfileSnapshot=>{
				let object = userProfileSnapshot.val();
				console.log("result/object:",object);
				resolve(object);
			},error=>{
        console.log("Erro/object: ",error);
				resolve("Erro");
			});
		  });
  }
  refOn(path){
    return firebase.database().ref(path);
  }
  refOff(path){
    return firebase.database().ref(path).off();
  }

}
