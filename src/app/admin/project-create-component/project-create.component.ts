import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'project-create-component',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  projectForm: FormGroup;
  // title: FormControl;
  // image: FormControl;
  // text: FormControl;

  constructor(
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.title = new FormControl('');
    // this.image = new FormControl('');
    // this.text = new FormControl('');

    this.projectForm = this.formBuilder.group({
      title: [''],
      image:  [''],
      text: ['']
    });
  }

  onSubmit(): void {
    console.log(this.projectForm.value);
  }
}
