import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component'
import { User } from '../interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['username', 'name', 'email', 'status', 'role', 'action'];
  userlist!: User[];
  dataSource!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private builder: FormBuilder, private service: AuthService, private dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.LoadUser();
  }
  

  ngAfterViewInit(): void {

  }
  LoadUser() {
    this.service.getAll().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  

  updateuser(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: User) {
    this.service.deleteUser(id).subscribe({
      next: (res) => {
        this.LoadUser();
      },
      error: console.log,
    });
  }



}
