import {Component, OnChanges, OnInit} from '@angular/core';
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

  visiblePolicies: Policy[] = [];
  sortBy: string;

  constructor(
    private policyService: PolicyService,
    private angularFirestore: AngularFirestore,
  ) {
  }

  ngOnInit(): void {
    this.loadPolicies('desc');
    this.sortBy = 'desc';
  }

  loadPolicies(position, key = 'creationDate'): void {
    console.log(key);
    this.policies$ = this.angularFirestore.collection('policies').snapshotChanges()
      .pipe(
        map(actions => actions.map(e => {
          const datas = e.payload.doc.data() as Policy;
          const id = e.payload.doc.id;
          return {id, ...datas};
        }))
      );
    this.policies$.subscribe(policies => {
      this.visiblePolicies = policies;
      // this.visiblePolicies.forEach(value => console.log(value));
      this.visiblePolicies.sort(sortByDate(position, key));
      this.sortBy = position;
    });
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

function sortByDate(position = 'desc', key: string): (a, b) => (0 | any) {

  return function innerSort(a, b): any {
    // console.log(a[key]);

    if (!a[key] || !b[key]) {
      return 0;
    }

    const result = (a[key] < b[key]) ? -1
      : (a[key] > b[key]) ? 1 : 0;

    return position === 'desc' ? result * -1 : result;
  };
}

//
// function sortByDateDesc(firstPolicy: Policy, secondPolicy: Policy): number {
//   if (firstPolicy.creationDate < secondPolicy.creationDate) { return -1; }
//   else if (firstPolicy.creationDate > secondPolicy.creationDate) { return 1; }
//   else { return 0; }
// }

function sortByDateAsc(firstPolicy: Policy, secondPolicy: Policy): number {
  if (firstPolicy.creationDate > secondPolicy.creationDate) {
    return 1;
  } else if (firstPolicy.creationDate === secondPolicy.creationDate) {
    return 0;
  } else {
    return -1;
  }
}
