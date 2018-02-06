import BufferLoader from './BufferLoader'

const urls = [
  '/mp3/+.aac',
  '/mp3/-.aac',
  '/mp3/1.aac',
  '/mp3/2.aac',
  '/mp3/3.aac',
  '/mp3/4.aac',
  '/mp3/5.aac',
  '/mp3/6.aac',
  '/mp3/7.aac',
  '/mp3/8.aac',
  '/mp3/9.aac'
];

let instance = null;
class AudioHelper {
  constructor() {
    this.ctx = null;
    this.bufferSources = [];
    this._init = this._init.bind(this);
    this.load = this.load.bind(this);
    this.play = this.play.bind(this);
    this._onLoad = this._onLoad.bind(this);
    this.isBuffering = false;
    this.isBuffered = false;
    this.onBuffered = null;
      if(!instance){
            instance = this;

            this._init();
      }
      return instance;
    }

      _init() {
        try {
          this.ctx = new (window.AudioContext || window.webkitAudioContext)()
        } catch(e) {
            console.error(e);
        }
      }

      load() {
        if (!this.ctx || this.isBuffered) {
          return;
        }
        this.isBuffering = true;
        var bufferLoader = new BufferLoader(this.ctx, urls, this._onLoad);

        bufferLoader.load();

      }
      _onLoad(bufferList) {
        this.bufferSources = bufferList;
        this.isBuffering = false;
        this.isBuffered = true;

        if (this.onBuffered) {
          this.onBuffered();
        }
      }

      play(num) {
        if (!this.ctx) {
          return;
        }
        var source = this.ctx.createBufferSource();
        source.buffer = num > 0 ? this.bufferSources[0] : this.bufferSources[1];
        source.connect(this.ctx.destination);
        source.start(0);
        source.onended = () => {
          source.disconnect(this.ctx.destination);

          var source2 = this.ctx.createBufferSource();
          source2.buffer = this.bufferSources[Math.abs(num) + 1];
          source2.connect(this.ctx.destination);
          source2.start(0);
          source2.onended = () => {
            source2.disconnect(this.ctx.destination);
          }
        }
      }
}

export default AudioHelper;
