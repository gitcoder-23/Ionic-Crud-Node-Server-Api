export class EmployeeModel {
  constructor(
    public success?: boolean,
    public count?: number,
    public message?: string,
    public employees?: EmployeeDataModel[] | null
  ) {}
}

export class EmployeeDataModel {
  constructor(
    public _id?: string,
    public name?: string,
    public email?: string,
    public phone?: string,
    public salary?: string,
    public position?: string,
    public createdAt?: Date | string,
    public updatedAt?: Date | string,
    public __v?: number
  ) {}
}
