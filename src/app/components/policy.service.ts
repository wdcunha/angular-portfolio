import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Policy} from './policy.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(
    private angularFirestore: AngularFirestore,
  ) {
  }

  getPolicies(): Observable<any> {
    return this.angularFirestore.collection('policies').snapshotChanges();
  }

  getPolicy(policyId: string): Observable<Policy> {
    return this.angularFirestore.doc<Policy>('policies/' + policyId).valueChanges();
  }

  createPolicy(param): Promise<any> {
    return this.angularFirestore.collection('policies').add(param);
  }

  updatePolicy(policy: Policy): void {
    delete policy.id;
    this.angularFirestore.doc('policies/' + policy.id).update(policy);
  }

  deletePolicy(policyId: string): void {
    this.angularFirestore.doc('policies/' + policyId).delete();
  }
}
