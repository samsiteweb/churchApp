
export interface TransMember {
  Name: string
  Email: string
  PhoneNumber: string
  ContactInfo: string
  IsMemberActive: boolean
  LastModifiedView: string
  DateCreatedView: string
  DateCreated: string
  LastModified: string
  MemberId: string
  AllowMemberToRecieveNotification: boolean
  AlternativeEmailAddress: string
  AlternativeMobileContact: string

}

export interface MemberData {
  userId: string;
  Name: string;
  Email: string;
  PhoneNumber: string;
  roleInfo: [
    {
      isRoleActive: string;
      roleType: string;
      roleTitle: string;
      roleId: string;
    }
  ];
  DateCreatedView: string;
}
