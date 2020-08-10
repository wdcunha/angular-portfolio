import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export class Policy {
  id?: string;
  policyNumber?: string;
  creationDate?: Date;
  effectiveDate?: Date;
  expireDate?: Date;
  paymentOption?: string;
  policyAmount?: number;
  extraInfo?: string;
}
