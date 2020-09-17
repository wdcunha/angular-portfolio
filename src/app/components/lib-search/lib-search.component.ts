import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.css']
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  readonly fieldsParam = 'name,description,version,homepage';
  results$: Observable<any>;
  total: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.queryField.valueChanges
      .pipe(
        map(res => res.trim()),
        filter(res => res.length > 1),
        debounceTime(200),
        distinctUntilChanged(),
        // tap(res => console.log(res)),
        switchMap(value => this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.fieldsParam
          }
        })),
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      ).subscribe();
  }

  onSearch(): void {
    const fieldsParam = 'name,description,version,homepage';
    let value = this.queryField.value;

    if (value && value.trim() !== '') {
      value = value.trim();

      const params_ = {
        search: value,
        fields: fieldsParam
      };

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fieldsParam);

      this.results$ = this.http.get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
        );
    }

  }
}
