import { Injectable } from '@angular/core';
import {User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) { }
}
