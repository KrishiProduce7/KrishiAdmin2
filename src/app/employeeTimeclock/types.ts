export default interface IEmployeeTimeclock {
  timeclockId: number;
  employeeId: number;
  farmWorkId: number;
  clockInGeo: string;
  clockOutGeo: string;
  ClockIn: Date;
  ClockOut: Date;
  Hours: number;
  updatedBy: string;
  updatedOn: Date;
}