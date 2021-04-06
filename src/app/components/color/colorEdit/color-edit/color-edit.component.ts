import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Brand} from '../../../../models/brand';
import {ColorService} from '../../../../services/color.service';
import {Color} from '../../../../models/color';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {

  constructor(private colorService:ColorService, private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  colors:Color[]=[];
  colorId:number;
  color:Color;
  colorDeleteForm:FormGroup;
  colorAddForm:FormGroup;
  colorUpdateForm:FormGroup;

  ngOnInit(): void {
    this.createColorDeleteForm();
    this.createColorAddForm();
    this.createColorUpdateForm();
    this.getColors()
  }



  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName:['', Validators.required]
    })
  }


  createColorDeleteForm(){
    this.colorDeleteForm= this.formBuilder.group({
      colorId : ['', Validators.required]
    })
  }


  createColorUpdateForm(){
    this.colorUpdateForm= this.formBuilder.group({
      colorId : ['', Validators.required],
      colorName:['', Validators.required]
    })
  }


  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }



  addColor(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.addBrand(colorModel).subscribe(response=>{
        this.toastrService.success('Color Added')
      })
    }else{
      this.toastrService.error('Form Invalid')
    }
  }





  deleteColor(){
    if(this.colorDeleteForm.valid){
      let colorModel = Object.assign({}, this.colorDeleteForm.value);
      this.colorService.deleteBrand(colorModel).subscribe(response => {
        let deleted = this.colors.filter(x=>x.colorID == colorModel.brandID)
        let index = this.colors.indexOf(deleted[0]);
        this.colors.splice(index,1)
        this.toastrService.success('Color Deleted')
      })

    }else{
      this.toastrService.error('Form Invalid')
    }
  }


  updateColor(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.updateBrand(colorModel).subscribe(response => {
        console.log(colorModel)
        this.toastrService.success('Color Deleted')
      })

    }else{
      this.toastrService.error('Form Invalid')
    }
  }
}
