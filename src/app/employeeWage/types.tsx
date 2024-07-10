export default interface IEmployeeWage {
  wageId: number;
  employeeId: number;
  farmWorkId: number;
  startDate: Date;
  endDate: Date;
  wage: number;
  wageUom: string;
  updatedBy: string;
  updatedOn: Date;
}