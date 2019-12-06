(function(){
String.prototype.ensureStart = function (str) {
    return this.startsWith(str) ? this.toString() : `${str}${this}`;
}

String.prototype.ensureEnd = function (str) {
    return this.endsWith(str) ? this.toString() : `${this}${str}`;
}

String.prototype.isEmpty = function () {
    return this.length === 0 ? true : false
}

String.prototype.truncate = function(n){
    
    if (this.length < n) {
        return this.toString();
    }
    else if (n < 4){
        return new Array(n).fill(".").join("");
    }
    else{
        let str = this.slice(0,n-2);
        let indexOfBlank = str.lastIndexOf(" ");
        if (indexOfBlank !== -1) {
            return str.slice(0,indexOfBlank)+"...";
        }
        else{
            return this.slice(0,n-3)+"...";
        }
    }
}

String.format = function(str, ...params){
     params.forEach((element,index) => {
        str = str.replace(`{${index}}`,element);
    });

    return str;
}
}())

var testString = 'the quick brown fox jumps over the lazy dog';
console.log(testString.isEmpty());

let str = 'my string';
console.log(str.isEmpty());
str = str.ensureStart('my');
console.log(str);
str = str.ensureStart('hello ');
console.log(str);
str = str.truncate(16);
console.log(str);
str = str.truncate(14);
console.log(str);
str = str.truncate(8);
console.log(str);
str = str.truncate(4);
console.log(str);
str = str.truncate(2);
console.log(str);
str = String.format('The {0} {1} fox',
'quick', 'brown');
console.log(str);

str = String.format('jumps {0} {1}',
'dog');
console.log(str);
