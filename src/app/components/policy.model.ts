
export class Policy {
  id?: string;
  policyNumber?: string;
  photo?: string;
  creationDate?: Date;
  effectiveDate?: Date;
  expireDate?: Date;
  paymentOption?: string;
  policyAmount?: number;
  extraInfo?: string;
}

export interface IPolice {
  id?: string;
  policyNumber?: string;
  photo?: string;
  creationDate?: Date;
  effectiveDate?: Date;
  expireDate?: Date;
  paymentOption?: string;
  policyAmount?: number;
  extraInfo?: string;
}
// const obj = {
//   id: 'string';
//   policyNumber?: string;
//   photo?: string;
//   creationDate?: Date;
//   effectiveDate?: Date;
//   expireDate?: Date;
//   paymentOption?: string;
//   policyAmount?: number;
//   extraInfo?: string;
// }
//
//
export type PoliciesKeys = keyof Policy;


