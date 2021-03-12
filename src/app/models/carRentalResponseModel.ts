import { CarRentalDetail } from "./carRentalDetail";
import { ResponseModel } from "./ResponseModel";

export interface CarRentalResponseModel extends ResponseModel{
    data:CarRentalDetail[];
}