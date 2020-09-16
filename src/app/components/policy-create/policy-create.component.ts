import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PolicyService} from '../policy.service';
import {User} from 'firebase';
import {Router} from '@angular/router';
import {EMPTY, Observable, Subject} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {catchError, finalize, takeUntil} from 'rxjs/operators';
import {StorageService} from '../../services/storage/storage.service';
import {MEDIA_STORAGE_PATH} from '../../services/storage/storage.const';

@Component({
  selector: 'app-policy-create',
  templateUrl: './policy-create.component.html',
  styleUrls: ['./policy-create.component.css']
})
export class PolicyCreateComponent implements OnInit, OnDestroy {
  destroy$: Subject<null> = new Subject();
  fileToUpload: File;
  policyForm: FormGroup;
  dateField = new Date();
  exDate = new Date('Mon Aug 10 2020 20:24:14 GMT+0100');
  user: User;
  currentInput: any;
  submitted: boolean;
  uploadProgress$: Observable<number>;
  mediaFolderPath: any;
  private imageUrl: Observable<string>;
  fb: string;

  constructor(
    private formBuilder: FormBuilder,
    private policyService: PolicyService,
    public router: Router,
    public authService: AuthService,
    public readonly storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.policyForm = this.formBuilder.group({
      policyNumber: [''],
      photo: [null, Validators.required],
      description: [null, Validators.required],
      policyAmount: null,
      creationDate: null,
      expireDate: null,
    });
    this.user = this.authService.currentUser;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  onSubmit(): void {
    this.saveFileStorage();
  }

  private imageValidation(file): boolean {
    if (file) {
      return this.policyService.validateFile(file);
    }
  }

  onFileLoad(event): void {

    const reader = new FileReader();

    this.fileToUpload = event[0];

    reader.readAsDataURL(this.fileToUpload);

    reader.onload = () => (
      this.currentInput = reader.result);

    if (this.fileToUpload && this.imageValidation(this.fileToUpload)) {
      console.log('entrou aqui');
      console.log(this.authService.currentUser.email);
    }
  }

  saveData(): void {

    const policy = {
      id: undefined,
      photo: this.fb,
      policyNumber: this.policyForm.value.policyNumber,
      policyAmount: this.policyForm.value.policyAmount,
      creationDate: this.dateField,
      expireDate: this.exDate,
    };

    console.log(policy.photo);

    const jsonPol = JSON.parse(JSON.stringify(policy));

    this.policyService.createPolicy(jsonPol)
      .then(_ => this.router.navigate(['policies']));
  }

  saveFileStorage(): void {
    this.submitted = true;
    this.mediaFolderPath = `${MEDIA_STORAGE_PATH}/${this.authService.currentUser.email}/media/`;

    const {fRef, downloadUrl$, uploadProgress$} = this.storageService.uploadFileAndGetMetadata(
      this.mediaFolderPath,
      this.fileToUpload,
    );

    this.uploadProgress$ = uploadProgress$;

    downloadUrl$
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          this.imageUrl = await fRef.getDownloadURL();
          this.imageUrl.subscribe(url => {
            if (url) {
              this.fb = url;
              console.log(this.fb);
              this.saveData();
            }
          });
        })
      ).subscribe(url => {
        if (url) {
        }
      });
  }
}
