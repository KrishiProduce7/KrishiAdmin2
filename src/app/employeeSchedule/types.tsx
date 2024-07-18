export default interface IEmployeeSchedule {
  actualEndDateTime: Date;
  actualStartDateTime: Date;
  assignedEndDateTime: Date;
  assignedStartDateTime: Date;
  employeeId: number;
  employeeName: string;
  farmWorkId: number;
  farmworkName: string;
  taskDesc: string;
  taskId: number;
  taskNotes: string;
  taskPercentComplete: number;
}


