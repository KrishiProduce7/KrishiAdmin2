export interface IItem {
  itemId: number;
  itemName: string;
  deptId: number;
  classId: number;
  uom: string;
  updatedBy: string;
  updatedOn: Date;
}

export interface IClass {
  classId: number;
  className: string;
  deptId: number;
  updatedBy: string;
  updatedOn: Date;
}