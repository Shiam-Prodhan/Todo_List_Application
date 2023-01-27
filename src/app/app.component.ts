import { Component, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Todo List';
  constructor(private dialog: MatDialog, private api: ApiService){
  }
  ngOnInit(): void {
    this.getAllTask();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
    });
  }
  getAllTask(){
    this.api.getTask()
    .subscribe({
      next:(res)=>
      {
        console.log(res);
      },

      error:()=>
      {
        alert("error while fetching data")
      }

    })

  }
}
