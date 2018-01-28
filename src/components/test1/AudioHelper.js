import plus from '../../mp3/+.mp3';
import minus from '../../mp3/-.mp3';
import audio1 from '../../mp3/1.mp3';
import audio2 from '../../mp3/2.mp3';
import audio3 from '../../mp3/3.mp3';
import audio4 from '../../mp3/4.mp3';
import audio5 from '../../mp3/5.mp3';
import audio6 from '../../mp3/6.mp3';
import audio7 from '../../mp3/7.mp3';
import audio8 from '../../mp3/8.mp3';
import audio9 from '../../mp3/9.mp3';

let instance = null;
class AudioHelper {
  constructor() {
        if(!instance){
              instance = this;
        }
        return instance;
      }
}

export default AudioHelper;
