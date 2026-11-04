/**
 * Blog Section Carousel & Category Filter
 * Tagore Auto Parts
 */
document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.blog-grid');
    const prevBtn = document.querySelector('.blog-arrow-left');
    const nextBtn = document.querySelector('.blog-arrow-right');
    const tabs = document.querySelectorAll('.blog-tab');
    const cards = document.querySelectorAll('.blog-card');

    if (!grid) return;

    // Calculate step width for smooth scrolling
    function getScrollStep() {
        const visibleCard = grid.querySelector('.blog-card:not(.hidden)');
        if (visibleCard) {
            return visibleCard.offsetWidth + 24; // card width + gap
        }
        return 364;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            grid.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            grid.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        });
    }

    // Category Tabs Filtering
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');

            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            cards.forEach(function(card) {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });

            // Smoothly reset scroll to beginning when category changes
            grid.scrollTo({ left: 0, behavior: 'smooth' });
        });
    });

    // Optional: Mouse drag-to-scroll support for desktop
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    grid.addEventListener('mousedown', function(e) {
        isDown = true;
        startX = e.pageX - grid.offsetLeft;
        scrollLeft = grid.scrollLeft;
    });

    grid.addEventListener('mouseleave', function() {
        isDown = false;
    });

    grid.addEventListener('mouseup', function() {
        isDown = false;
    });

    grid.addEventListener('mousemove', function(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - grid.offsetLeft;
        const walk = (x - startX) * 1.5;
        grid.scrollLeft = scrollLeft - walk;
    });
});
