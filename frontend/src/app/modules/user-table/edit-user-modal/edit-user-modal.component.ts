import { Component, effect, input, output } from '@angular/core';
import { User } from '../../../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-user-modal',
  standalone: false,
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css'
})
export class EditUserModalComponent {
  user = input<User | null>(null);
  visible = input<boolean>(false);
  isViewMode : boolean = false;
  visibleChange = output<boolean>();
  maxDate = new Date();
  onSave = output<User >();
  formdata = new FormGroup({
    birthdate : new FormControl<Date | null>(null, Validators.required),
    name : new FormControl('', Validators.required),
    lastName : new FormControl('', Validators.required),
    address : new FormControl('', Validators.required),
    age : new FormControl(0)
  })
  constructor(private userService: UserService) {
    effect(() => {
    const user = this.user();
    if (user) {
       this.isViewMode = true;
      this.formdata.patchValue({
        name: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ')[1] || '',
        address: user.address || '',
        age: user.age || 0,
        birthdate: user.birthdate ? new Date(user.birthdate) : null
      });
      this.formdata.disable();
    } else {
      this.formdata.reset();
      this.formdata.enable();
    }
  });

  }
  onbrithdateChange(event: Date) {
    this.formdata.patchValue({
      birthdate: event,
      age: this.calculateAge(event)
    });
  }

  calculateAge(brithdate: Date): number {
    const today = new Date();
    const brithDate = new Date(brithdate);
    let age = today.getFullYear() - brithDate.getFullYear();
  const monthDiff = today.getMonth() - brithDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < brithDate.getDate())) {
    age--;
  }
  console.log('Calculated age:', age);
  return age;
  }

  onClose() {
    this.visibleChange.emit(false);
    this.isViewMode = false;
    this.formdata.reset();
  }


  onSubmit() {

   if (!this.validateForm()) {
    return;
  }

    const formValue = this.formdata.value;
      const user: User = {
        id: 0,
        name: `${formValue.name} ${formValue.lastName}`,
        address: formValue.address || '',
        age: formValue.age || 0,
        birthdate: formValue.birthdate ? this.formatDate(formValue.birthdate ) : null
      };
      this.userService.CreateUser(user).subscribe({
        next: (res) => {
          console.log('User created successfully:', res);
          this.onSave.emit(res);
          this.onClose();
        },
        error: (err) => {
          console.error('Failed to create user:', err);
          this.onClose();
        }
      });
      this.onSave.emit(user);
      this.visibleChange.emit(false);
    }

  validateForm(): boolean {
    return this.formdata.valid;
  }

  formatDate(date: Date): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
}
