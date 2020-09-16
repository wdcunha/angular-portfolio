import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';

export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private readonly storage: AngularFireStorage) {}

  uploadFileAndGetMetadata(
    mediaFolderPath: string,
    fileToUpload: File,
  ): { fRef: AngularFireStorageReference; downloadUrl$: AngularFireUploadTask; uploadProgress$: Observable<number | undefined> } {
    const { name } = fileToUpload;
    const filePath = `${mediaFolderPath}/${new Date().getTime()}_${name}`;
    const fileRef: AngularFireStorageReference = this.storage.ref(filePath);
    const uploadTask: AngularFireUploadTask = this.storage.upload(
      filePath,
      fileToUpload,
    );

    return {
      fRef: fileRef,
      downloadUrl$: uploadTask,
      uploadProgress$: uploadTask.percentageChanges(),
    };
  }
}
