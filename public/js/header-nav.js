// Modern Header, Navigation & Customer Speed Dial Interactions
function toggleSearchModal() {
    var modal = document.getElementById('header-search-modal');
    if (modal) {
        modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    }
}

function toggleMobileNav() {
    var nav = document.getElementById('mainNavigation');
    if (nav) {
        nav.style.display = '';
        nav.classList.toggle('mobile-nav-open');
    }
}

// Injects Call & Checkout inside mobile menu drawer
function initMobileNavActions() {
    var nav = document.getElementById('mainNavigation');
    if (nav) {
        var existing = nav.querySelector('.mobile-nav-action-item');
        var markup = 
            '<div class="mobile-nav-actions-wrapper">' +
                '<a href="tel:+18886565933" class="mobile-nav-call-pill">' +
                    '<i class="fa fa-phone"></i> Sales: +1 (888) 656-5933' +
                '</a>' +
                '<a href="tel:+18885586437" class="mobile-nav-call-pill mobile-nav-support-pill">' +
                    '<i class="fa fa-headphones"></i> Support: +1 (888) 558-6437' +
                '</a>' +
                '<a href="checkout.html" class="mobile-nav-checkout-btn">' +
                    '<i class="fa fa-shopping-cart"></i> Checkout' +
                '</a>' +
            '</div>';
        if (existing) {
            existing.innerHTML = markup;
        } else {
            var li = document.createElement('li');
            li.className = 'mobile-nav-action-item';
            li.innerHTML = markup;
            nav.appendChild(li);
        }
    }
}

// Sets up "Call Us ⌵" Dropdown in Desktop Navbar (Big screen web view)
function initNavbarCallDropdown() {
    var headerActions = document.querySelectorAll('.modern-header-actions');
    headerActions.forEach(function(actions) {
        var existingWrap = actions.querySelector('.call-dropdown-wrapper');
        if (existingWrap) return;

        var dropdownHtml = 
            '<div class="call-dropdown-wrapper">' +
                '<button type="button" class="modern-call-pill call-dropdown-btn" aria-expanded="false" aria-haspopup="true">' +
                    '<i class="fa fa-phone"></i> Call Us <i class="fa fa-angle-down call-dropdown-arrow"></i>' +
                '</button>' +
                '<div class="call-dropdown-menu" role="menu">' +
                    '<a href="tel:+18886565933" class="call-dropdown-item sales-item" role="menuitem">' +
                        '<i class="fa fa-phone"></i>' +
                        '<span class="call-dept-name">Sales:</span>' +
                        '<span class="call-dept-number">+1 (888) 656-5933</span>' +
                    '</a>' +
                    '<div class="call-dropdown-divider"></div>' +
                    '<a href="tel:+18885586437" class="call-dropdown-item support-item" role="menuitem">' +
                        '<i class="fa fa-headphones"></i>' +
                        '<span class="call-dept-name">Support:</span>' +
                        '<span class="call-dept-number">+1 (888) 558-6437</span>' +
                    '</a>' +
                '</div>' +
            '</div>';

        var pills = actions.querySelectorAll('.modern-call-pill');
        if (pills.length > 0) {
            var firstPill = pills[0];
            var temp = document.createElement('div');
            temp.innerHTML = dropdownHtml;
            var dropdownElem = temp.firstChild;
            firstPill.parentNode.insertBefore(dropdownElem, firstPill);
            pills.forEach(function(p) {
                if (p.parentNode) p.parentNode.removeChild(p);
            });
        }
    });

    document.querySelectorAll('.call-dropdown-wrapper').forEach(function(wrap) {
        var btn = wrap.querySelector('.call-dropdown-btn');
        if (btn && !btn.hasAttribute('data-dropdown-click-bound')) {
            btn.setAttribute('data-dropdown-click-bound', 'true');
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var isOpen = wrap.classList.toggle('is-open');
                btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });
        }
    });
}

