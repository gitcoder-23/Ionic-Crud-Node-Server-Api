import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@capacitor/core';
import { NavController, ToastController } from '@ionic/angular';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeDataModel } from '../Employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {
  emp: EmployeeDataModel = {};

  constructor(
    private empService: EmployeeService,
    private toastController: ToastController,
    private activateRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.emp = new EmployeeDataModel();

    this.getEmployeeById();
  }

  async employeeSubmit() {
    console.log('Inside Save Method when edit---', this.emp._id);
    if (!this.emp._id || this.emp._id === undefined) {
      this.empService
        .addEmployee(this.emp)
        .subscribe(async (emp: EmployeeDataModel | any) => {
          console.log('emp-create->', emp);
          if (emp?.status === 201 && emp?.statusText === 'Created') {
            let createdName = emp?.body?.employee?.name;

            let toast = await this.toastController.create({
              message: 'Details Added for-' + createdName,
              duration: 3000,
            });
            return await toast.present().then(() => {
              this.navCtrl.navigateRoot('home');
            });
          } else {
            let toast = await this.toastController.create({
              message: 'Details Added for failed',
              duration: 3000,
            });
            return await toast.present().then(() => {
              this.navCtrl.navigateRoot('addemployee');
            });
          }
        });
    } else {
      // edit
      this.empService
        .updateEmployee(this.emp)
        .subscribe(async (emp: EmployeeDataModel | any) => {
          console.log('emp-edit->', emp);
          if (emp?.status === 200 && emp?.statusText === 'OK') {
            let editedName = emp?.body?.employee?.name;

            let toast = await this.toastController.create({
              message: 'Details Edited for-' + editedName,
              duration: 3000,
            });
            return await toast.present().then(() => {
              this.navCtrl.navigateRoot('home');
            });
          } else {
            let toast = await this.toastController.create({
              message: 'Details Added for failed',
              duration: 3000,
            });
            return await toast.present().then(() => {
              this.navCtrl.navigateRoot(
                `updateemployee/${emp?.body?.employee?._id}`
              );
            });
          }
        });
    }
  }

  async getEmployeeById() {
    // "empId"=> has been added to the route
    const id = this.activateRoute.snapshot.paramMap.get('empId');
    console.log('Employee Id->', id);
    if (id !== null) {
      console.log('Id is not null seetting detail for employee!');
      this.empService.getEmployeeById(id).subscribe((emp: any) => {
        console.log('this-id-emp->', emp);
        if (emp?.status === 200) {
          const { employee, message, success } = emp.body;
          this.emp = employee;
        } else {
          console.log('Something went wrong');
        }
      });
    }
  }

  //
}
