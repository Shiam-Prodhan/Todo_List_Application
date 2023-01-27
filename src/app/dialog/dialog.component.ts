import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  listForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef: MatDialogRef<DialogComponent>){}

  ngOnInit(): void
  {

    this.listForm = this.formBuilder.group({
      title : ['',Validators.required],
      description : ['',Validators.required],
      date : ['',Validators.required]
    })

  }

  addTask(){
    console.log(this.listForm.value);
    if(this.listForm.valid){
      this.api.postTask(this.listForm.value)
      .subscribe({
        next: (res)=>{
          alert("Task added successfully");
          this.listForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>
        {
          alert("Error while adding the task!")
        }
      })
    }
  }
}
