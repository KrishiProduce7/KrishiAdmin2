export default interface IEmployeeTask {
  taskId: number,
  employeeId: number,
  farmWorkId: number,
  taskDesc: string,
  assignedStartDateTime: Date,
  assignedEndDateTime: Date,
  actualStartDateTime: Date,
  actualEndDateTime: Date
  taskPercentComplete: number,
  taskNotes: string
  isActive: number,
  updatedBy: string,
  updatedOn: Date
}