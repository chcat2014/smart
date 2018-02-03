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
    this.ctx = null;
    this.buffer = null;
    this._init = this._init.bind(this);
    this._load = this._load.bind(this);
    this.play = this.play.bind(this);
      if(!instance){
            instance = this;

            this._init();
      }
      return instance;
    }

      _init() {
        try {
          window.AudioContext = window.AudioContext||window.webkitAudioContext;
          this.ctx = new AudioContext();

          this._load();
        } catch(e) { }
      }

      _load() {
        if (!this.ctx) {
          return;
        }
        this.ctx.decodeAudioData(plus,
          (decodedArrayBuffer) => {
            this.buffer = decodedArrayBuffer;
          });
      }

      play(num) {
        if (!this.ctx) {
          return;
        }
        var source = this.ctx.createBufferSource();
        // подключаем буфер к источнику
        source.buffer = this.buffer;
        // дефолтный получатель звука
        var destination = this.ctx.destination;
        // подключаем источник к получателю
        source.connect(destination);
        // воспроизводим
        source.start(0);
      }
}

export default AudioHelper;
