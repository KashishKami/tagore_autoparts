!function(e){"use strict";var a=e(window);e.fn.classyNav&&e("#essenceNav").classyNav(),e.fn.owlCarousel&&(e(".popular-products-slides").owlCarousel({items:4,margin:30,loop:!0,nav:!1,dots:!1,autoplay:!0,autoplayTimeout:5e3,smartSpeed:1e3,responsive:{0:{items:1},576:{items:2},768:{items:3},992:{items:4}}}),e(".product_thumbnail_slides").owlCarousel({items:1,margin:0,loop:!0,nav:!0,navText:["<img src='img/core-img/long-arrow-left.svg' alt=''>","<img src='img/core-img/long-arrow-right.svg' alt=''>"],dots:!1,autoplay:!0,autoplayTimeout:5e3,smartSpeed:1e3}));var t=e("#essenceCartBtn"),s=e(".cart-bg-overlay"),i=e(".right-side-cart-area"),o=e("#rightSideCart");t.on("click",(function(){s.toggleClass("cart-bg-overlay-on"),i.toggleClass("cart-on")})),s.on("click",(function(){e(this).removeClass("cart-bg-overlay-on"),i.removeClass("cart-on")})),o.on("click",(function(){s.removeClass("cart-bg-overlay-on"),i.removeClass("cart-on")})),e.fn.scrollUp&&e.scrollUp({scrollSpeed:1e3,easingType:"easeInOutQuart",scrollText:'<i class="fa fa-angle-up" aria-hidden="true"></i>'}),a.on("scroll",(function(){a.scrollTop()>0?e(".header_area").addClass("sticky"):e(".header_area").removeClass("sticky")})),e.fn.niceSelect&&e("select:not(.hero-quote-form select):not(.hero-form-card select):not(#quote-part):not(#iq-part):not(.three-d-checkout-form select):not(#lift_gate)").niceSelect(),e(".slider-range-price").each((function(){var a=jQuery(this).data("min"),t=jQuery(this).data("max"),s=jQuery(this).data("unit"),i=jQuery(this).data("value-min"),o=jQuery(this).data("value-max"),l=jQuery(this).data("label-result"),n=e(this);e(this).slider({range:!0,min:a,max:t,values:[i,o],slide:function(e,a){var t=l+" "+s+a.values[0]+" - "+s+a.values[1];console.log(n),n.closest(".slider-range").find(".range-price").html(t)}})}));var l=e(".favme");l.on("click",(function(){e(this).toggleClass("active")})),l.on("click touchstart",(function(){e(this).toggleClass("is_animating")})),l.on("animationend",(function(){e(this).toggleClass("is_animating")})),e.fn.niceScroll&&e(".cart-list, .cart-content").niceScroll(),a.width()>767&&(new WOW).init(),e.fn.tooltip&&e('[data-toggle="tooltip"]').tooltip(),e("a[href='#']").on("click",(function(e){e.preventDefault()}))}(jQuery);

// Global modern header and mobile navigation handlers
window.toggleSearchModal = function() {
    var modal = document.getElementById('header-search-modal');
    if (modal) {
        modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    }
};

window.toggleMobileNav = function() {
    var nav = document.getElementById('mainNavigation');
    if (nav) {
        nav.style.display = '';
        nav.classList.toggle('mobile-nav-open');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dropdown-parent').forEach(function(parent) {
        var trigger = parent.querySelector('a');
        if (trigger) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                parent.classList.toggle('active');
            });
        }
    });

    document.addEventListener('click', function(e) {
        var nav = document.getElementById('mainNavigation');
        var btn = e.target.closest('.modern-mobile-menu-btn');
        if (nav && nav.classList.contains('mobile-nav-open') && !btn && !e.target.closest('#mainNavigation')) {
            nav.classList.remove('mobile-nav-open');
            nav.style.display = '';
        }
        if (!e.target.closest('.dropdown-parent')) {
            document.querySelectorAll('.dropdown-parent.active').forEach(function(p) {
                p.classList.remove('active');
            });
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            var nav = document.getElementById('mainNavigation');
            if (nav) {
                nav.classList.remove('mobile-nav-open');
                nav.style.display = '';
            }
        }
    });
});