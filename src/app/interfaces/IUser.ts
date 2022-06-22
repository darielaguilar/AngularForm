export interface IUser{
  id?:number,
  name?:string,
  email?: string,
  password?: string,
  isStaff?: boolean,
  isActive?: boolean
}
