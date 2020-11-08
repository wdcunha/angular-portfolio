import {Component, OnInit} from '@angular/core';
import {Policy} from '../policy.model';
import {PolicyService} from '../policy.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormControl} from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {
  policies$: Observable<Policy[]>;
  policie: Policy = new Policy();
  fieldsList;
  visiblePolicies: Policy[] = [];
  sortBy: string;
  queryField = new FormControl();
  searchResults$: Observable<any>;
  datePickerCmp: NgbDateStruct;
  date3: Date;

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
      console.log(this.visiblePolicies[0]);
      console.log(Object.keys(this.visiblePolicies[0]));
      this.fieldsList = Object.keys(this.visiblePolicies[0]);
      console.log(this.fieldsList);
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

  /**
   * postponed because it wasn't find a solution for now ******
   */
  selectFieldType(field): void {
    const value = this.queryField.value;

    if (field === 'policyNumber' || field === 'policyAmount') {

    }

    console.log(value);
    console.log(field);
    // console.log(this.visiblePolicies.filter(p => console.log(p)));

    // this.visiblePolicies = this.visiblePolicies.filter(p => (p[field] || '').includes(value));

    // this.visiblePolicies = this.visiblePolicies.filter(p => {
    //   // p[field].includes(value);
    //   console.log(p);
    //   console.log(p[field].includes(value) + '-' + p[field]);
    // });


    // switch {
    //   obj[field]
    //   case ºDateº
    //     // todo qqr coisa
    //     break
    // }
    // console.log(PoliciesKeys);

    // const pp = this.visiblePolicies;
    const pp = this.visiblePolicies[0];
    // this.policie.policyNumber = pp.policyNumber;
    console.log(Object.keys(pp));

    // this.policie['policyNumber'] = pp['policyNumber'];
    console.log(this.policie);
    console.log(pp);

    Object.keys(pp).forEach(k => {
      this.policie[k] = pp[k];

      // console.log(this.policie);
      console.log(typeof this.policie[k]);

      console.log(k);
      console.log(pp[k]);
      console.log(pp[k] ? typeof pp[k] : '');
    });
    console.log(field in Policy);
    console.log(field);
    // console.log(Policy.prototype[field]);
    // console.info(Policy[field].type);

  }

  onSearch(field: string): void {
    const value = this.queryField.value;
    if (value) {
      this.visiblePolicies = this.visiblePolicies.filter(p => (p[field] || '').includes(value));
    } else {
      this.loadPolicies('desc');
    }
  }

  clearForm(): void {
    this.queryField.reset();
    this.loadPolicies('desc');

  }
}

function sortByDate(position = 'desc', key: string): (a, b) => (0 | any) {

  console.log(key);
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

function sortByDateAsc(firstPolicy: Policy, secondPolicy: Policy): number {
  if (firstPolicy.creationDate > secondPolicy.creationDate) {
    return 1;
  } else if (firstPolicy.creationDate === secondPolicy.creationDate) {
    return 0;
  } else {
    return -1;
  }
}
