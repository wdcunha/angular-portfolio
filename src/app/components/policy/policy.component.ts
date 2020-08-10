import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Policy} from '../policy.model';
import {PolicyService} from '../policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  policy$: Observable<Policy>;
  id: string;

  constructor(
    private policeService: PolicyService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit(): void {
    this.policy$ = this.policeService.getPolicy(this.id);
  }

}
