export interface MemberData {
  // UserId: string;
  // FirstName: string;
  // LastName: string;
  // Email: string;
  // PhoneNumber: string;
  // IsRoleActive: boolean;
  // RoleType: number;
  // RoleId: string;
  // RoleMeaning: string;
  // DateCreatedView: string;
  // DateCreated: string;

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
