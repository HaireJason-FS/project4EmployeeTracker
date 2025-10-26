/*
We will be making an employee tracker. There will be a main menu to display options to the user such as:
1. Add employee
  This will prompt the user to enter the employees information such as: name, age, pay rate, hours worked. Once the user enters the information, it will be stored in an array of employee objects and displayed with the other hard coded employees.
2. Remove employee
  This will prompt the user to enter the ID OR NAME of the employee to be removed from the array of employee objects.
3. Edit Employee
  This will allow the user to edit the pay rate of an employee by entering the ID OR NAME of the employee and the new pay rate.
4. View Employees
  This will display a list of all employees with their information such as: name, age, pay rate, hours worked, and total pay (pay rate * hours worked).
5. Exit
  This will exit the program and stop ALL prompts. If the user selects this option, we need to modify the DOM to show a button that says "Restart Program" which when clicked will reload the page.

Classes: 
1. Employee:
  This is the super class (or base class) that will contain the necessary methods and properties that are intended to be inherited. THIS CLASS SHOULD NOT BE INSTANTIATED. NO METHODS ARE TO BE USED IN THIS CLASS.
2. Manager:
  This class will extend the Employee class and contain ONLY the properties needed for a full time employee(Manager). This class will have a calculatePay() method that will return the pay rate * hours worked. This class should only be used if the employee has 40 or more hours worked. This class should only have 2 properties: payRate and employeeType (set to "Manager").
3. PartTime:
  This class will extend the Employee class and contain ONLY the properties needed for a part time employee. This class will have a calculatePay() method that will return the pay rate * hours worked. This class should only be used if the employee has less than 40 hours worked. This class should only have 3 properties: payRate, hours, and employeeType (set to "PartTime").

Both Manager and PartTime classes will inherit the same name, age, and annualSalary properties from the Employee class.

the calculatePay() method in both the Manager and PartTime classes will be used to calculate the total pay for each employee based on their pay rate and hours worked. This should calculate the total annual salary based on 52 weeks and assign that value to the anual salary property. Managers will have 40+ hours worked and PartTime employees will have less than 40 hours worked. Managers will have an additional deduction of 1000 from their annual salary to account for benefits (both calculatePay() methods should be different in both classes).
*/
class Employee {
  constructor(name, age) {
    if (this.constructor === Employee) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.name = name;
    this.age = age;
    this.annualSalary = 0;
  }
  // No methods to be used in this class
}

class Manager extends Employee {
  constructor(name, age, payRate, hoursWorked) {
    super(name, age);
    this.payRate = payRate;
    this.hoursWorked = hoursWorked;
    this.employeeType = "Manager";
  }
  calculatePay() {
    this.annualSalary = (this.payRate * this.hoursWorked * 52) - 1000;
  }
}

class PartTime extends Employee {
  constructor(name, age, payRate, hoursWorked) {
    super(name, age);
    this.payRate = payRate;
    this.hoursWorked = hoursWorked;
    this.employeeType = "PartTime";
  }
  calculatePay() {
    this.annualSalary = this.payRate * this.hoursWorked * 52;
  }
}


//Now that we have our classes, we need to create the main menu function (using prompts) that will allow the user to select options to add, remove, edit, view employees or exit the program. When the program is started, we need to have 3 hard coded employees displayed inside the console. The display for the menu up top should be: Main Menu: 1. Add Employee 2. Remove Employee 3. Edit Employee 4. View Employees 5. Exit
//We will also need to have the hard coded employees created using the classes above.
class EmpTracker{
  constructor() {
    this.employees = [];
    this.initHardCodedEmployees();
    this.dispMainMenu();
  }

  initHardCodedEmployees() {
    this.employees.push(new Manager("Alice", 45, 50, 40));
    this.employees.push(new PartTime("Bob", 30, 20, 20));
    this.employees.push(new Manager("Charlie", 50, 60, 45));
  }

  dispMainMenu() {
    let choice;
    do {
      choice = prompt(
        "Main Menu:\n1. Add Employee\n2. Remove Employee\n3. Edit Employee\n4. View Employees\n5. Exit"
      );
      switch (choice) {
        case "1":
          this.addEmployee();
          break;
        case "2":
          this.removeEmployee();
          break;
        case "3":
          this.editEmployee();
          break;
        case "4":
          this.viewEmployees();
          break;
        case "5":
          this.exitProgram();
          break;
        default:
          alert("Invalid choice. Please select a valid option.");
      }
    } while (choice !== "5");
  }

  addEmployee() {
    // Implementation for adding an employee
    
  }

  removeEmployee() {
    // Implementation for removing an employee
  }

  editEmployee() {
    // Implementation for editing an employee
  }

  viewEmployees() {
    console.clear();
    console.log("Employee List:");
    this.employees.forEach((emp, index) => {
      console.log(
        `${index + 1}. ${emp.name}, Age: ${emp.age}, Type: ${emp.employeeType}, Annual Salary: $${emp.annualSalary}`
      );
    });
    this.initHardCodedEmployees();
    this.viewEmployees();
  }

  exitProgram() {
    alert("Exiting program...");
    // Modify DOM to show "Restart Program" button
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Program";
    restartButton.onclick = () => location.reload();
    document.body.innerHTML = "";
    document.body.appendChild(restartButton);
  }
}

//Arrow IIFE 
(() => {
  const empTracker = new EmpTracker();
  console.log("Employee Tracker Initialized");
})();