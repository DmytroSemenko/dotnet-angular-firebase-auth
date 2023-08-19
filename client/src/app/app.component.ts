import { Component } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Auth, User, authState, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public readonly user: Observable<User | null> = EMPTY;

  email = '';
  password = '';
  displayName = '';
  secretData = '';
  
  constructor(public auth: Auth, public httpClient : HttpClient) {
    this.user = authState(this.auth);
  }

  async userSignUpWithEmailAndPassword(email : string, password : string){
    var result = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(result.user, {displayName: this.displayName});
  }

  async userSignInWithEmailAndPassword(email : string, password : string){
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async userSignInWithGoogle(){
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async userSignOut(){
    await signOut(this.auth);
  }

  async deleteUser(){
    await this.auth.currentUser?.delete();
  }

  async getApiSecretData(){
    var accessToken = await this.auth.currentUser?.getIdToken();
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${accessToken}`)
    .set('Content-Type', 'text/plain; charset=utf-8');

    this.httpClient.get('http://localhost:5055/secret', { headers: headers, responseType: 'text' }).subscribe(data => {
      this.secretData = data;
    });
  }
}
