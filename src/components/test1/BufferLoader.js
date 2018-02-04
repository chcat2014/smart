class BufferLoader {
      constructor(context, urlList, callback) {
        this.context = context;
        this.urlList = urlList;
        this.onload = callback;
        this.bufferList = [];
        this.loadCount = 0;

        this.loadBuffer = this.loadBuffer.bind(this);
        this.load = this.load.bind(this);
      }

       loadBuffer(url, index) {
        // Load buffer asynchronously
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        var loader = this;

        request.onload = () => {
          // Asynchronously decode the audio file data in request.response
          loader.context.decodeAudioData(
            request.response,
            (buffer) => {
              if (!buffer) {
                alert('error decoding file data: ' + url);
                return;
              }
              loader.bufferList[index] = buffer;
              //console.log(url, buffer.duration)
              if (++loader.loadCount === loader.urlList.length)
                loader.onload(loader.bufferList);
            },
            (error) => {
              console.error('decodeAudioData error', error);
            }
          );
        }

        request.onerror = () => {
          alert('BufferLoader: XHR error');
        }

        request.send();
      }

      load() {
        for (var i = 0; i < this.urlList.length; ++i) {
          this.loadBuffer(this.urlList[i], i);
        }
      }
}

export default BufferLoader;
