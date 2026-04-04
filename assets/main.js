// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
// Initial check
revealOnScroll();

// Smooth scrolling for anchor links with Preloader
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Show Preloader
            const preloader = document.getElementById('preloader');
            preloader.style.display = 'flex';
            
            // Artificial delay for the "shine" effect
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // If it's the "Sobre" section and was hidden, show it
                if (targetId === '#sobre') {
                    target.style.display = 'block';
                }
                
                // Hide Preloader after scroll starts
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 800);
        }
    });
});


// Close About Section logic
function closeAbout() {
    const aboutSection = document.getElementById('sobre');
    aboutSection.style.display = 'none';
}

// Espera o site carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. REMOVER PRELOADER
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500); // 1.5 segundos de loading
    }

    // 2. ANIMAÇÃO DE REVELAR AO ROLAR (REVEAL)
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // Distância para ativar a animação

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", reveal);

    // 3. EFEITO NA NAVBAR AO ROLAR (STICKY NAV)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = "10px 0";
            navbar.style.background = "rgba(255, 255, 255, 0.98)";
            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
        } else {
            navbar.style.padding = "15px 0";
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }
    });
});
