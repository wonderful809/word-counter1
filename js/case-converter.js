// Case Converter Tool JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const upperCaseBtn = document.getElementById('upperCaseBtn');
    const lowerCaseBtn = document.getElementById('lowerCaseBtn');
    const titleCaseBtn = document.getElementById('titleCaseBtn');
    const sentenceCaseBtn = document.getElementById('sentenceCaseBtn');
    const toggleCaseBtn = document.getElementById('toggleCaseBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Convert to UPPERCASE
    function toUpperCase() {
        const text = inputText.value;
        outputText.value = text.toUpperCase();
    }

    // Convert to lowercase
    function toLowerCase() {
        const text = inputText.value;
        outputText.value = text.toLowerCase();
    }

    // Convert to Title Case
    function toTitleCase() {
        const text = inputText.value;
        const words = text.toLowerCase().split(' ');
        const titleCased = words.map(word => {
            if (word.length === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        outputText.value = titleCased.join(' ');
    }

    // Convert to Sentence case
    function toSentenceCase() {
        const text = inputText.value;
        const sentences = text.toLowerCase().split(/([.!?]+\s*)/);
        const sentenceCased = sentences.map((sentence, index) => {
            // Only capitalize actual sentences (not punctuation)
            if (index % 2 === 0 && sentence.length > 0) {
                return sentence.charAt(0).toUpperCase() + sentence.slice(1);
            }
            return sentence;
        });
        outputText.value = sentenceCased.join('');
    }

    // Toggle case (flip each character)
    function toggleCase() {
        const text = inputText.value;
        const toggled = text.split('').map(char => {
            if (char === char.toUpperCase()) {
                return char.toLowerCase();
            } else {
                return char.toUpperCase();
            }
        });
        outputText.value = toggled.join('');
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
    upperCaseBtn.addEventListener('click', toUpperCase);
    lowerCaseBtn.addEventListener('click', toLowerCase);
    titleCaseBtn.addEventListener('click', toTitleCase);
    sentenceCaseBtn.addEventListener('click', toSentenceCase);
    toggleCaseBtn.addEventListener('click', toggleCase);
    copyBtn.addEventListener('click', copyToClipboardHandler);
    copyBtn.setAttribute('data-copy-action', 'true');
    clearBtn.addEventListener('click', clearAll);
    
    // Set primary action
    upperCaseBtn.setAttribute('data-primary-action', 'true');
});
