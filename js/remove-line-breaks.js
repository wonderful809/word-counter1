// Remove Line Breaks Tool JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const removeBtn = document.getElementById('removeBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const radioButtons = document.querySelectorAll('input[name="breakOption"]');

    // Get selected option
    function getSelectedOption() {
        const selected = document.querySelector('input[name="breakOption"]:checked');
        return selected ? selected.value : 'space';
    }

    // Remove line breaks
    function removeLineBreaks() {
        const text = inputText.value;
        const option = getSelectedOption();
        
        if (text.trim() === '') {
            outputText.value = '';
            return;
        }

        let result;
        if (option === 'space') {
            // Replace line breaks with spaces
            result = text.replace(/\r?\n/g, ' ');
            // Clean up multiple spaces
            result = result.replace(/\s+/g, ' ').trim();
        } else {
            // Remove line breaks entirely
            result = text.replace(/\r?\n/g, '');
        }
        
        outputText.value = result;
    }

    // Copy to clipboard
    async function copyToClipboardHandler() {
        const text = outputText.value;
        if (text.trim() === '') {
            return;
        }
        await window.copyToClipboard(text, copyBtn);
    }

    // Clear all text
    function clearAll() {
        inputText.value = '';
        outputText.value = '';
        inputText.focus();
    }

    // Event listeners
    removeBtn.addEventListener('click', removeLineBreaks);
    removeBtn.setAttribute('data-primary-action', 'true');
    copyBtn.addEventListener('click', copyToClipboardHandler);
    copyBtn.setAttribute('data-copy-action', 'true');
    clearBtn.addEventListener('click', clearAll);
    
    // Auto-update when radio button changes
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            if (inputText.value.trim() !== '') {
                removeLineBreaks();
            }
        });
    });
});
