import uv from './uv.js';

const load = () => {
    uv.load();

    document.querySelector('#search').addEventListener('submit', (e) => {
        e.preventDefault();

        const query = e.target.querySelector('#query').value;

        try {
            location.href = Easyviolet.getProxiedUrl((new URL(query).toString()));
        } catch (e) {
            try {
                const url = new URL(`http://${query}`);
                if (url.hostname.includes('.')) location.href = Easyviolet.getProxiedUrl((url.toString()));
                else throw '';
            } catch (e) {
                location.href = Easyviolet.getProxiedUrl(('https://www.google.com/search?q=%s'.replace('%s', encodeURIComponent(query))));
            }
        }
    });
}

export default { load };