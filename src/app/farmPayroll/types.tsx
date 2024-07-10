export default interface IFarmPayroll {
  payrollId: number,
  employeeId: number,
  payStartDate: Date,
  payEndDate: Date,
  paiedOn: boolean,
  amountPaid: number,
  updatedBy: string,
  updatedOn: Date
}