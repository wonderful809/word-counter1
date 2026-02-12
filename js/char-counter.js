// Character Counter Tool JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const clearBtn = document.getElementById('clearBtn');
    const totalCharsEl = document.getElementById('totalChars');
    const charsNoSpacesEl = document.getElementById('charsNoSpaces');
    const wordCountEl = document.getElementById('wordCount');
    const sentenceCountEl = document.getElementById('sentenceCount');
    const twitterCountEl = document.getElementById('twitterCount');
    const twitterProgressEl = document.getElementById('twitterProgress');
    const instagramCountEl = document.getElementById('instagramCount');
    const instagramProgressEl = document.getElementById('instagramProgress');

    const TWITTER_LIMIT = 280;
    const INSTAGRAM_LIMIT = 2200;

    // Update counts and progress bars in real-time
    function updateCounts() {
        const text = textInput.value;
        
        // Character counts
        const totalChars = text.length;
        const charsNoSpaces = text.replace(/\s/g, '').length;
        
        // Word count
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = text.trim().length === 0 ? 0 : words.length;
        
        // Sentence count
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        const sentenceCount = sentences.length;
        
        // Update basic stats
        totalCharsEl.textContent = totalChars;
        charsNoSpacesEl.textContent = charsNoSpaces;
        wordCountEl.textContent = wordCount;
        sentenceCountEl.textContent = sentenceCount;
        
        // Twitter progress
        const twitterPercent = Math.min((totalChars / TWITTER_LIMIT) * 100, 100);
        twitterCountEl.textContent = `${totalChars} / ${TWITTER_LIMIT}`;
        twitterProgressEl.style.width = `${twitterPercent}%`;
        
        // Update Twitter progress bar color
        twitterProgressEl.classList.remove('warning', 'danger');
        if (totalChars > TWITTER_LIMIT) {
            twitterProgressEl.classList.add('danger');
        } else if (totalChars > TWITTER_LIMIT * 0.9) {
            twitterProgressEl.classList.add('warning');
        }
        
        // Instagram progress
        const instagramPercent = Math.min((totalChars / INSTAGRAM_LIMIT) * 100, 100);
        instagramCountEl.textContent = `${totalChars} / ${INSTAGRAM_LIMIT}`;
        instagramProgressEl.style.width = `${instagramPercent}%`;
        
        // Update Instagram progress bar color
        instagramProgressEl.classList.remove('warning', 'danger');
        if (totalChars > INSTAGRAM_LIMIT) {
            instagramProgressEl.classList.add('danger');
        } else if (totalChars > INSTAGRAM_LIMIT * 0.9) {
            instagramProgressEl.classList.add('warning');
        }
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
