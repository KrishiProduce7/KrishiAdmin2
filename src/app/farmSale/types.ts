export default interface IFarmSale {
  saleId: number;
  customerId: number;
  saleDate: Date;
  saleQty: string;
  saleDollar: number;
  updatedBy: number;
  updatedOn: Date;
}