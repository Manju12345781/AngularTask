import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {


   displayedColumns: string[] = ['name', 'email', 'phone', 'company'];
  dataSource = new MatTableDataSource<User>();
  isLoading = true;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch users';
        this.isLoading = false;
      }
    });
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  applyFilter(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value.trim().toLowerCase();
  this.dataSource.filter = value;
}


  // For case-insensitive filtering by name only
  ngAfterViewInit() {
    this.dataSource.filterPredicate = (data: User, filter: string) =>
      data.name.toLowerCase().includes(filter);
  }


}
