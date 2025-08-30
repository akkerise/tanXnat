export class UserInformation {
  //info
  currentAddress?: string;
  addressOfHouseholdBook?: string;
  personalEmail?: string;
  birthday?: string;
  maritalStatus?: 'SINGLE' | 'MARRIED';
  nationality?: string;
  nation?: string;
  //indentity
  citizenIdentification?: string;
  dateOfIssue?: string;
  placeOfIssue?: string;
  //family
  family?: string;
  //tax
  bankAccountNumber?: string;
  bank?: string;
  taxCode?: string;
  socialInsuranceCode?: string;
  socialInsuranceBook?: string;
  //level
  qualification?: string;
  specialized?: string;
  schoolName?: string;
  graduationYear?: string;
  seniority?: string;
  certificates?: string;
  contactPerson?: string;
}
