import { FUGLE_PICTURE_API_URL } from './config';
import processImageListener from './processImage';

export default class FuglePicture {
    init(apiToken) {
        if (!apiToken) {
            console.warn('[Fugle Picture] Must Provide ApiToken');
            return;
        }
        // Should check apiToken here ?
        this.apiToken = apiToken;
        processImageListener(apiToken);
    }

    checkToken() {
        if (!this.apiToken) {
            console.warn('[Fugle Picture] Must Provide ApiToken');
            throw new Error();
        }
    }

    async getUrl(symbolId, cardSpecId) {
        try {
            this.checkToken();
            const apiUrl = `${FUGLE_PICTURE_API_URL}?symbolId=${symbolId}&cardSpecId=${cardSpecId}`;
            const options = {
                method: 'GET',
                headers: new Headers({ Authorization: `Bearer ${this.apiToken}` }),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(apiUrl, options);
            const result = await response.json();
            const { url } = result.data;
            return url;
        } catch (error) {
            return null;
        }
    }
}
