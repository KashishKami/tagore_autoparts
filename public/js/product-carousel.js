// Product Carousels Initialization for Popular Used Engines & Transmissions
(function() {
    function initCarousels() {
        if (typeof jQuery !== 'undefined' && jQuery.fn.owlCarousel) {
            var $engines = jQuery('.engines-carousel .owl-carousel');
            if ($engines.length && !$engines.hasClass('owl-loaded')) {
                $engines.owlCarousel({
                    items: 4,
                    margin: 20,
                    loop: true,
                    nav: true,
                    dots: false,
                    autoplay: true,
                    autoplayTimeout: 4000,
                    autoplayHoverPause: true,
                    responsive: {
                        0: { items: 1 },
                        576: { items: 2 },
                        768: { items: 3 },
                        992: { items: 4 }
                    }
                });
            }

            var $transmissions = jQuery('.transmissions-carousel .owl-carousel');
            if ($transmissions.length && !$transmissions.hasClass('owl-loaded')) {
                $transmissions.owlCarousel({
                    items: 4,
                    margin: 20,
                    loop: true,
                    nav: true,
                    dots: false,
                    autoplay: true,
                    autoplayTimeout: 4500,
                    autoplayHoverPause: true,
                    responsive: {
                        0: { items: 1 },
                        576: { items: 2 },
                        768: { items: 3 },
                        992: { items: 4 }
                    }
                });
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousels);
    } else {
        initCarousels();
    }
})();
