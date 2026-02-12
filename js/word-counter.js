// Word Counter Tool JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const clearBtn = document.getElementById('clearBtn');
    const wordCountEl = document.getElementById('wordCount');
    const charCountWithSpacesEl = document.getElementById('charCountWithSpaces');
    const charCountNoSpacesEl = document.getElementById('charCountNoSpaces');
    const sentenceCountEl = document.getElementById('sentenceCount');
    const paragraphCountEl = document.getElementById('paragraphCount');
    const readingTimeEl = document.getElementById('readingTime');

    // Update counts in real-time
    function updateCounts() {
        const text = textInput.value;
        
        // Word count
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = text.trim().length === 0 ? 0 : words.length;
        
        // Character counts
        const charCountWithSpaces = text.length;
        const charCountNoSpaces = text.replace(/\s/g, '').length;
        
        // Sentence count
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        const sentenceCount = sentences.length;
        
        // Paragraph count
        const paragraphs = text.split(/\n+/).filter(para => para.trim().length > 0);
        const paragraphCount = paragraphs.length;
        
        // Reading time (assuming 200 words per minute)
        const readingTimeMinutes = Math.ceil(wordCount / 200);
        const readingTime = readingTimeMinutes === 0 ? '0 min' : 
                           readingTimeMinutes === 1 ? '1 min' : 
                           `${readingTimeMinutes} min`;
        
        // Update DOM
        wordCountEl.textContent = wordCount;
        charCountWithSpacesEl.textContent = charCountWithSpaces;
        charCountNoSpacesEl.textContent = charCountNoSpaces;
        sentenceCountEl.textContent = sentenceCount;
        paragraphCountEl.textContent = paragraphCount;
        readingTimeEl.textContent = readingTime;
    }

    // Clear button handler
    function clearText() {
        textInput.value = '';
        updateCounts();
        textInput.focus();
    }

    // Event listeners
    textInput.addEventListener('input', updateCounts);
    clearBtn.addEventListener('click', clearText);

    // Initialize counts
    updateCounts();
});
