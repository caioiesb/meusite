/* =============================================
   DRA. DANIELE MARQUES · MAIN.JS
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ── 1. PRELOADER ──────────────────────────────
    const preloader = document.getElementById("preloader");
    if (preloader) {
        // Wait for fill animation (1.5s) then fade out
        setTimeout(() => {
            preloader.classList.add("hidden");
            // After fade-out, remove from DOM
            setTimeout(() => preloader.remove(), 500);
        }, 1600);
    }

    // ── 2. NAVBAR SCROLL ──────────────────────────
    const navbar = document.getElementById("navbar");

    const handleNavbarScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // Check initial state

    // ── 3. MOBILE MENU ────────────────────────────
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    const body = document.body;

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("open");
            hamburger.classList.toggle("active", isOpen);
            body.style.overflow = isOpen ? "hidden" : "";
        });

        // Close on link click
        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
                hamburger.classList.remove("active");
                body.style.overflow = "";
            });
        });
    }

    // ── 4. SMOOTH SCROLL ──────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
                window.scrollTo({ top, behavior: "smooth" });
            }
        });
    });

    // ── 5. SCROLL REVEAL ──────────────────────────
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Unobserve after reveal for performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => observer.observe(el));

    // ── 6. ACTIVE NAV LINK ON SCROLL ─────────────
    const sections = document.querySelectorAll("section[id], footer[id]");
    const navLinksList = document.querySelectorAll(".nav-links a[href^='#']");

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinksList.forEach(link => {
                    link.classList.remove("active-link");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active-link");
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));

});

// ── 7. CARROSSEIS ─────────────────────────────
function initCarousel(trackId, prevId, nextId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!track || !prevBtn || !nextBtn) return;

    const dots = track.closest(".carousel-wrapper").querySelectorAll(".dot");
    let current = 0;
    const total = track.children.length;
    let autoplay;

    const goTo = (index) => {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach(d => d.classList.remove("active"));
        if (dots[current]) dots[current].classList.add("active");
    };

    const startAutoplay = () => { autoplay = setInterval(() => goTo(current + 1), 4000); };
    const resetAutoplay = () => { clearInterval(autoplay); startAutoplay(); };

    prevBtn.addEventListener("click", () => { goTo(current - 1); resetAutoplay(); });
    nextBtn.addEventListener("click", () => { goTo(current + 1); resetAutoplay(); });
    dots.forEach(d => d.addEventListener("click", () => { goTo(+d.dataset.index); resetAutoplay(); }));

    let startX = 0;
    track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAutoplay(); }
    }, { passive: true });

    startAutoplay();
}

initCarousel("carouselTrack1", "prevBtn1", "nextBtn1");
initCarousel("carouselTrack2", "prevBtn2", "nextBtn2");
initCarousel("carouselTrack3", "prevBtn3", "nextBtn3");