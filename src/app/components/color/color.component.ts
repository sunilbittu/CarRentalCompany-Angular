import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors: Color[] =[];
  currentColor: Color;
  dataLoaded=false;
  constructor(private colorService:ColorService,private router:Router,private brandService:BrandService) {
    this.brandService.statusUpdated.subscribe(
      ()=>{
        console.log("color içerisi çalıştı");
      }
    )
   }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data;
      this.dataLoaded=true;
    })
  }

  getCurrentColorClass(color:Color){
    if(this.currentColor == color){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  doFilter(color:Color){
    this.currentColor = color;
    this.router.navigate([''],{queryParams:{colorId:color.colorID},queryParamsHandling:"merge"});
  }
  resetColor(){
    this.currentColor={colorID:0,colorName:""};
  }
}
