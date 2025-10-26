/*
Classes

Besides the Main class, you will need to create the following classes:

Employee - This is the super class or base class for the employee. It will contain all the necessary methods and properties that are intended to be inherited. Hint: The class should NOT be instantiated. You do not need any methods in this class. 
PartTime - This class will extend Employee and contain only the properties needed for a part-time employee. It will also have a calculatePay() method. This class only has 3 properties, payRate, hours, and employee type.
Manager - This class will extend Employee and contain only the properties needed for a full-time manager employee. It will also have a calculatePay() method. A manager is an employee that works 40+hours. This class only has 2 properties, payRate, and employee Type

The PartTime and Manager class will inherit the name, age, and annualSalary properties from the Employee Class.

The calculatePay() method

This method is on both of the concrete classes (PartTime and Manager) and should calculate the annual pay based on 52 weeks and assign that value to the annual salary property. Manager employees have a 40+ hour work week and part-time employees have some other value <40 depending on user input. Also, there is a $1000 deduction in the annual pay for manager employees because of medical insurance costs. Hint: The formulas should be different on each class's calculatePay() method.

Ex 1: A Manager employee working 40 hours a week that earns a whopping $5 per hour should earn an annual salary of $9400

Ex 2: A Part-time employee working 12 hours a week that earns a whopping $8 per hour should earn an annual salary of $4992
*/
//Everything will be displayed in the console and prompted via prompt() function

  /*
  The Main Menu

The following menu options are required:

Add Employee - Adds an employee to the table. This option will prompt the user with the name, age, payrate and number of hours per week. Depending on the number of hours worked, a part time or manager employee is then instantiated and added to the employee's array. Once added, display the updated information in the console. Hint: Use the Array split() method to convert the string prompt to an array.
Remove Employee - Removes the desired employee from the employees array. This must be done by the employee number shown on the table in the console and also by typing the name of the employee. Once removed, display the updated employee information in the console. Hint: Use the filter() method to help you remove the employee by its name. Check out the isNan function. This may help you in figuring out if what you type is a number or a string.
Edit Employee - This option will allow to edit the payrate only for the chosen employee. For this option, you can just select the employee you want to edit by its employee number on the table shown in the console. Make sure the employee number starts at 1 in the console. Once edited, then display the updated employee information in the console.
Display Employees - Display the employee's information in the console. The Employee number(starting with 1), name, age, salary, hours, pay, and employee type is shown for each employee. Have a console.log() to show the column headers using tabs "\t"

3 employees are hard coded initially. Make sure the output is displayed showing those 3 employees when program starts along with the 4 menu options.

Each menu option functionality is coded in its own function in the Main Class.
An array is used to hold all employee instances.
Invoke a console.clear() to clear the console before information is displayed
Console.Log() is used to display the employees in the console.
A filter() method is used to delete an employee
Make sure all code is in a class as stated in the setup instructions.
Use the provided screen shot to get an idea of output expectations.

The Hard Coded Employees are as follows (displayed):
My Cool Employees
ID  Name	Age	Salary	Hours	 Pay Rate	 Manager/Part-Time
1	Scott	  25	19800 	  40	    10	        Manager
2	Dave	  30	9400	    40	    5	          Manager
3	Lisa	  22	4992	    12	    8	        Part-Time

We will be using the string split() method to quickly create an array based off the values in a single string.
*/

class Employee {
  constructor(n, a){
    this.name = n;
    this.age = a;
    this.annualSalary = 0;
    this.weeklyHours = 0;
    this.payRate = 0;
  }
}

class Manager extends Employee {
  constructor(p,n,a){
    super(n, a);
    this.weeklyHours = 40;
    this.payRate = p;
    this.type = "Manager";
    this.calculatePay();
  }
  calculatePay() {
    this.annualSalary = (this.weeklyHours * this.payRate * 52) - 1000;
  }
}

class PartTime extends Employee {
  constructor(p,h,n,a){
    super(n, a);
    this.weeklyHours = h;
    this.payRate = p;
    this.type = "Part-Time";
    this.calculatePay();
  }
  calculatePay() {
    this.annualSalary = this.weeklyHours * this.payRate * 52;
  }
}

//Main Class
class EmpTracker{
  constructor(){}

  displayMenu(){
    let choice = Number(prompt("Main Menu\n1. Add Employee\n2. Remove Employee\n3. Edit Employee\n4. Display Employees\n5. Exit\n\nEnter your choice (1-5):"));

    switch(choice){
      case 1:
        this.addEmployee();
        break;
      case 2:
        this.removeEmployee();
        break;
      case 3:
        this.editEmployee();
        break;
      case 4:
        this.displayEmployees();
        break;
      case 5:
        console.log("Exiting program.");
        break;
      default:
        alert("Invalid choice. Please enter a number between 1 and 5.");
    }
    this.displayMenu();
  }

  addEmployee(){
    let empString = prompt("Enter Employee Information (Name, Age, Pay Rate, Weekly Hours) separated by commas:");
    let empArray = empString.split(",").map(item => item.trim());
    let name = empArray[0];
    let age = Number(empArray[1]);
    let payRate = Number(empArray[2]);
    let weeklyHours = Number(empArray[3]);
    let newEmployee;

    if(weeklyHours >= 40){
      newEmployee = new Manager(payRate, name, age);
    } else {
      newEmployee = new PartTime(payRate, weeklyHours, name, age);
    }
    this.employees.push(newEmployee);
  }
  removeEmployee(){
    let empToRemove = prompt("Enter Employee Number or Name to Remove:");
    if(!isNaN(empToRemove)){
      let empIndex = Number(empToRemove) - 1;
      if(empIndex >= 0 && empIndex < this.employees.length){
        this.employees.splice(empIndex, 1);
      } else {
        alert("Employee number not found.");
      }
    } else {
      this.employees = this.employees.filter(emp => emp.name.toLowerCase() !== empToRemove.toLowerCase());
    }
  }
  editEmployee(){
    let empNumber = Number(prompt("Enter Employee Number to Edit Pay Rate:")) - 1;
    if(empNumber >= 0 && empNumber < this.employees.length){
      let newPayRate = Number(prompt("Enter New Pay Rate:"));
      this.employees[empNumber].payRate = newPayRate;
      this.employees[empNumber].calculatePay();
    } else {
      alert("Employee number not found.");
    }
  }

  displayEmployees(){
    if(this.employees.length === 0){
      console.log("No employees to display.");
      return;
    }
    console.log("ID\tName\tAge\tSalary\tHours\t Pay Rate\t Manager/Part-Time");
    this.employees.forEach((emp, index) => {
      console.log(`${index + 1}\t${emp.name}\t${emp.age}\t${emp.annualSalary}\t${emp.weeklyHours}\t${emp.payRate}\t${emp.type}`);
    });
  }
}
//Hard coded employees (need to be displayed in the console when program starts)
(e=>{
  e.employees = [
    new Manager(10, "Scott", 25),
    new Manager(5, "Dave", 30),
    new PartTime(8, 12, "Lisa", 22)
  ];
  console.clear();
  e.displayEmployees();
  e.displayMenu();
  const empTracker = new EmpTracker();
})(new EmpTracker());