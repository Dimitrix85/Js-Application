function solveClass() {
    class Balloon {
        constructor(color, gasWeight) {
            this.color = color;
            this.gasWeight = gasWeight;
        }
    }

    class PartyBalloon extends Balloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength) {
            super(color, gasWeight);
            this.ribbonColor = ribbonColor;
            this.ribbonLength = ribbonLength;
        }

        get ribbon() {
            return { color: this.ribbonColor, length: this.ribbonLength };
        }
    }

    class BirthdayBalloon extends PartyBalloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength, text) {
            super(color, gasWeight, ribbonColor, ribbonLength);
            this._text = text;
        }

        get text() {
            return this._text;
        }
    }

    return {
        Balloon,
        PartyBalloon,
        BirthdayBalloon
    }
}


function solveProto() {
    function Balloon(color, gasWeight) {
        this.color = color;
        this.gasWeight = gasWeight;
    };

    function PartyBalloon(color, gasWeight, ribbonColor, ribbonLength) {
        Balloon.call(this, color, gasWeight);
        this.ribbonColor = ribbonColor;
        this.ribbonLength = ribbonLength;

        Object.defineProperty(this, "ribbon", {
            get: function () {
                return { color: this.ribbonColor, length: this.ribbonLength };
            }
        });
    };

    Object.setPrototypeOf(PartyBalloon, Balloon);
    PartyBalloon.prototype.constructor = PartyBalloon;

    function BirthdayBalloon(color, gasWeight, ribbonColor, ribbonLength, text) {
        PartyBalloon.call(this, color, gasWeight, ribbonColor, ribbonLength);
        this._text = text;

        Object.defineProperty(this, "text", {
            get: function () {
                return this._text;
            }
        });
    };

    Object.setPrototypeOf(BirthdayBalloon, PartyBalloon);
    BirthdayBalloon.prototype.constructor = BirthdayBalloon;

    return {
        Balloon,
        PartyBalloon,
        BirthdayBalloon
    }
}


