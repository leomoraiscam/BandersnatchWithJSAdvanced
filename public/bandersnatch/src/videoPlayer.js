class videoMidiaPlayer {
  constructor({manifestJSON}) {
    this.manifestJSON = manifestJSON;
    this.network = network; 
    this.videoElement = null;
    this.sourceBufferr = null;
    this.selected = {};
  }

  initializeCodec(){
    this.videoElement = document.getElementById("vid");

    const mediaSourceSupported = !!window.MediaSource;
    
    if(!mediaSourceSupported){
      alert('Seu browser ou sistema não suporta o MSE');
    }
    
    const codecSupported = MediaSource.isTypeSupported(this.manifestJSON.codec);
    
    if(!codecSupported){
      alert(`Seu browser não suporta o codec ${this.manifestJSON.codec}`);
      return;
    }

    const mediaSource = new MediaSource();
    this.videoElement.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener("sourceopen", this.sourceOpenWrapper(mediaSource));
  }

  sourceOpenWrapper(mediaSource) {
    return async(_) => {
      this.sourceBufferr = mediaSource.addSourceBuffer(this.manifestJSON.codec);
      const selected = this.selected = this.manifestJSON.intro;
      mediaSource.duration = 0;
      await this.fileDownload(selected.url);
    }
  }

  async fileDownload(url){
    const prepareUrl = {
      url,
      fileResolution: 360,
      fileResolutionTag: this.manifestJSON.fileResolutionTag,
      hostTag: this.manifestJSON.hostTag,
    };
    const finalUrl = this.network.parseManifestURL(prepareUrl);
    console.log('url', finalUrl);
  }
}