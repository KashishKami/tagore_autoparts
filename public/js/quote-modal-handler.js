/**
 * Tagore Auto Parts - Quote Lead Form AJAX & Modal UX Handler
 */
document.addEventListener('DOMContentLoaded', function () {
    const quoteForms = document.querySelectorAll('.hero-quote-form, form[action*="leads-form.php"]');
    
    quoteForms.forEach(form => {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Get Free Quote';
            
            // Client-side validation
            const requiredFields = form.querySelectorAll('[required]');
            let hasError = false;
            
            requiredFields.forEach(field => {
                if (field.type === 'checkbox') {
                    if (!field.checked) {
                        hasError = true;
                        field.classList.add('field-invalid');
                    } else {
                        field.classList.remove('field-invalid');
                    }
                } else {
                    if (!field.value || !field.value.trim()) {
                        hasError = true;
                        field.classList.add('field-invalid');
                    } else {
                        field.classList.remove('field-invalid');
                    }
                }
            });
            
            if (hasError) {
                alert('Please fill out all required fields and accept the privacy agreement.');
                return;
            }
            
            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin" style="margin-right:8px;"></i> Checking Inventory & Submitting...';
            }
            
            const formData = new FormData(form);
            formData.append('is_ajax', '1');
            
            try {
                const response = await fetch(form.action || 'leads-form.php', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                let result = {};
                try {
                    result = await response.json();
                } catch (parseErr) {
                    result = {
                        success: response.ok,
                        message: response.ok ? 'Quote request received successfully!' : 'An unexpected error occurred.'
                    };
                }
                
                if (result.success) {
                    // Extract user details to personalize the modal
                    const year = formData.get('year') || '';
                    const make = formData.get('make') || '';
                    const model = formData.get('model') || '';
                    const makeModel = formData.get('make_model') || `${make} ${model}`.trim();
                    const part = formData.get('part') || 'Auto Part';
                    const phone = formData.get('phone') || '';
                    
                    const partDisplay = [year, makeModel, part].filter(Boolean).join(' ');
                    
                    const vehiclePartEl = document.getElementById('modal-vehicle-part');
                    const phoneEl = document.getElementById('modal-phone-display');
                    
                    if (vehiclePartEl) {
                        vehiclePartEl.textContent = partDisplay || 'Requested Part';
                    }
                    if (phoneEl) {
                        phoneEl.textContent = phone || 'your phone number';
                    }
                    
                    // Display success modal
                    showQuoteSuccessModal();
                    
                    // Reset form
                    form.reset();
                } else {
                    alert(result.message || 'Sorry, there was an issue processing your request. Please call us directly at +1-888-656-5933.');
                }
            } catch (networkErr) {
                console.error('Lead submission network error:', networkErr);
                // Graceful fallback modal
                showQuoteSuccessModal();
                form.reset();
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }
        });
    });
});

function showQuoteSuccessModal() {
    const modal = document.getElementById('quote-success-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeQuoteModal() {
    const modal = document.getElementById('quote-success-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close on backdrop click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('quote-success-modal');
    if (modal && e.target === modal) {
        closeQuoteModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeQuoteModal();
    }
});
