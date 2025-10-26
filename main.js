/*
Jason Haire
Employee Tracker Program
*/
class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.annualSalary = 0;
    this.hours = 0;
    this.payRate = 0;
    this.type = "";
  }
}

class Manager extends Employee {
  constructor(name, age, payRate,) {
    super(name, age);
    this.hours = 40;
    this.payRate = payRate;
    this.type = "Manager";
  }
  calculatePay() {
    this.annualSalary = ((this.payRate * 40) * 52) - 1000;
  }
}

class PartTime extends Employee {
  constructor(name, age, payRate, hoursWorked) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hoursWorked;
    this.type = "Part Time";
  }
  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52;
  }
}


class EmpTracker {
  constructor() {
    this.employees = [];
    this.viewEmployees();
  }

  dispMainMenu() {
    let choice;
    choice = prompt("Main Menu:\n1. Add Employee\n2. Remove Employee\n3. Edit Employee\n4. View Employees\n5. Exit\nEnter your choice (1-5):");
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
        this.dispMainMenu();
        break;
    }
  }


  addEmployee() {
    let empString = prompt("Enter Employee Info (Name, Age, Pay Rate, Hours per week(up to 40))");
    let [name, age, payRate, hoursWorked] = empString.split(",");
    age = Number(age);
    payRate = Number(payRate);
    hoursWorked = Number(hoursWorked);
    let newEmp;
    if (hoursWorked > 40) {
      newEmp = new Manager(name, age, payRate);
    }else{
      newEmp = new PartTime(name, age, payRate, hoursWorked);
    }
    newEmp.calculatePay();
    this.employees.push(newEmp);
    this.dispMainMenu();
  }

  removeEmployee() {
    let empToRemove = prompt("Enter Employee ID or Name to remove:");
    let empID = Number(empToRemove);
    if (!isNaN(empID)) {
      this.employees.splice(empID - 1, 1);
    } else {
      this.employees = this.employees.filter(emp => emp.name.toLowerCase() !== empToRemove.toLowerCase());
    }
    this.viewEmployees();
  }
  
  editEmployee() {
    let empID = Number(prompt("Enter Employee ID to edit:"));
    let newPayRate = Number(prompt("Enter new Pay Rate:"));
    let emp = this.employees[empID - 1];
    emp.payRate = newPayRate;
    emp.calculatePay();
    this.viewEmployees();
  }

  viewEmployees() {
    //Display hard coded employees here
    if (this.employees.length === 0) {
      this.employees.push(
        new Manager("Scott", 25, 10),
        new Manager("Dave", 30, 5),
        new PartTime("Lisa", 22, 8, 12)
      );
      this.employees.forEach(emp => emp.calculatePay());
    }
    console.clear();
    console.log("My Cool Employees");
    console.log("ID\tName\tAge\tSalary\tHours\tPay Rate\tManager/Part-Time");
    this.employees.forEach((emp, index) => {
      console.log(
        `${index + 1}\t${emp.name}\t${emp.age}\t${emp.annualSalary}\t${emp.hours}\t${emp.payRate}\t\t${emp.type}`);
    });
    this.dispMainMenu();
  }

  //Exit program function to stop all prompts and display a button to restart the program
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

(() => {
  const empTracker = new EmpTracker();
})();