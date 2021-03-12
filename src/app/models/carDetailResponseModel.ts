import { CarDetail } from "./carDetail";
import { ResponseModel } from "./ResponseModel";

export interface CarDetailResponseModel extends ResponseModel{
    data : CarDetail[];
}