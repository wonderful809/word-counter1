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

    // Store previous values for animation
    let prevValues = {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0
    };

    // Animate number change
    function animateValue(element, start, end, duration = 300) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        element.classList.add('updating');
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
                setTimeout(() => element.classList.remove('updating'), 300);
            }
            element.textContent = Math.round(current);
        }, 16);
    }

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
        
        // Animate updates
        if (prevValues.words !== wordCount) {
            animateValue(wordCountEl, prevValues.words, wordCount);
            prevValues.words = wordCount;
        }
        if (prevValues.charsWithSpaces !== charCountWithSpaces) {
            animateValue(charCountWithSpacesEl, prevValues.charsWithSpaces, charCountWithSpaces);
            prevValues.charsWithSpaces = charCountWithSpaces;
        }
        if (prevValues.charsNoSpaces !== charCountNoSpaces) {
            animateValue(charCountNoSpacesEl, prevValues.charsNoSpaces, charCountNoSpaces);
            prevValues.charsNoSpaces = charCountNoSpaces;
        }
        if (prevValues.sentences !== sentenceCount) {
            animateValue(sentenceCountEl, prevValues.sentences, sentenceCount);
            prevValues.sentences = sentenceCount;
        }
        if (prevValues.paragraphs !== paragraphCount) {
            animateValue(paragraphCountEl, prevValues.paragraphs, paragraphCount);
            prevValues.paragraphs = paragraphCount;
        }
        
        // Update reading time (no animation)
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
