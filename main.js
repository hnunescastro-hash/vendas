const header = document.querySelector('.site-header');
const revealItems = document.querySelectorAll('[data-reveal]');
const faqItems = document.querySelectorAll('.faq-item');
const floatingCta = document.querySelector('.floating-cta-button');
const saleCtas = document.querySelectorAll('.js-sale-cta');
const offerCountdown = document.querySelector('[data-offer-countdown]');
const proofStage = document.querySelector('[data-proof-stage]');
const proofFloatCards = document.querySelectorAll('[data-mural-card]');
const year = document.getElementById('year');

const visibleSaleCtas = new Set();
const countdownKey = 'karaokeNoTomOfferEndsAt';
const countdownDuration = 15 * 60 * 1000;
const proofPointer = { x: 0.5, y: 0.5 };

let countdownTimer = null;
let scrollTicking = false;

function syncHeaderState() {
    if (!header) {
        return;
    }

    header.classList.toggle('is-scrolled', window.scrollY > 18);
}

function setupReveal() {
    if (!revealItems.length) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.16,
            rootMargin: '0px 0px -32px 0px'
        }
    );

    revealItems.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${index * 70}ms`);
        observer.observe(item);
    });
}

function setupFaq() {
    if (!faqItems.length) {
        return;
    }

    faqItems.forEach((item) => {
        item.addEventListener('toggle', () => {
            if (!item.open) {
                return;
            }

            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        });
    });
}

function syncFloatingCta() {
    if (!floatingCta) {
        return;
    }

    const shouldShow = window.scrollY > 280 && visibleSaleCtas.size === 0;

    floatingCta.classList.toggle('is-visible', shouldShow);
    floatingCta.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
}

function setupFloatingCta() {
    if (!floatingCta || !saleCtas.length) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        syncFloatingCta();
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
                    visibleSaleCtas.add(entry.target);
                    return;
                }

                visibleSaleCtas.delete(entry.target);
            });

            syncFloatingCta();
        },
        {
            threshold: [0, 0.35, 0.75]
        }
    );

    saleCtas.forEach((cta) => {
        observer.observe(cta);
    });

    syncFloatingCta();
}

function getCountdownDeadline() {
    const now = Date.now();

    try {
        const storedValue = Number(window.localStorage.getItem(countdownKey));

        if (Number.isFinite(storedValue) && storedValue > now) {
            return storedValue;
        }

        const nextDeadline = now + countdownDuration;
        window.localStorage.setItem(countdownKey, String(nextDeadline));
        return nextDeadline;
    } catch {
        return now + countdownDuration;
    }
}

function formatCountdown(remainingMs) {
    const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    return `${minutes}:${seconds}`;
}

function setupOfferCountdown() {
    if (!offerCountdown) {
        return;
    }

    let deadline = getCountdownDeadline();

    const renderCountdown = () => {
        const now = Date.now();

        if (deadline <= now) {
            deadline = getCountdownDeadline();
        }

        offerCountdown.textContent = formatCountdown(deadline - now);
    };

    renderCountdown();

    if (countdownTimer) {
        window.clearInterval(countdownTimer);
    }

    countdownTimer = window.setInterval(renderCountdown, 1000);
}

function updateProofFloat() {
    if (!proofStage || !proofFloatCards.length) {
        return;
    }

    const stageRect = proofStage.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const progress = (viewportHeight - stageRect.top) / (viewportHeight + stageRect.height);
    const clampedProgress = Math.min(1.2, Math.max(-0.2, progress));

    proofFloatCards.forEach((card) => {
        const speed = Number(card.dataset.speed || '1');
        const direction = Number(card.dataset.direction || '1');
        const centeredProgress = clampedProgress - 0.5;
        const verticalOffset = centeredProgress * 96 * speed * direction + (proofPointer.y - 0.5) * 22 * speed;
        const horizontalDrift = centeredProgress * 10 * speed + (proofPointer.x - 0.5) * 18 * speed;

        card.style.setProperty('--float-offset', `${verticalOffset.toFixed(2)}px`);
        card.style.setProperty('--float-drift', `${horizontalDrift.toFixed(2)}px`);
        card.style.setProperty('--mural-shift-y', `${verticalOffset.toFixed(2)}px`);
        card.style.setProperty('--mural-shift-x', `${horizontalDrift.toFixed(2)}px`);
    });
}

function setupProofMural() {
    if (!proofStage || !proofFloatCards.length) {
        return;
    }

    const proofSection = proofStage.closest('.proof-section');

    if (!proofSection) {
        updateProofFloat();
        return;
    }

    proofSection.addEventListener('pointermove', (event) => {
        const rect = proofSection.getBoundingClientRect();

        proofPointer.x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        proofPointer.y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));

        requestScrollEffects();
    });

    proofSection.addEventListener('pointerleave', () => {
        proofPointer.x = 0.5;
        proofPointer.y = 0.5;
        requestScrollEffects();
    });

    updateProofFloat();
}

function setupSmoothAnchors() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetSelector = link.getAttribute('href');

            if (!targetSelector || targetSelector === '#') {
                return;
            }

            const targetElement = document.querySelector(targetSelector);

            if (!targetElement) {
                return;
            }

            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

function runScrollEffects() {
    syncHeaderState();
    syncFloatingCta();
    updateProofFloat();
    scrollTicking = false;
}

function requestScrollEffects() {
    if (scrollTicking) {
        return;
    }

    scrollTicking = true;
    window.requestAnimationFrame(runScrollEffects);
}

syncHeaderState();
setupReveal();
setupFaq();
setupFloatingCta();
setupOfferCountdown();
setupProofMural();
setupSmoothAnchors();
updateProofFloat();

if (year) {
    year.textContent = String(new Date().getFullYear());
}

window.addEventListener('scroll', requestScrollEffects, { passive: true });
window.addEventListener('resize', requestScrollEffects);
