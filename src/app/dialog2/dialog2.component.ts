import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Api2Service } from '../services/api2.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.css']
})
export class Dialog2Component {
  listForm!: FormGroup;
  actionButton: string = 'Mark as Done';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private api2: Api2Service,
    @Inject(MAT_DIALOG_DATA) public doneTask: any,
    private dialogRef: MatDialogRef<Dialog2Component>
  ) {}

  ngOnInit(): void {
    this.listForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.doneTask) {
      this.listForm.controls['title'].setValue(this.doneTask.title);
      this.listForm.controls['description'].setValue(this.doneTask.description);
      this.listForm.controls['date'].setValue(this.doneTask.date);
    }

    
  }

  taskDone (){
    this.api2.postTask(this.listForm.value).subscribe({
      next: (res) => {
        // alert('Task added successfully');
        console.log(res);
        this.listForm.reset();
        this.dialogRef.close('Done');
      },
      error: () => {
        alert('Error while adding the task!');
      },
    });

  }
        
      
}
