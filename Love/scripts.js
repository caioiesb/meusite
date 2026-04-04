document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const hero = document.getElementById('hero');
    const messageSection = document.getElementById('message');
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const heartContainer = document.getElementById('heart-container');

    // Transitions
    startBtn.addEventListener('click', () => {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.classList.add('hidden');
            messageSection.classList.remove('hidden');
            setTimeout(() => {
                messageSection.style.opacity = '1';
                startHearts();
            }, 100);
        }, 1000);
    });

    // Runaway No Button
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    });

    // Yes Button Reaction
    yesBtn.addEventListener('click', () => {
        messageSection.style.opacity = '0';
        setTimeout(() => {
            messageSection.classList.add('hidden');
            const gallery = document.getElementById('gallery');
            gallery.classList.remove('hidden');
            document.body.style.overflowY = 'auto'; // Allow scrolling
            
            setTimeout(() => {
                gallery.style.opacity = '1';
                handleReveal(); // Check for reveals immediately
            }, 100);
        }, 1000);

        for(let i = 0; i < 50; i++) {
            setTimeout(createHeart, i * 50);
        }
    });

    // Scroll Reveal Logic
    function handleReveal() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleReveal);

    // Heart Animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        
        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    function startHearts() {
        setInterval(createHeart, 300);
    }
});

function startCountdown() {
    // 2026 é o ano
    // 6 é o mês de Julho (Janeiro=0, Fevereiro=1... Julho=6)
    // 31 é o dia
    const birthdayDate = new Date(2026, 6, 31, 0, 0, 0).getTime(); 

    const timer = setInterval(function() {
        const now = new Date().getTime();
        const diff = birthdayDate - now;

        // Cálculos de tempo
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        // Atualiza os elementos no HTML
        // Verificamos se o elemento existe antes de tentar atualizar (boa prática)
        if(document.getElementById("days")) {
            document.getElementById("days").innerHTML = d < 10 ? "0" + d : d;
            document.getElementById("hours").innerHTML = h < 10 ? "0" + h : h;
            document.getElementById("minutes").innerHTML = m < 10 ? "0" + m : m;
            document.getElementById("seconds").innerHTML = s < 10 ? "0" + s : s;
        }

        // Se a data passar (Aniversário chegou!)
        if (diff < 0) {
            clearInterval(timer);
            const containerH3 = document.querySelector(".countdown-container h3");
            if(containerH3) containerH3.innerHTML = "FELIZ ANIVERSÁRIO! ❤️";
            const timerDiv = document.getElementById("timer");
            if(timerDiv) timerDiv.style.display = "none";
        }
    }, 1000);
}

startCountdown();
