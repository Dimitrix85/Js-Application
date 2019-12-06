class Hex {
    constructor(number) {
        this.value = number;
    }

    valueOf() {
        return this.value;
    }

    toString() {
        return "0x" + this.value.toString(16).toUpperCase();
    }

    plus(number) {

        number = this.checkNumberIsNumber(number);

        let sum = this.value + number;

        return new Hex(sum);
    }

    minus(number) {
        number = this.checkNumberIsNumber(number);

        let sum = this.value - number;

        return new Hex(sum);
    }

    parse(string){
        
        return parseInt(string,16);
    }


    checkNumberIsNumber(number) {
        if (!typeof number === "number") {
            number = parseInt(number, 16);
        }
        return number;
    }
}

let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString() === '0xF');

