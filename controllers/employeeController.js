/* eslint-disable no-undef */
const EmployeeModel = require('../models/EmployeeModel');

// Add Employee => /api/v1/create
exports.addEmployee = async (req, res, next) => {
  // console.log('user', user);
  const user = req.body;
  // console.log('user', user);
  EmployeeModel.findOne({ email: user.email }, function (err, existingUser) {
    if (existingUser) {
      res.status(400).json({
        success: true,
        message: 'Email already exists',
      });
    } else if (existingUser == null) {
      const user = req.body;
      // user.roles = ["student"];
      EmployeeModel.create(user, function (err, employee) {
        res.status(201).json({
          success: true,
          message: 'Employee added successfully',
          employee,
        });
      });
    } else {
      res.json(null);
    }
  });
};

// get all Employees => /api/v1/employees
exports.getEmployees = async (req, res, next) => {
  const employees = await EmployeeModel.find();
  if (employees.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  } else {
    res.status(200).json({
      success: true,
      count: employees.length,
      message: 'All employees have been dislayed',
      employees,
    });
  }
};

// get single employee details => /api/v1/employee/:id
exports.getSingleEmployee = async (req, res, next) => {
  // "id" is same as route id
  const employee = await EmployeeModel.findById(req.params.id);
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  } else {
    res.status(200).json({
      success: true,
      message: 'Employee has been displayed',
      employee,
    });
  }
};

// Update employee => /api/v1/update/:id
exports.updateEmployee = async (req, res, next) => {
  // "id" is same as route id

  let employee = await EmployeeModel.findById(req.params.id);
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  }

  employee = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  try {
    console.log('employee', employee);
    // header problem solved
    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      employee,
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete employee => /api/v1/delemployee/:id
exports.deleteEmployee = async (req, res, next) => {
  // "id" is same as route id

  const employee = await EmployeeModel.findById(req.params.id);
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  }
  await employee.remove();
  try {
    console.log('employee', employee);
    res.status(200).json({
      success: true,
      message: 'Employee has been deleted',
      employee,
    });
  } catch (error) {
    console.log(error);
  }
};

// process 2 delete
exports.deleteEmp = async (req, res, next) => {
  // "id"
  await EmployeeModel.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
  // try {
  //   console.log('del', employee);
  //   res.status(200).json({
  //     success: true,
  //     message: 'Employee has been deleted',
  //     employee,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};
