import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  standalone: false,
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {
  userList: User[] = [];
  selectedUser: User | null = null;
  visible = false;
  constructor(private userService: UserService) {

  }
  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
  this.userService.GetUser().subscribe({
    next: (res: { data: User[], status: number }) => {
      if (res.status === 200) {
        this.userList = res.data;
        for (const user of this.userList) {
          if (user.birthdate) {
            user.birthdate = new Date(user.birthdate).toISOString().split('T')[0];
          }
        }
      } else {
        console.error('Failed to fetch users: Invalid response status', res.status);
      }
    },
    error: (err) => {
      console.error('Failed to fetch users:', err);
    }
  });
}

  onclickView(user: User) {
    this.selectedUser = user;
    this.visible = true;
  }

  onclickAdd() {
    this.selectedUser = null;
    this.visible = true;
  }

  onSaveModal() {
    this.getUserList();
    this.visible = false;
  }

  onCloseModal() {
    this.selectedUser = null;
    this.visible = false;
  }


}
