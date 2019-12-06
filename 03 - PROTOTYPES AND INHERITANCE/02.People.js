function solveClass() {
    class Employee {
        constructor(name, age) {
            if (new.target === Employee) {
                throw new Error("Canon instantiate directly.");
            }
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = []
        }

        work() {
            let currentTask = this.tasks.shift();
            console.log(this.name + currentTask);
            this.tasks.push(currentTask);
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }
        getSalary() {
            return this.salary;
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks.push(" is working on a simple task.");
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks.push(" is working on a complicated task.");
            this.tasks.push(" is taking time off work.");
            this.tasks.push(" is supervising junior workers.");
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.dividend = 0;
            this.tasks.push(" scheduled a meeting.");
            this.tasks.push(" is preparing a quarterly report.");
        }

        getSalary() {
            return this.salary + this.dividend;
        }
    }

    return {
        Employee,
        Junior,
        Senior,
        Manager
    }
}

function solveProto() {

    function Employee(name, age) {
        if (new.target === Employee) {
            throw new Error("Canon instantiate directly.");
        }
        this.name = name;
        this.dividend = 0;
        this.age = age;
        this.salary = 0;
        this.tasks = [];
    }

    Employee.prototype.work = function () {
        let currentTask = this.tasks.shift();
        console.log(this.name + currentTask);
        this.tasks.push(currentTask);
    };

    Employee.prototype.collectSalary = function () {
        console.log(`${this.name} received ${this.getSalary() + this.dividend} this month.`);
    };

    Employee.prototype.getSalary = function () {
        return this.salary;
    };

    function Junior(name, age) {
        Employee.call(this, name, age);
        this.tasks.push(" is working on a simple task.");
    }

    // Object.setPrototypeOf(Junior, Employee);
    // Junior.prototype.constructor = Junior;
    Junior.prototype = Object.create(Employee.prototype);

    function Senior(name, age) {
        Employee.call(this, name, age);
        this.tasks.push(" is working on a complicated task.");
        this.tasks.push(" is taking time off work.");
        this.tasks.push(" is supervising junior workers.");
    }

    // Object.setPrototypeOf(Senior, Employee);
    // Senior.prototype.constructor = Senior;
    Senior.prototype = Object.create(Employee.prototype);

    function Manager(name, age) {
        Employee.call(this, name, age);
        this.tasks.push(" scheduled a meeting.");
        this.tasks.push(" is preparing a quarterly report.");
    }

    // Object.setPrototypeOf(Manager, Employee);
    // Manager.prototype.constructor = Manager;
    Manager.prototype = Object.create(Employee.prototype);

    return {
        Employee,
        Junior,
        Senior,
        Manager
    }
}