// Hero Section "Call Us" - Direct one-click call button
function initHeroCallDropdown() {
    var wrapper = document.querySelector('.hero-buttons .hero-call-dropdown-wrapper');
    if (wrapper) {
        var callLink = document.createElement('a');
        callLink.href = 'tel:+18886565933';
        callLink.className = 'hero-btn hero-btn-primary';
        callLink.innerHTML = '<i class="fa fa-phone" style="margin-right: 8px;"></i> Call Us';
        wrapper.parentNode.replaceChild(callLink, wrapper);
    }
}

// Mobile & Desktop Dropdown Toggle Fix (allows open AND close on tap)
function initDropdownToggles() {
    document.querySelectorAll('.dropdown-parent').forEach(function(parent) {
        var trigger = parent.querySelector('a');
        if (trigger && !trigger.hasAttribute('data-dropdown-initialized')) {
            trigger.setAttribute('data-dropdown-initialized', 'true');
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var wasActive = parent.classList.contains('active');
                document.querySelectorAll('.dropdown-parent.active').forEach(function(p) {
                    p.classList.remove('active');
                });
                if (!wasActive) {
                    parent.classList.add('active');
                }
                trigger.blur();
            });
        }
    });
}

// Floating Speed Dial Controller
window.toggleSpeedDial = function() {
    var dial = document.getElementById('modernSpeedDial');
    var trigger = document.getElementById('speedDialTrigger');
    if (!dial) return;
    var isOpen = dial.classList.toggle('is-open');
    if (trigger) {
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
};

function initSpeedDial() {
    var dialHtml = 
        '<div class="speed-dial-menu" id="speedDialMenu">' +
            '<a href="https://shop.tagoreautoparts.com" target="_blank" rel="noopener" class="speed-dial-action action-shop" title="Search Store Inventory">' +
                '<span class="speed-dial-label">Shop Inventory</span>' +
                '<span class="speed-dial-icon"><i class="fa fa-shopping-cart"></i></span>' +
            '</a>' +
            '<button type="button" class="speed-dial-action action-quote" onclick="openInstantQuoteModal()" title="Get Free Quote">' +
                '<span class="speed-dial-label">Free Quote</span>' +
                '<span class="speed-dial-icon"><i class="fa fa-pencil-square-o"></i></span>' +
            '</button>' +
            '<a href="tel:+18885586437" class="speed-dial-action action-support" title="Call Customer Support">' +
                '<span class="speed-dial-label">Support</span>' +
                '<span class="speed-dial-icon"><i class="fa fa-headphones"></i></span>' +
            '</a>' +
            '<a href="tel:+18886565933" class="speed-dial-action action-call" title="Call Sales Team">' +
                '<span class="speed-dial-label">Sales</span>' +
                '<span class="speed-dial-icon"><i class="fa fa-phone"></i></span>' +
            '</a>' +
        '</div>' +
        '<button type="button" class="speed-dial-trigger" id="speedDialTrigger" onclick="toggleSpeedDial()" aria-label="Customer quick actions" aria-expanded="false">' +
            '<i class="fa fa-comments speed-dial-icon-main"></i>' +
            '<i class="fa fa-times speed-dial-icon-close"></i>' +
        '</button>';

    var existingDial = document.getElementById('modernSpeedDial');
    if (existingDial) {
        if (!existingDial.querySelector('.action-support')) {
            existingDial.innerHTML = dialHtml;
        }
        return;
    }

    var oldBtn = document.querySelector('.modern-floating-call-btn');
    var dial = document.createElement('div');
    dial.id = 'modernSpeedDial';
    dial.className = 'modern-speed-dial';
    dial.setAttribute('aria-label', 'Customer quick actions');
    dial.innerHTML = dialHtml;

    if (oldBtn && oldBtn.parentNode) {
        oldBtn.parentNode.replaceChild(dial, oldBtn);
    } else {
        document.body.appendChild(dial);
    }
}

// Instant Quote Form Modal (White Card matching Hero Section)
window.openInstantQuoteModal = function() {
    var dial = document.getElementById('modernSpeedDial');
    if (dial) dial.classList.remove('is-open');

    var modal = document.getElementById('instant-quote-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'instant-quote-modal';
        modal.className = 'instant-quote-backdrop';
        modal.innerHTML = 
            '<div class="instant-quote-dialog">' +
                '<button type="button" class="instant-quote-close" onclick="closeInstantQuoteModal()" aria-label="Close quote modal">&times;</button>' +
                '<h2 class="hero-form-title">Get a Free Quote Instantly</h2>' +
                '<form action="leads-form.php" method="POST" class="hero-quote-form" id="instantQuoteForm">' +
                    '<div class="hero-form-row">' +
                        '<div class="hero-form-field">' +
                            '<label for="iq-name">YOUR NAME</label>' +
                            '<input type="text" id="iq-name" name="name" placeholder="Your Name" required>' +
                        '</div>' +
                        '<div class="hero-form-field">' +
                            '<label for="iq-phone">PHONE NUMBER</label>' +
                            '<input type="tel" id="iq-phone" name="phone" placeholder="(555) 000-0000" required>' +
                        '</div>' +
                    '</div>' +
                    '<div class="hero-form-row">' +
                        '<div class="hero-form-field">' +
                            '<label for="iq-year">YEAR</label>' +
                            '<input type="text" id="iq-year" name="year" placeholder="Select Year" required>' +
                        '</div>' +
                        '<div class="hero-form-field">' +
                            '<label for="iq-part">PART TYPE</label>' +
                            '<select id="iq-part" name="part" required>' +
                                '<option value="">Select Part</option>' +
                                '<option value="Engine">Engine</option>' +
                                '<option value="Transmission">Transmission</option>' +
                                '<option value="Turbo">Turbo</option>' +
                                '<option value="Other">Other Auto Part</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                    '<div class="hero-form-field hero-form-field-full">' +
                        '<label for="iq-make-model">MAKE &amp; MODEL</label>' +
                        '<input type="text" id="iq-make-model" name="make_model" placeholder="e.g. Ford F-150, Chevy Silverado" required>' +
                    '</div>' +
                    '<div class="hero-form-field hero-form-field-full">' +
                        '<label for="iq-email">YOUR EMAIL</label>' +
                        '<input type="email" id="iq-email" name="email" placeholder="Enter your email address" required>' +
                    '</div>' +
                    '<div class="hero-form-consent" style="display: flex; flex-direction: column; gap: 8px; margin: 8px 0 12px 0;">' +
                        '<div style="display: flex; align-items: flex-start; gap: 8px;">' +
                            '<input type="checkbox" id="modal-opt-out" name="opt_out" style="margin-top: 3px; accent-color: #b71c1b;">' +
                            '<label for="modal-opt-out" style="font-size: 11.5px; color: #64748b; cursor: pointer; margin: 0;">Opt out of promotional communications</label>' +
                        '</div>' +
                        '<div style="display: flex; align-items: flex-start; gap: 8px;">' +
                            '<input type="checkbox" id="modal-consent" name="consent" required style="margin-top: 3px; accent-color: #b71c1b;">' +
                            '<label for="modal-consent" style="font-size: 11.5px; color: #64748b; cursor: pointer; margin: 0; line-height: 1.4;">' +
                                'By providing your phone number, you consent to receive text messages from Tagore Fusion LLC for purposes related to our services. Message frequency may vary. Reply HELP for help or STOP to unsubscribe. See our <a href="privacy-policy.html" style="color: #b71c1b; font-weight: 600;">privacy policy</a>.' +
                            '</label>' +
                        '</div>' +
                    '</div>' +
                    '<button type="submit" class="hero-submit-btn" style="width: 100%;">' +
                        'Get Free Quote &amp; Call Back' +
                    '</button>' +
                '</form>' +
            '</div>';

        // Backdrop click close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeInstantQuoteModal();
        });

        // Submit handler for AJAX submission to leads-form.php
        var form = modal.querySelector('#instantQuoteForm');
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            var submitBtn = form.querySelector('button[type="submit"]');
            var originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin" style="margin-right:8px;"></i> Submitting Quote...';

            var formData = new FormData(form);
            formData.append('is_ajax', '1');

            try {
                var res = await fetch('leads-form.php', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                var data = {};
                try { 
                    data = await res.json(); 
                } catch(err) { 
                    data = { success: res.ok, message: 'Quote received successfully!' }; 
                }

                if (data.success) {
                    closeInstantQuoteModal();
                    form.reset();
                    if (typeof showQuoteSuccessModal === 'function') {
                        var partDisplay = [formData.get('year'), formData.get('make_model'), formData.get('part')].filter(Boolean).join(' ');
                        var pEl = document.getElementById('modal-vehicle-part');
                        var phEl = document.getElementById('modal-phone-display');
                        if (pEl) pEl.textContent = partDisplay;
                        if (phEl) phEl.textContent = formData.get('phone');
                        showQuoteSuccessModal();
                    } else {
                        alert('Thank you! Your quote request has been received. Our team will contact you shortly.');
                    }
                } else {
                    alert(data.message || 'Sorry, there was an issue processing your request. Please call us at +1-888-656-5933.');
                }
            } catch(err) {
                // Fallback to standard form post
                form.submit();
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });

        document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeInstantQuoteModal = function() {
    var modal = document.getElementById('instant-quote-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

// Related Guides & Articles Left/Right Carousel Controller
function initRelatedGuidesCarousel() {
    var haloRows = document.querySelectorAll('.banner-block-4 .halo-row');
    if (!haloRows || haloRows.length === 0) return;

    haloRows.forEach(function(row) {
        var wrapper = row.closest('.halo-carousel-wrapper') || row.parentElement;
        if (!wrapper) return;

        var computedPos = window.getComputedStyle(wrapper).position;
        if (computedPos === 'static') {
            wrapper.style.position = 'relative';
        }

        var prevBtn = wrapper.querySelector('.related-nav-btn.prev');
        var nextBtn = wrapper.querySelector('.related-nav-btn.next');

        if (!prevBtn) {
            prevBtn = document.createElement('button');
            prevBtn.type = 'button';
            prevBtn.className = 'related-nav-btn prev';
            prevBtn.setAttribute('aria-label', 'Previous articles');
            prevBtn.innerHTML = '<i class="fa fa-chevron-left"></i>';
            wrapper.appendChild(prevBtn);
        }

        if (!nextBtn) {
            nextBtn = document.createElement('button');
            nextBtn.type = 'button';
            nextBtn.className = 'related-nav-btn next';
            nextBtn.setAttribute('aria-label', 'Next articles');
            nextBtn.innerHTML = '<i class="fa fa-chevron-right"></i>';
            wrapper.appendChild(nextBtn);
        }

        function updateButtons() {
            var maxScroll = row.scrollWidth - row.clientWidth;
            if (maxScroll <= 5) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                return;
            }
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';

            if (row.scrollLeft <= 10) {
                prevBtn.style.opacity = '0.35';
                prevBtn.style.pointerEvents = 'none';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.pointerEvents = 'auto';
            }

            if (row.scrollLeft >= maxScroll - 10) {
                nextBtn.style.opacity = '0.35';
                nextBtn.style.pointerEvents = 'none';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
            }
        }

        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var card = row.querySelector('.halo-item');
            var scrollStep = card ? (card.offsetWidth + 24) : 364;
            row.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var card = row.querySelector('.halo-item');
            var scrollStep = card ? (card.offsetWidth + 24) : 364;
            row.scrollBy({ left: scrollStep, behavior: 'smooth' });
        });

        row.addEventListener('scroll', updateButtons, { passive: true });
        window.addEventListener('resize', updateButtons);
        setTimeout(updateButtons, 150);
    });
}

