import uv from './uv.js';

class appsManager {
    constructor() {
    }

    loadApps = () => {
        uv.load();

        const searchInput = document.querySelector('.search input');

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const appElements = document.querySelectorAll('.apps .app');

            const apps = [];

            appElements.forEach((el) => {
                if (el.textContent.toLowerCase().includes(query)) {
                    apps.push(el.textContent.toLowerCase());
                    el.classList.remove('hidden');
                } else {
                    el.classList.add('hidden');
                }
            });

            if (apps.length == 0) {
                document.querySelector('.noresults').classList.remove('hidden');
            } else {
                document.querySelector('.noresults').classList.add('hidden');
            }
        });

        fetch('/assets/JSON/apps.json')
            .then(res => res.json())
            .then(apps => {
                apps.forEach(app => {
                    const el = document.createElement('div');
                    el.title = app.name;
                    el.classList = 'app';
                    el.innerHTML = `<img src="${app.thumb}"><span>${app.name}</span>`;
                    el.addEventListener('click', async (e) => {
                        if (app.proxied === 'true') {
                            document.querySelector('.frame').classList.remove('hidden');
                            document.querySelector('.apps').classList.add('hidden');
                            document.querySelector('#frame').src = Easyviolet.getProxiedUrl(new URL(app.url).toString());
                            document.body.classList.add('noscroll');
                        } else {
                            document.querySelector('.frame').classList.remove('hidden');
                            document.querySelector('.apps').classList.add('hidden');
                            document.querySelector('#frame').src = app.url;
                            document.body.classList.add('noscroll');
                        }

                        document.querySelector('#back').addEventListener('click', () => {
                            document.querySelector('.frame').classList.add('hidden');
                            document.querySelector('.apps').classList.remove('hidden');
                            document.querySelector('#frame').src = '';

                            document.body.classList.remove('noscroll');
                        });

                        document.querySelector('#fullscreen').addEventListener('click', () => {
                            const frame = document.querySelector('#frame');

                            if (frame.requestFullscreen) {
                                frame.requestFullscreen();
                            } else if (frame.mozRequestFullScreen) {
                                frame.mozRequestFullScreen();
                            } else if (frame.webkitRequestFullscreen) {
                                frame.webkitRequestFullscreen();
                            } else if (frame.msRequestFullscreen) {
                                frame.msRequestFullscreen();
                            }
                        });
                    });

                    el.querySelector('img').onerror = (e) => {
                        e.target.src = '/assets/img/Incor.png';
                    }

                    document.querySelector('.apps').appendChild(el);
                });
            })
    }
}

export default new appsManager();