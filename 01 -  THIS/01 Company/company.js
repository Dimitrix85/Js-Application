class Company {
    constructor(){
        this.departments = []; 
    }

    addEmployee(username, salary, position, department){
        
        if (!username || !position || !department || salary < 0 || !salary) {
            throw new Error("Invalid input!");
        }

        let currentDepartment = this.departments.find(x=>x.name === department);

        if (!currentDepartment) {

            currentDepartment = {
                name: department,
                employees: [],
                averageSalary: function(){
                     return this.employees.reduce((a,b) => { 
                        return a + b.salary
                        },0) / this.employees.length
                }};
            this.departments.push(currentDepartment);
        }

        currentDepartment.employees.push({
            username,
            position,
            salary
        });

        return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    bestDepartment(){
        let [ best ] = [...this.departments].sort((a,b) => b.averageSalary() - a.averageSalary());
        let output = `Best Department is: ${best.name}\nAverage salary: ${best.averageSalary().toFixed(2)}\n`;
        
        output += best.employees.sort((a,b) => b.salary - a.salary || a.username.localeCompare(b.username)).map(y=>{
            return `${y.username} ${y.salary} ${y.position}`
        }).join("\n");

        return output;
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Human resources");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
