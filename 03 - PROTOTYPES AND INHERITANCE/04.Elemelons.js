function solveClass() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new Error("Canon instantiate directly.");
            }
            this.weight = weight;
            this.melonSort = melonSort;
            this.element = "";
            this._elementIndex = this.weight * this.melonSort.length;
        }

        get elementIndex() {
            return this._elementIndex;
        }
        toString() {
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort)
            this.element = "Water";
        }

    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort)
            this.element = "Fire";
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort)
            this.element = "Earth";
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort)
            this.element = "Air";
        }
    }

    class Melolemonmelon extends Airmelon {
        constructor(weight, melonSort) {
            super(weight, melonSort)
            this.element = 'Water';
            this.elements = ['Fire', 'Earth', 'Air', 'Water'];
            this.elInd = 0;

        }
        morph() {
            this.element = this.elements[this.elInd++ % 4];
        }
    }

    return {
        Melon,
        Earthmelon,
        Watermelon,
        Firemelon,
        Airmelon,
        Melolemonmelon
    }
}


function solveProto() {
    function Melon(weight, melonSort) {
        if (new.target === Melon) {
            throw new Error("Abstract class cannot be instantiated directly");
        }
        this.weight = weight;
        this.melonSort = melonSort;
        this.element = "";
        this._elementIndex = this.weight * this.melonSort.length;

        Object.defineProperty(this, "elementIndex", {
            get: function () { return this._elementIndex }
        });
    }


    function Watermelon(weight, melonSort) {
        Melon.call(this,weight, melonSort);
        this.element = "Water";
    }

    Watermelon.prototype.toString = function() {
        return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
    };

    // Watermelon.prototype = Object.create(Melon.prototype);
    Object.setPrototypeOf(Watermelon,Melon);
    Watermelon.prototype.constructor = Watermelon;
    
    function Firemelon(weight, melonSort) {
        Melon.call(this,weight, melonSort);
        this.element = "Fire";
    }

    Firemelon.prototype.toString = function() {
        return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
    };

    // Firemelon.prototype = Object.create(Melon.prototype);
    Object.setPrototypeOf(Firemelon,Melon);
    Firemelon.prototype.constructor = Firemelon;

    function Earthmelon(weight, melonSort) {
        Melon.call(this,weight, melonSort);
        this.element = "Earth";
    }

    Earthmelon.prototype.toString = function() {
        return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
    };

    // Earthmelon.prototype = Object.create(Melon.prototype);
    Object.setPrototypeOf(Earthmelon,Melon);
    Earthmelon.prototype.constructor = Earthmelon;

    function Airmelon(weight, melonSort) {
        Melon.call(this,weight, melonSort);
        this.element = "Air";
    }

    Airmelon.prototype.toString = function() {
        return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
    };

    //Airmelon.prototype = Object.create(Melon.prototype);
    Object.setPrototypeOf(Airmelon,Melon);
    Airmelon.prototype.constructor = Airmelon;

    function Melolemonmelon(weight, melonSort) {
        Airmelon.call(this,weight, melonSort);
        this.element = 'Water';
        this.elements = ['Fire', 'Earth', 'Air', 'Water'];
        this.elInd = 0;

    }

    Melolemonmelon.prototype.morph = function () {
        this.element = this.elements[this.elInd++ % 4];
    }

    Melolemonmelon.prototype.toString = function() {
        return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
    };

    //Melolemonmelon.prototype = Object.create(Melon.prototype);
    Object.setPrototypeOf(Melolemonmelon,Airmelon);
    Melolemonmelon.prototype.constructor = Melolemonmelon;

    return {
        Melon,
        Earthmelon,
        Watermelon,
        Firemelon,
        Airmelon,
        Melolemonmelon
    }
}