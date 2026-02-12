// Text Formatter Tool JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const formatBtn = document.getElementById('formatBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    const trimWhitespaceCheckbox = document.getElementById('trimWhitespace');
    const removeExtraSpacesCheckbox = document.getElementById('removeExtraSpaces');
    const removeEmptyLinesCheckbox = document.getElementById('removeEmptyLines');
    const addLineNumbersCheckbox = document.getElementById('addLineNumbers');
    const sortAlphabeticallyCheckbox = document.getElementById('sortAlphabetically');

    // Format text based on selected options
    function formatText() {
        let text = inputText.value;
        
        if (text.trim() === '') {
            outputText.value = '';
            return;
        }

        // Split into lines for processing
        let lines = text.split('\n');

        // Trim whitespace from each line
        if (trimWhitespaceCheckbox.checked) {
            lines = lines.map(line => line.trim());
        }

        // Remove extra spaces from each line
        if (removeExtraSpacesCheckbox.checked) {
            lines = lines.map(line => line.replace(/\s+/g, ' ').trim());
        }

        // Remove empty lines
        if (removeEmptyLinesCheckbox.checked) {
            lines = lines.filter(line => line.length > 0);
        }

        // Sort lines alphabetically
        if (sortAlphabeticallyCheckbox.checked) {
            lines = lines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
        }

        // Add line numbers
        if (addLineNumbersCheckbox.checked) {
            lines = lines.map((line, index) => `${index + 1}. ${line}`);
        }

        // Join lines back together
        outputText.value = lines.join('\n');
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
        // Reset checkboxes
        trimWhitespaceCheckbox.checked = false;
        removeExtraSpacesCheckbox.checked = false;
        removeEmptyLinesCheckbox.checked = false;
        addLineNumbersCheckbox.checked = false;
        sortAlphabeticallyCheckbox.checked = false;
        inputText.focus();
    }

    // Event listeners
    formatBtn.addEventListener('click', formatText);
    formatBtn.setAttribute('data-primary-action', 'true');
    copyBtn.addEventListener('click', copyToClipboardHandler);
    copyBtn.setAttribute('data-copy-action', 'true');
    clearBtn.addEventListener('click', clearAll);
});