// Footer Contact Lines (Ensure Sales & Support both present)
function initFooterContactLines() {
    var footerContacts = document.querySelectorAll('.modern-footer-contact');
    footerContacts.forEach(function(ul) {
        if (ul.querySelector('a[href*="8885586437"]')) return;
        var phoneLi = ul.querySelector('a[href*="8886565933"]');
        if (phoneLi) {
            var parentLi = phoneLi.closest('li');
            if (parentLi) {
                parentLi.innerHTML = '<i class="fa fa-phone"></i><span>Sales: <a href="tel:+18886565933">+1 (888) 656-5933</a></span>';
                var supportLi = document.createElement('li');
                supportLi.innerHTML = '<i class="fa fa-headphones"></i><span>Support: <a href="tel:+18885586437">+1 (888) 558-6437</a></span>';
                parentLi.parentNode.insertBefore(supportLi, parentLi.nextSibling);
            }
        }
    });
}

// Receipt-Style Part Price real-time synchronization on Checkout page
function initCheckoutReceipt() {
    var priceInput = document.getElementById('price_by_agent');
    var receiptPrice = document.getElementById('receiptPartPrice');
    if (priceInput && receiptPrice) {
        function updateReceiptPrice() {
            var val = (priceInput.value || '').trim();
            if (!val) {
                receiptPrice.textContent = '$0.00';
            } else {
                if (val.charAt(0) !== '$') {
                    receiptPrice.textContent = '$' + val;
                } else {
                    receiptPrice.textContent = val;
                }
            }
        }
        if (!priceInput.hasAttribute('data-receipt-sync')) {
            priceInput.setAttribute('data-receipt-sync', 'true');
            priceInput.addEventListener('input', updateReceiptPrice);
            priceInput.addEventListener('change', updateReceiptPrice);
        }
        updateReceiptPrice();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initNavbarCallDropdown();
    initHeroCallDropdown();
    initMobileNavActions();
    initDropdownToggles();
    initSpeedDial();
    initFooterContactLines();
    initRelatedGuidesCarousel();
    initUniversalFormHandlers();
    initCheckoutReceipt();

    // Global outside click handler
    document.addEventListener('click', function(e) {
        // Close Hero / Call dropdown if clicked outside
        if (!e.target.closest('.hero-call-dropdown-wrapper') && !e.target.closest('.call-dropdown-wrapper')) {
            document.querySelectorAll('.hero-call-dropdown-wrapper.is-open, .call-dropdown-wrapper.is-open').forEach(function(wrap) {
                wrap.classList.remove('is-open');
                var btn = wrap.querySelector('.hero-call-dropdown-btn, .call-dropdown-btn');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });
        }

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
        var dial = document.getElementById('modernSpeedDial');
        if (dial && dial.classList.contains('is-open') && !e.target.closest('#modernSpeedDial')) {
            dial.classList.remove('is-open');
            var trigger = document.getElementById('speedDialTrigger');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }
    });

    // Reset mobile state on viewport expand
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            var nav = document.getElementById('mainNavigation');
            if (nav) {
                nav.classList.remove('mobile-nav-open');
                nav.style.display = '';
            }
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.hero-call-dropdown-wrapper.is-open, .call-dropdown-wrapper.is-open').forEach(function(wrap) {
                wrap.classList.remove('is-open');
                var btn = wrap.querySelector('.hero-call-dropdown-btn, .call-dropdown-btn');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });
        }
    });
});

