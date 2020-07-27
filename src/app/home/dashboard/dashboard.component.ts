import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 data_result=[]; 
 device=[];
 list_drivers=[];
 name: string;
  position: number;
  weight: number;
  symbol: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('./assets/json/devicelist.json').subscribe(data=>{
     
      this.data_result= data['search_results'];
      for(var i=0;i<this.data_result.length;i++)
    {
      this.device.push(this.data_result[i].device_cap)
      this.list_drivers = this.device;
    }
      //this.device = this.data_result.device_cap;

      //console.log(JSON.stringify(this.data_result))
      console.log(JSON.stringify(this.list_drivers))
    })

    
  }

  

}
