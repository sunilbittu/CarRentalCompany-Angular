import { Component, OnInit } from '@angular/core';
import {BrandService} from '../../../../services/brand.service';
import {Brand} from '../../../../models/brand';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {

  constructor(private brandService:BrandService, private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  brands:Brand[]=[];
  brandId:number;
  brandDeleteForm:FormGroup;
  brandAddForm:FormGroup;
  brandUpdateForm:FormGroup;

  ngOnInit(): void {
    this.createBrandDeleteForm();
    this.createBrandAddForm();
    this.createBrandUpdateForm();
    this.getBrands()
  }



  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      brandName:['', Validators.required],
      brandModel:['', Validators.required]
    })
  }


  createBrandDeleteForm(){
    this.brandDeleteForm= this.formBuilder.group({
      brandId : ['', Validators.required]
    })
  }


  createBrandUpdateForm(){
    this.brandUpdateForm= this.formBuilder.group({
      brandId : ['', Validators.required],
      brandName:['', Validators.required]
    })
  }


  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }



  addBrand(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.addBrand(brandModel).subscribe(response=>{
        this.toastrService.success('Brand Added')
      })
    }else{
      this.toastrService.error('Form Invalid')
    }
  }





  deleteBrand(){
    if(this.brandDeleteForm.valid){
      let brandModel = Object.assign({}, this.brandDeleteForm.value);
      this.brandService.deleteBrand(brandModel).subscribe(response => {
        let deleted = this.brands.filter(x=>x.brandID == brandModel.brandID)
        let index = this.brands.indexOf(deleted[0]);
        this.brands.splice(index,1)
        this.toastrService.success('Brand Deleted')
      })

    }else{
      this.toastrService.error('Form Invalid')
    }
  }


  updateBrand(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe(response => {
        console.log(brandModel)
        this.toastrService.success('Brand Deleted')
      })

    }else{
      this.toastrService.error('Form Invalid')
    }
  }
}
