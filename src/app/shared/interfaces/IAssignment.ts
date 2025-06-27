export interface IAssignment {
  asset: {
    assetId: string;
    name: string;
    serialNumber: string;
  };
  admin: {
    adminId: string;
    name: string;
  };
  employee: {
    employeeId: string;
    name: string;
  };
  dateAssigned: string;
  isLinked: boolean;
  location: {
    locationId: string;
    city: string;
    country: string;
  };
}