window.addEventListener('load', function() {
    initNavbarCallDropdown();
    initHeroCallDropdown();
    initMobileNavActions();
    initDropdownToggles();
    initSpeedDial();
    initFooterContactLines();
    initRelatedGuidesCarousel();
    initUniversalFormHandlers();
    initCheckoutReceipt();
});

// Universal Confirmation Modal & Form Interceptor
window.showFormConfirmationModal = function(options) {
    options = options || {};
    var title = options.title || 'Submission Received!';
    var message = options.message || 'We have received your details and will contact you shortly.';
    var subtext = options.subtext || 'Our specialists are available 10:00 AM - 6:00 PM EST for immediate assistance.';
    var callText = options.callText || 'Call Now: +1 (888) 656-5933';

    var modalId = 'global-confirmation-modal';
    var modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'quote-modal-backdrop';
        modal.innerHTML = 
            '<div class="quote-modal-dialog">' +
                '<button type="button" class="quote-modal-close" onclick="closeFormConfirmationModal()" aria-label="Close modal">&times;</button>' +
                '<div class="quote-modal-icon">' +
                    '<i class="fa fa-check"></i>' +
                '</div>' +
                '<h3 class="quote-modal-title" id="gcm-title"></h3>' +
                '<p class="quote-modal-vehicle" id="gcm-msg"></p>' +
                '<p class="quote-modal-subtext" id="gcm-subtext"></p>' +
                '<div class="quote-modal-actions">' +
                    '<a href="tel:+18886565933" class="quote-modal-call-btn" id="gcm-call">' +
                        '<i class="fa fa-phone"></i> <span>' + callText + '</span>' +
                    '</a>' +
                    '<button type="button" class="quote-modal-done-btn" onclick="closeFormConfirmationModal()">Done</button>' +
                '</div>' +
            '</div>';

        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeFormConfirmationModal();
        });
        document.body.appendChild(modal);
    }

    var tEl = document.getElementById('gcm-title');
    var mEl = document.getElementById('gcm-msg');
    var sEl = document.getElementById('gcm-subtext');
    var cEl = document.getElementById('gcm-call');

    if (tEl) tEl.textContent = title;
    if (mEl) mEl.innerHTML = message;
    if (sEl) sEl.innerHTML = subtext;
    if (cEl) {
        cEl.innerHTML = '<i class="fa fa-phone"></i> ' + callText;
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeFormConfirmationModal = function() {
    var modal = document.getElementById('global-confirmation-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeFormConfirmationModal();
    }
});

