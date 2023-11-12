import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'action'];
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  // @ViewChild(MatSort) sort !: MatSort;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.authService.getAll().subscribe(
      res => {
        this.userList = res;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator
        // this.dataSource.sort = this.sort;
      }
    )
  }

  updateUser(id: any) {
    this.dialog.open(UserUpdateComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data:{
        userId: id
      }
    })
  }

  openDialog() {

  }
}
