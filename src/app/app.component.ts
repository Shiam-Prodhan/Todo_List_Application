import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Dialog2Component } from './dialog2/dialog2.component';
import { Dialog3Component } from './dialog3/dialog3.component';
import { ApiService } from './services/api.service';
import { Api2Service } from './services/api2.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Todo List';
  count !: number;
  displayedColumns: string[] = ['id', 'title', 'description', 'date', 'action'];
  displayedColumns1: string[] = [ 'id','title', 'description', 'date','action'];
  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) sort1!: MatSort;
  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private api2: Api2Service
  ) {}
  ngOnInit(): void {
    this.getAllTask();
    this.getAllTask2();
    
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {})
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Save') {
          this.getAllTask();
        }
      });
  }
  openDialog1() {
    this.dialog
      .open(Dialog3Component, {})
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Save') {
          this.getAllTask();
        }
      });
  }

  getAllTask() {
    this.api.getTask().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },

      error: () => {
        alert('error while fetching data');
      },
    });
  }
  getAllTask2() {
    this.api2.getTask().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource1 = new MatTableDataSource(res);
        this.dataSource1.sort = this.sort;
      },

      error: () => {
        alert('error while fetching data');
      },
    });
  }

  editTask(row: any) {
    this.count=1;
    this.dialog
      .open(DialogComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Update') {
          this.getAllTask();
        }
      });
      
      
  }

  doneTask(row: any) {
    this.dialog
      .open(Dialog2Component, {
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Done') {
          this.getAllTask2();
          this.deleteTask(row.id);
        }
      });
  }

  deleteTask(id: any) {
    this.api.deleteTask(id).subscribe({
      next: (res) => {
        // alert('task deleted successfully!');
        this.getAllTask();
      },
      error: () => {
        alert('error while deleting the product!');
      },
    });
  }
  deleteHistory(id: any) {
    this.api2.deleteTask(id).subscribe({
      next: (res) => {
        // alert('task deleted successfully!');
        this.getAllTask2();
      },
      error: () => {
        alert('error while deleting the product!');
      },
    });
  }

  clearAll()
  {
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
  }
}
