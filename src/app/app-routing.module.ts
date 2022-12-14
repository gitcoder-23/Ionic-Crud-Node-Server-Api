import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./Employee/employee-details/employee-details.module').then(
        (m) => m.EmployeeDetailsPageModule
      ),
  },
  {
    path: 'employee/list',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'addemployee',
    loadChildren: () =>
      import('./Employee/add-employee/add-employee.module').then(
        (m) => m.AddEmployeePageModule
      ),
  },
  {
    path: 'updateemployee/:empId',
    loadChildren: () =>
      import('./Employee/add-employee/add-employee.module').then(
        (m) => m.AddEmployeePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