function initUniversalFormHandlers() {
    function sanitize(str) {
        if (!str) return '';
        var temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    // Intercept Contact Forms
    document.querySelectorAll('form[action*="contact_us.php"]').forEach(function(form) {
        if (form.getAttribute('data-handled')) return;
        form.setAttribute('data-handled', 'true');

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            var submitBtn = form.querySelector('button[type="submit"]');
            var originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Send Now';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin" style="margin-right:8px;"></i> Sending Message...';
            }

            var formData = new FormData(form);
            formData.append('is_ajax', '1');

            var name = formData.get('contact_name') || 'Customer';
            var phone = formData.get('contact_phone') || formData.get('contact_email') || 'your contact number';

            try {
                var res = await fetch(form.action || 'contact_us.php', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                var data = {};
                try { data = await res.json(); } catch(err) { data = { success: res.ok }; }

                if (data.success !== false) {
                    form.reset();
                    showFormConfirmationModal({
                        title: 'Message Received Successfully!',
                        message: 'Thank you, <strong>' + sanitize(name) + '</strong>! We have received your inquiry.',
                        subtext: 'Our automotive parts specialist will review your message and contact you shortly at <strong>' + sanitize(phone) + '</strong>.',
                        callText: 'Call Now: +1 (888) 656-5933'
                    });
                } else {
                    alert(data.message || 'Sorry, there was an error processing your request. Please call us at +1-888-656-5933.');
                }
            } catch(err) {
                form.submit();
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }
        });
    });

    // Intercept Checkout Forms
    document.querySelectorAll('form[action*="checkout_process.php"]').forEach(function(form) {
        if (form.getAttribute('data-handled')) return;
        form.setAttribute('data-handled', 'true');

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            var submitBtn = form.querySelector('button[type="submit"]');
            var originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Proceed to Checkout';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin" style="margin-right:8px;"></i> Processing Order...';
            }

            var formData = new FormData(form);
            formData.append('is_ajax', '1');

            var name = formData.get('firstname') || 'Customer';
            var part = [formData.get('year'), formData.get('Make&model'), formData.get('product_type')].filter(Boolean).join(' ') || 'Requested Part';
            var phone = formData.get('phone_number') || formData.get('email') || 'your contact details';

            try {
                var res = await fetch(form.action || 'checkout_process.php', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                var data = {};
                try { data = await res.json(); } catch(err) { data = { success: res.ok }; }

                if (data.success !== false) {
                    form.reset();
                    showFormConfirmationModal({
                        title: 'Order Details Received!',
                        message: 'Thank you, <strong>' + sanitize(name) + '</strong>! We have received your order details for <strong>' + sanitize(part) + '</strong>.',
                        subtext: 'Our order desk is reviewing your vehicle details and will contact you shortly at <strong>' + sanitize(phone) + '</strong> to confirm processing & shipping.',
                        callText: 'Call Order Desk: +1 (888) 656-5933'
                    });
                } else {
                    alert(data.message || 'Sorry, there was an error processing your order. Please call us at +1-888-656-5933.');
                }
            } catch(err) {
                form.submit();
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }
        });
    });
}
