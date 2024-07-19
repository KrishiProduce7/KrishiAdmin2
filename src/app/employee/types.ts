export default interface IEmployee {
  employeeId: number;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dob: Date;
  startDate: Date;
  endDate: Date;
  roleId: number;
  updatedBy: string;
  updatedOn: Date;
}

export const SUPER_ADMIN = 1;
export const EMPLOYEE_TYPE = 4;