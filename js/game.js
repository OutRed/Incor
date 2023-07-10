import uv from './uv.js';

class GameManager {
    constructor() {
    }

    loadGames = () => {
        uv.load();

        const searchInput = document.querySelector('.search input');

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const gameElements = document.querySelectorAll('.games .game');

            const games = [];

            gameElements.forEach((el) => {
                if (el.textContent.toLowerCase().includes(query)) {
                    games.push(el.textContent.toLowerCase());
                    el.classList.remove('hidden');
                } else {
                    el.classList.add('hidden');
                }
            });

            if (games.length == 0) {
                document.querySelector('.noresults').classList.remove('hidden');
            } else {
                document.querySelector('.noresults').classList.add('hidden');
            }
        });

        fetch('/assets/JSON/games.json')
            .then(res => res.json())
            .then(games => {
                games.forEach(game => {
                    const el = document.createElement('div');
                    el.title = game.name;
                    el.classList = 'game';
                    el.innerHTML = `<img src="${game.thumb}"><span>${game.name}</span>`;
                    el.addEventListener('click', (e) => {
                        if (game.proxied === 'true') {
                            document.querySelector('.frame').classList.remove('hidden');
                            document.querySelector('.games').classList.add('hidden');
                            document.querySelector('#frame').src = Easyviolet.getProxiedUrl(game.url);
                            document.body.classList.add('noscroll');
                        } else {
                            document.querySelector('.frame').classList.remove('hidden');
                            document.querySelector('.games').classList.add('hidden');
                            document.querySelector('#frame').src = game.url;
                            document.body.classList.add('noscroll');
                        }

                        document.querySelector('#back').addEventListener('click', () => {
                            document.querySelector('.frame').classList.add('hidden');
                            document.querySelector('.games').classList.remove('hidden');
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
                        e.target.src = '/assets/img/incor.png';
                    }

                    document.querySelector('.games').appendChild(el);
                });
            })
    }
}

export default new GameManager();
