import {Component, OnInit} from '@angular/core';
import {Policy} from '../policy.model';
import {PolicyService} from '../policy.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {
  policies$: Observable<Policy[]>;

  constructor(
    private policyService: PolicyService,
    private angularFirestore: AngularFirestore,
  ) {
  }

  ngOnInit(): void {
    this.policies$ = this.angularFirestore.collection('policies').snapshotChanges()
      .pipe(
        map(actions => actions.map(e => {
          const datas = e.payload.doc.data() as Policy;
          const id = e.payload.doc.id;
          return {id, ...datas};
        }))
      );
  }

  create(policy: Policy): void {
    this.policyService.createPolicy(policy);
  }

  update(policy: Policy): void {
    this.policyService.updatePolicy(policy);
  }

  delete(id: string): void {
    this.policyService.deletePolicy(id);
  }
}
