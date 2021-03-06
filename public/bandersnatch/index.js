const MANIFEST_URL = 'manifest.json';
const localhost = ['127.0.0.1','localhost'];

async function main() {
    const isLocal = !!~localhost.indexOf(window.location.hostname);
    console.log('isLocal', isLocal);
    const manifestJSON = await (await fetch(MANIFEST_URL)).json();
    const host = isLocal ? manifestJSON.localHost : manifestJSON.productionHost;
    const videoComponent = new VideoComponent();
    const network = new Network({host});
    const videoPlayer = new VideoMidiaPlayer({
        manifestJSON,
        network,
    });

    videoPlayer.initializeCodec();
    videoComponent.initializePlayer();
}

window.onload = main