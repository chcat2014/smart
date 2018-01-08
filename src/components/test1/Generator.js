import Random from 'random-js';

class Generator {
    constructor(_config) {
      this._getDigit = this._getDigit.bind(this);
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
          over5: _config.complexity >= 2,
          over10: _config.complexity === 3
        };
        if (!_config.complexity) {
          this.config.minNumber = 1;
          this.config.minNumber = _config.maxNumber;
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
          [] // 9
        ];
        //forbidden numbers
        /*
        this.over5minus = [
          [], //0
          [5], // 1
          [5, 6], // 2
          [5, 6, 7], // 3
          [5, 6, 7, 8], // 4
          [], // 5
          [], // 6,
          [], // 7
          [], // 8
          [] // 9
        ];
        */
        //allowed numbers
        this.over5minus = [
          [1, 2, 3, 4, 5, 6, 7, 8, 9], //0
          [1, 2, 3, 4, 5, 6, 7, 8, 9], // 1
          [1, 2, 3, 4, 5, 6, 7, 8, 9], // 2
          [1, 2, 3, 4, 5, 6, 7, 8, 9], // 3
          [1, 2, 3, 4, 5, 6, 7, 8, 9], // 4
          [5, 6, 7, 8, 9], // 5
          [1, 5, 6, 7, 8, 9], // 6,
          [1, 2, 5, 6, 7, 8, 9], // 7
          [1, 2, 3, 5, 6, 7, 8, 9], // 8
          [1, 2, 3, 4, 5, 6, 7, 8, 9] // 9
        ];
        // allowed numbers
        this.over10plus = [
          [1, 2, 3, 4, 5, 6, 7, 8, 9], //0
          [1, 2, 3, 4, 5, 7, 8], // 1
          [1, 2, 3, 4, 5, 6, 7], // 2
          [1, 2, 3, 4, 5, 6], // 3
          [1, 2, 3, 4, 5], // 4
          [1, 2, 3, 4], // 5
          [1, 2, 3, 5, 6, 7, 8], // 6,
          [1, 2, 5, 6, 7], // 7
          [1, 5, 6], // 8
          [5] // 9
        ];
        //forbidden numbers
        // this.over10minus = [
        //   [], //0
        //   [10], // 1
        //   [10, 11], // 2
        //   [10, 11, 12], // 3
        //   [10, 11, 12, 13], // 4
        //   [10, 11, 12, 13, 14], // 5
        //   [10, 15], // 6,
        //   [10, 11, 15, 16], // 7
        //   [10, 11, 12, 15, 16, 17], // 8
        //   [10, 11, 12, 13, 15, 16, 17, 18] // 9
        // ];
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

    _getDigit() {
      const sign = this.random.bool() ? 1 : -1;
      if ((this.config.over5 && this.config.over10) || !this.sum) {
        return sign * this.random.integer(this.config.minNumber, this.config.maxNumber);
      }
      if (this.config.over5 && !this.config.over10) {
        const s = this.sum.toString().split("");
        console.log('sum',s);

        let digitsCount = this.config.minDigits;
        const res = [];
        if (sign === 1) {
            if (this.config.minDigits !== this.config.maxDigits) {
              digitsCount = this.random.integer(this.config.minDigits, this.config.maxDigits);
            }

            for(let i = 1; i <= digitsCount; i++) {
              let indS = 0;
              if (s.length - i > 0) {
                indS = parseInt(s[s.length - i], 10);
              }

              if (this.over10plus[indS].length === 1) {
                res.push(this.over10plus[indS][0]);
              } else {
                const ind = this.random.integer(0, this.over10plus[indS].length - 1);
                res.push(this.over10plus[indS][ind]);
              }
            }
        } else {
          const max = Math.min(this.config.maxDigits, s.length);
          if (this.config.minDigits < max) {
            digitsCount = this.random.integer(this.config.minDigits, max);
          } else {
            digitsCount = max;
          }

          for(let i = 1; i <= digitsCount; i++) {
            let indS = 0;
            if (s.length - i >= 0) {
              indS = parseInt(s[s.length - i], 10);
            }

            if (s.length - i === 0) {
              res.push(this.random.integer(0, indS));
            } else {
              if (this.over10minus[indS].length === 1) {
                res.push(this.over10minus[indS][0]);
              } else {
                const ind = this.random.integer(0, this.over10minus[indS].length - 1);
                res.push(this.over10minus[indS][ind]);
              }
            }
          }
        }
        console.log('res', res);
        let result = 0;
        res.forEach((r, ind)=>{
          result = result + Math.pow(10, res.length - ind - 1) * r;
        });
        console.log('result', sign * result);
        return sign * result;
      }
      if (!this.config.over5 && !this.config.over10) {
        const s = this.sum.toString().split("");
        console.log('sum',s);

        let digitsCount = this.config.minDigits;
        const res = [];
        if (sign === 1) {
            if (this.config.minDigits !== this.config.maxDigits) {
              digitsCount = this.random.integer(this.config.minDigits, this.config.maxDigits);
            }

            for(let i = 1; i <= digitsCount; i++) {
              let indS = 0;
              if (s.length - i > 0) {
                indS = parseInt(s[s.length - i], 10);
              }

              if (this.over5plus[indS].length === 1) {
                res.push(this.over5plus[indS][0]);
              } else {
                const ind = this.random.integer(0, this.over5plus[indS].length - 1);
                res.push(this.over5plus[indS][ind]);
              }
            }
        } else {
          const max = Math.min(this.config.maxDigits, s.length);
          if (this.config.minDigits < max) {
            digitsCount = this.random.integer(this.config.minDigits, max);
          } else {
            digitsCount = max;
          }

          for(let i = 1; i <= digitsCount; i++) {
            let indS = 0;
            if (s.length - i >= 0) {
              indS = parseInt(s[s.length - i], 10);
            }

            if (s.length - i === 0) {
              res.push(this.random.integer(0, indS));
            } else {
              if (this.over5minus[indS].length === 1) {
                res.push(this.over5minus[indS][0]);
              } else {
                const ind = this.random.integer(0, this.over5minus[indS].length - 1);
                res.push(this.over5minus[indS][ind]);
              }
            }
          }
        }
        console.log('res', res);
        let result = 0;
        res.forEach((r, ind)=>{
          result = result + Math.pow(10, res.length - ind - 1) * r;
        });
        console.log('result', sign * result);
        return sign * result;
      }
      return 0;
    }

    next() {
      let digit = this._getDigit();
      while (digit + this.sum < 0) {
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
    destroy() {
      this.digits.length = 0;
      this.sum = 0;
    }
}

export default Generator;
