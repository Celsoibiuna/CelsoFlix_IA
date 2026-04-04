import { getCategoriesForProfile } from './data.js';
import { createCarousel } from './components/Carousel.js';

function getQueryParam(name) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(name);
}

function getProfileName() {
    const queryProfile = getQueryParam('profile');
    return queryProfile || localStorage.getItem('perfilAtivoNome') || 'Visitante';
}

document.addEventListener('DOMContentLoaded', () => {
    const profileName = getProfileName();
    const nomePerfil = localStorage.getItem('perfilAtivoNome') || profileName;
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    if (profileName && !localStorage.getItem('perfilAtivoNome')) {
        localStorage.setItem('perfilAtivoNome', profileName);
    }

    let resolvedImagemPerfil = imagemPerfil;
    if (resolvedImagemPerfil && !resolvedImagemPerfil.startsWith('http') && !resolvedImagemPerfil.startsWith('/') && !resolvedImagemPerfil.startsWith('.')) {
        resolvedImagemPerfil = `../imagens/${resolvedImagemPerfil}`;
    } else if (resolvedImagemPerfil && resolvedImagemPerfil.startsWith('imagens/')) {
        resolvedImagemPerfil = `../${resolvedImagemPerfil}`;
    }

    if (nomePerfil && resolvedImagemPerfil) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');
        
        if (kidsLink) kidsLink.textContent = nomePerfil;
        if (profileIcon) profileIcon.src = resolvedImagemPerfil;
    }

    const bannerConfig = {
        Celso: {
            src: 'img/cobrakaivideo.mp4',
            title: 'Cobra Kai',
            subtitle: 'O dojo nunca morre. Assista agora!'
        },
        Tiago: {
            src: 'img/harrypoter.mp4',
            title: 'Harry Potter',
            subtitle: 'Assistir agora!'
        },
        Arielly: {
            src: 'img/bolofofos.mp4',
            title: 'Bolofofos',
            subtitle: 'Desenho infantil bolofofos, assista agora!'
        }
    };

    const bannerSource = document.getElementById('banner-video-source');
    const bannerTitle = document.getElementById('banner-title');
    const bannerSubtitle = document.getElementById('banner-subtitle');
    const banner = document.getElementById('banner-video');
    const currentBanner = bannerConfig[profileName] || bannerConfig.Celso;

    if (bannerSource && banner && bannerTitle && bannerSubtitle) {
        bannerSource.src = currentBanner.src;
        banner.load();
        bannerTitle.textContent = currentBanner.title;
        bannerSubtitle.textContent = currentBanner.subtitle;
    }

    const container = document.getElementById('main-content');
    const categories = getCategoriesForProfile(profileName);

    if (container) {
        const title = document.createElement('h1');
        title.className = 'profile-list-title';
        title.textContent = `Lista de filmes de ${profileName}`;
        container.parentElement.insertBefore(title, container);

        categories.forEach(category => {
            const carousel = createCarousel(category, profileName);
            container.appendChild(carousel);
        });
    }
});
