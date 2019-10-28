import window from 'window';
import document from 'document';

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}

const getImageByApiToken = (image, src, token) => {
    image.setAttribute('src', `${src}&apiToken=${token}`);
};

const getImageByJwtToken = async (image, src, token) => {
    const options = {
        method: 'GET',
        headers: new Headers({ Authorization: `Bearer ${token}` }),
        mode: 'cors',
        cache: 'default'
    };
    // src = src.replace('http', 'https');
    const response = await fetch(src, options);
    const buffer = await response.arrayBuffer();
    const base64Flag = 'data:image/jpeg;base64,';
    const imageStr = arrayBufferToBase64(buffer);
    image.setAttribute('src', base64Flag + imageStr);
};

export default function processImageListener(apiToken) {
    document.addEventListener('DOMNodeInserted', (e) => {
        if (e.target.tagName && e.target.tagName.toLowerCase() === 'img') {
            // e.target is img
            const image = e.target;
            if (image.getAttribute('type') === 'fugle' && !image.src) {
                getImageByJwtToken(image, image.getAttribute('fugle-src'), apiToken);
            }
        }

        if (e.target.hasChildNodes()) {
            const images = e.target.querySelectorAll('img[type="fugle"]');
            images.forEach((image) => {
                if (!image.src) {
                    getImageByJwtToken(image, image.getAttribute('fugle-src'), apiToken);
                }
            });
        }
    });
}