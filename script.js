document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('practiceForm');
    const rangeInput = document.getElementById('experience');
    const rangeValue = document.getElementById('rangeValue');

    // Live update for the range/slider tool
    rangeInput.addEventListener('input', (e) => {
        rangeValue.textContent = e.target.value;
    });

    // Validation handler for individual inputs
    const validateInput = (input) => {
        const errorSpan = document.getElementById(`${input.id}Error`);
        
        // Skip range input as it inherently has a valid value
        if (input.type === 'range') return true;

        if (!input.validity.valid) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            
            // Set contextual custom error messages based on HTML5 validity states
            if (input.validity.valueMissing) {
                errorSpan.textContent = "This field is required.";
            } else if (input.validity.typeMismatch) {
                errorSpan.textContent = `Please enter a valid ${input.type}.`;
            } else if (input.validity.tooShort) {
                errorSpan.textContent = `Must be at least ${input.minLength} characters long.`;
            } else if (input.validity.patternMismatch) {
                errorSpan.textContent = "Format does not match the requested pattern.";
            }
            return false;
        } else {
            input.classList.remove('invalid');
            input.classList.add('valid');
            if (errorSpan) errorSpan.textContent = "";
            return true;
        }
    };

    // Attach real-time "blur" (loss of focus) validation to inputs
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        // Reset valid state on change if checkbox
        if (input.type === 'checkbox') {
            input.addEventListener('change', () => validateInput(input));
        }
    });

    // Form submission validation
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop standard page reload
        
        let isFormValid = true;

        // Force validation check across all inputs
        inputs.forEach(input => {
            const isValid = validateInput(input);
            if (!isValid) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            alert('🎉 Success! The form is correctly validated and ready for server processing.');
            form.reset();
            // Remove success classes after reset
            inputs.forEach(input => input.classList.remove('valid'));
            rangeValue.textContent = '5';
        } else {
            // Scroll to the first element with an error to improve user experience
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) firstInvalid.focus();
        }
    });
});