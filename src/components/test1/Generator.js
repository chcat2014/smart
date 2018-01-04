import Random from 'random-js';

class Generator {
    constructor(_config) {
      /**
      complexity:
        0 - beginner (used till maxNumber)
        1 - easy (no over5, no over10)
        2 - allowed over5
        3 - allowed all values
      */

        this.config = {
          complexity: _config.complexity || 1,
          minDigits: _config.minDigits ? Math.pow(10, _config.minDigits - 1) : 0,
          maxDigits: _config.maxDigits ? Math.pow(10, _config.maxDigits) - 1 : 9,
          maxNumber: _config.maxNumber || 0,
          over5: _config.complexity >= 2,
          over10: _config.complexity === 3
        };
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
        this.over10minus = [
          [], //0
          [10], // 1
          [10, 11], // 2
          [10, 11, 12], // 3
          [10, 11, 12, 13], // 4
          [10, 11, 12, 13, 14], // 5
          [10, 15], // 6,
          [10, 11, 15, 16], // 7
          [10, 11, 12, 15, 16, 17], // 8
          [10, 11, 12, 13, 15, 16, 17, 18] // 9
        ];
    }

    next() {
      const getDigit = () => {
        const sign = this.random.bool() ? 1 : -1;
        return sign * this.random.integer(this.config.minDigits, this.config.maxDigits);
      }
      let digit = getDigit();
      while (digit + this.sum < 0) {
        digit = getDigit();
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
