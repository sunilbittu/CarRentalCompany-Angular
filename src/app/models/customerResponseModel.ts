import { CustomerDetail } from "./customerDetail";
import { ResponseModel } from "./ResponseModel";

export interface CustomerResponseModel extends ResponseModel{
    data: CustomerDetail[];
}