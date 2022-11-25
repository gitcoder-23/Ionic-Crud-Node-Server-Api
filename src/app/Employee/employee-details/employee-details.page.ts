import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeDataModel, EmployeeModel } from '../Employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.page.html',
  styleUrls: ['./employee-details.page.scss'],
})
export class EmployeeDetailsPage implements OnInit {
  empList: EmployeeModel = {};
  empAllList: EmployeeDataModel[] = [];
  empId: number | any;

  constructor(
    public empService: EmployeeService,
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  // load all employees
  async loadAllEmployees() {
    this.empService
      .getAllEmployee()
      .subscribe(async (empList: HttpResponse<EmployeeDataModel[] | any>) => {
        this.empList = empList.body;
        this.empAllList = empList.body.employees;
        console.log('this.empList->', this.empList);
        if (this.empList.success === true) {
          let toast = await this.toastController.create({
            message: 'Employee Details Loaded Successfully',
            duration: 3000,
          });
          return await toast.present();
        } else {
          let toast = await this.toastController.create({
            message: 'Employee Details Load failed',
            duration: 3000,
          });
          return await toast.present();
        }
      });
    // try {
    //   const res: any = await this.empService.getAllEmployee();
    //   this.empList = res;
    //   console.log('this.empList->', this.empList);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  // Load employee make refresh page
  async doRefresh(event: any) {
    console.log('Begin async refresh');
    this.loadAllEmployees();
    setTimeout(() => {
      console.log('Begin async refresh ended');
      event.target.complete();
    }, 2000);
  }

  // delete employee
  async deleteEmployee(empId: any) {
    console.log('Delete employee by id->', empId);
    const confirm = this.alertCtrl.create({
      message: 'Do you agree to delete?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Pressed Disagree');
          },
        },
        {
          text: 'Agree',
          handler: () => {
            this.empService.delEmployee(empId).subscribe(async () => {
              let toast = await this.toastController.create({
                message: 'Details deleted for' + empId,
                duration: 3000,
              });
              this.loadAllEmployees();
              toast.present();
              this.navCtrl.navigateRoot('/home');
            });
          },
        },
      ],
    });
    (await confirm).present();
  }
}
