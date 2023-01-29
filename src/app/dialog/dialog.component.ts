import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Api2Service } from '../services/api2.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  listForm!: FormGroup;
  actionButton: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private api2: Api2Service,
    @Inject(MAT_DIALOG_DATA) public editTask: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.listForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editTask) {
      this.actionButton = 'Update';
      this.listForm.controls['title'].setValue(this.editTask.title);
      this.listForm.controls['description'].setValue(this.editTask.description);
      this.listForm.controls['date'].setValue(this.editTask.date);
    }
  }

  addTask() {
    console.log(this.listForm.value);
    if (!this.editTask) {
      if (this.listForm.valid) {
        this.api.postTask(this.listForm.value).subscribe({
          next: (res) => {
            // alert('Task added successfully');
            this.listForm.reset();
            this.dialogRef.close('Save');
          },
          error: () => {
            alert('Error while adding the task!');
          },
        });
      }
    } else {
      this.updateTask();
    }
  }
  updateTask() {
    this.api.putTask(this.listForm.value, this.editTask.id).subscribe({
      next: (res) => {
        // alert('task updated successfully');
        this.listForm.reset();
        this.dialogRef.close('Update');
      },
      error: () => {
        alert('update unsuccessful!');
      },
    });
  }
}
