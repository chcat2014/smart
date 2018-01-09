import Random from 'random-js';

class Generator {
    constructor(_config) {
        this._getDigit = this._getDigit.bind(this);
        this._getPlusDigit = this._getPlusDigit.bind(this);
        this._getMinusDigit = this._getMinusDigit.bind(this);
        this._getBeginerDigit = this._getBeginerDigit.bind(this);
        /**
         complexity:
         0 - beginner (used till maxNumber)
         1 - easy (no over5, no over10)
         2 - allowed over5
         3 - allowed over10
         */

        this.config = {
            minNumber: _config.minDigits ? Math.pow(10, _config.minDigits - 1) : 0,
            maxNumber: _config.maxDigits ? Math.pow(10, _config.maxDigits) - 1 : 9,
            minDigits: _config.minDigits || 1,
            maxDigits: _config.maxDigits || 1,
            complexity: _config.complexity
        };
        if (!_config.complexity) {
            this.config.minNumber = 1;
            this.config.maxNumber = _config.maxNumber;
        }
        this.random = new Random();
        this.digits = [];
        this.sum = 0;
        // allowed numbers
        this.over5plus = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9], //0
            [1, 2, 3, 5, 7, 8], // 1
            [1, 2, 5, 6, 7], // 2
            [1, 5, 6], // 3
            [5], // 4
            [1, 2, 3, 4], // 5
            [1, 2, 3], // 6,
            [1, 2], // 7
            [1], // 8
            [0] // 9
        ];
        //allowed numbers
        this.over5minus = [
            [0], //0
            [1], // 1
            [1, 2], // 2
            [1, 2, 3], // 3
            [1, 2, 3, 4], // 4
            [5], // 5
            [1, 6], // 6,
            [1, 2, 7], // 7
            [1, 2, 3, 8], // 8
            [1, 2, 3, 4, 9] // 9
        ];
        // allowed numbers
        this.over10plus = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9], //X0
            [1, 2, 3, 4, 5, 7, 8], // X1
            [1, 2, 3, 4, 5, 6, 7], // X2
            [1, 2, 3, 4, 5, 6], // X3
            [1, 2, 3, 4, 5], // X4
            [1, 2, 3, 4], // X5
            [1, 2, 3, 5, 6, 7, 8], // X6,
            [1, 2, 5, 6, 7], // X7
            [1, 5, 6], // X8
            [5] // X9
        ];
        // allowed numbers
        this.over10minus = [
            [0], //X0
            [0, 1, 6], // X1
            [0, 1, 2, 6, 7], // X2
            [0, 1, 2, 3, 6, 7, 8], // X3
            [0, 1, 2, 3, 4, 6, 7, 8, 9], // X4
            [0, 1, 2, 3, 4, 5], // X5
            [0, 1, 2, 3, 4, 5, 6], // X6,
            [0, 1, 2, 3, 4, 5, 6, 7], // X7
            [0, 1, 2, 3, 4, 5, 6, 7, 8], // X8
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // X9
        ];
    }

    _getPlusDigit(limitingArray) {
        const s = this.sum.toString().split("");

        let digitsCount = this.config.minDigits;
        const res = [];
        if (this.config.minDigits !== this.config.maxDigits) {
            digitsCount = this.random.integer(this.config.minDigits, this.config.maxDigits);
        }

        const d = s.length - digitsCount;

        for (let i = 0; i < digitsCount; i++) {
            let indS = 0;
            if (s[i + d]) {
                indS = parseInt(s[i + d], 10);
            }

            if (limitingArray[indS].length === 1) {
                res.push(limitingArray[indS][0]);
            } else {
                const ind = this.random.integer(0, limitingArray[indS].length - 1);
                res.push(limitingArray[indS][ind]);
            }
        }
        console.log(this.sum, '+', res);
        return res;
    }

    _getMinusDigit(limitingArray) {
        const s = this.sum.toString().split("");

        let digitsCount = this.config.minDigits;
        let res = [];

        const max = Math.min(this.config.maxDigits, s.length);
        if (this.config.minDigits < max) {
            digitsCount = this.random.integer(this.config.minDigits, max);
        } else {
            digitsCount = max;
        }

        const d = s.length - digitsCount;

        for (let i = 0; i < digitsCount; i++) {
            let indS = 0;
            if (s[i + d]) {
                indS = parseInt(s[i + d], 10);
            }

            if (limitingArray[indS].length === 1) {
                res.push(limitingArray[indS][0]);
            } else {
                const ind = this.random.integer(0, limitingArray[indS].length - 1);
                res.push(limitingArray[indS][ind]);
            }
        }

        console.log(this.sum, '-', res);

        return res;
    }

    _getBeginerDigit() {
        if (this.sum === 4 || this.sum === this.config.maxNumber) {
            const max = this.config.maxNumber > 5 ? this.config.maxNumber - 5 : this.config.maxNumber;
            return -1 * this.random.integer(1, max);
        } else {
            if (4 - this.sum > 1) {
                return this.random.integer(1, 4 - this.sum);
            }
            if (this.config.maxNumber - this.sum > 1 && this.config.maxNumber - this.sum < 5) {
                return this.random.integer(1, this.config.maxNumber - this.sum);
            }
            return 1;
        }
    }

    _getDigit() {
        let sign = this.random.bool() ? 1 : -1;
        if ((this.config.complexity === 3) || !this.sum) {
            return sign * this.random.integer(this.config.minNumber, this.config.maxNumber);
        }
        if (this.config.complexity === 0) {
            return this._getBeginerDigit();
        }

        let res = [];
        if (this.config.complexity === 2) {
            if (sign === 1) {
                res = this._getPlusDigit(this.over10plus);
            } else {
                res = this._getMinusDigit(this.over10minus);
            }
        }
        if (this.config.complexity === 1) {
            if (sign === 1) {
                res = this._getPlusDigit(this.over5plus);
            } else {
                res = this._getMinusDigit(this.over5minus);
            }
        }
        let result = 0;
        res.forEach((r, ind) => {
            result = result + Math.pow(10, res.length - ind - 1) * r;
        });
        return sign * result;
    }

    next() {
        let digit = this._getDigit();
        while (digit + this.sum < 0 || digit === 0) {
            digit = this._getDigit();
        }
        this.digits.push(digit);
        this.sum += digit;
        return digit;
    }

    getSum() {
        return this.sum;
    }

    nextExercise() {
        this.digits.length = 0;
        this.sum = 0;
    }

    getExerciseString() {
        let res = '';
        this.digits.forEach((d, i) => {
            if (i === 0) {
                res = d.toString();
            } else {
                const str = d > 0 ? '+' + d : d.toString();
                res = res + str;
            }
        });
        return res;
    }

    destroy() {
        this.digits.length = 0;
        this.sum = 0;
    }
}

export default Generator;
