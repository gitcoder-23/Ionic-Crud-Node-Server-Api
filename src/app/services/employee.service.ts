import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeDataModel, EmployeeModel } from '../Employee/Employee.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // getUrl = 'http://localhost:3007/api/v1/employees';
  getUrl = `${environment.BASEURL}/employees`;
  addUrl = `${environment.BASEURL}/create`;
  getIdUrl = `${environment.BASEURL}/employee`;
  updateUrl = `${environment.BASEURL}/update`;
  deleteUrl = `${environment.BASEURL}/delemployee`;
  constructor(private http: HttpClient) {}

  // Get Employees
  getAllEmployee(): Observable<HttpResponse<EmployeeDataModel[]>> {
    return this.http.get<EmployeeDataModel[]>(this.getUrl, {
      observe: 'response',
    });
  }

  // Add Employee
  addEmployee(
    emp: EmployeeDataModel
  ): Observable<HttpResponse<EmployeeDataModel>> {
    return this.http.post<EmployeeDataModel>(this.addUrl, emp, {
      observe: 'response',
    });
  }

  // Get Employee By Id
  getEmployeeById(
    empId: string | any
  ): Observable<HttpResponse<EmployeeDataModel>> {
    console.log('getEmployeeById->', empId);

    return this.http.get<EmployeeDataModel>(this.getIdUrl + '/' + empId, {
      observe: 'response',
    });
  }

  // Update Employee By Id
  updateEmployee(
    emp: EmployeeDataModel
  ): Observable<HttpResponse<EmployeeDataModel>> {
    console.log('emp-update->', emp);
    return this.http.put<EmployeeDataModel>(
      this.updateUrl + '/' + emp._id,
      emp,
      { observe: 'response' }
    );
  }

  // Delete Employee By Id
  delEmployee(empId: string): Observable<HttpResponse<void>> {
    console.log('emp-delete->', empId);
    return this.http.delete<void>(this.deleteUrl + '/' + empId, {
      observe: 'response',
    });
  }
}
