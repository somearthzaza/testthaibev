import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { ModulesRoutingModule } from './modules-routing.module';
import { UserTableComponent } from './user-table/user-table.component';
import { DialogModule } from 'primeng/dialog';
import { EditUserModalComponent } from './user-table/edit-user-modal/edit-user-modal.component';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UserTableComponent,
    EditUserModalComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    DatePickerModule,
    FormsModule,
    ReactiveFormsModule
],
})
export class ModulesModule { }
