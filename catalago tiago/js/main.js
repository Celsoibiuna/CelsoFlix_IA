import { categories } from '../data.js';
import { createCarousel } from './Carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    let imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    if (imagemPerfil && !imagemPerfil.startsWith('http') && !imagemPerfil.startsWith('/') && !imagemPerfil.startsWith('.')) {
        imagemPerfil = `../imagens/${imagemPerfil}`;
    } else if (imagemPerfil && imagemPerfil.startsWith('imagens/')) {
        imagemPerfil = `../${imagemPerfil}`;
    }

    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');
        
        if (kidsLink) kidsLink.textContent = nomePerfil;
        if (profileIcon) profileIcon.src = imagemPerfil;
    }

    const container = document.getElementById('main-content');
    
    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});
