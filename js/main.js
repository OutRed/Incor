import gameManager from './game.js';
import appManager from './apps.js';
import search from './search.js';
import settings from './settings.js';

if (location.pathname == '/games') {
    gameManager.loadGames();
} else if (location.pathname == '/apps') {
    appManager.loadApps();
} else if (location.pathname == '/search') {
    search.load();
}

window.onscroll = () => {
    if (window.scrollY !== 0) {
        document.querySelector('.navbar').classList.add('sticky');
    } else {
        document.querySelector('.navbar').classList.remove('sticky');
    }
}

if (window.scrollY !== 0) {
    document.querySelector('.navbar').classList.add('sticky');
}

const browserBlocker = document.createElement('script')
browserBlocker.src = '/assets/js/blockoldbrowser.js';
document.body.appendChild(browserBlocker);