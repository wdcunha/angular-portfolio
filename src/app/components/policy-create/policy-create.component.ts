import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PolicyService} from '../policy.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-policy-create',
  templateUrl: './policy-create.component.html',
  styleUrls: ['./policy-create.component.css']
})
export class PolicyCreateComponent implements OnInit {

  policyForm: FormGroup;
  dateField = new Date();
  exDate = new Date('Mon Aug 10 2020 20:24:14 GMT+0100');

  constructor(
    private formBuilder: FormBuilder,
    private policyService: PolicyService,
    public router: Router
) {}

  ngOnInit(): void {
    this.policyForm = this.formBuilder.group({
      policyNumber: [''],
      policyAmount: null,
      creationDate: null,
      expireDate: null,
    });
  }

  onSubmit(): void {

    const policy = {
      id: undefined,
      policyNumber: this.policyForm.value.policyNumber,
      policyAmount: this.policyForm.value.policyAmount,
      creationDate: this.dateField,
      expireDate: this.exDate,
    };

    const jsonPol = JSON.parse(JSON.stringify(policy));

    this.policyService.createPolicy(jsonPol)
      .then(_ => this.router.navigate(['policies']));

  }
}
