// Utility functions for sorting visualizations

// Generate a random array of 5 distinct numbers between 10 and 99
function generateRandomArray() {
    const numbers = [];
    while (numbers.length < 5) {
        const randomNum = Math.floor(Math.random() * 90) + 10; // 10-99
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }
    return numbers;
}

// Create array bars in the container
function createArrayBars(array, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    const maxValue = Math.max(...array);
    const scaleFactor = 250 / maxValue; // Scale to fit in container height
    
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${value * scaleFactor}px`;
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'value';
        valueLabel.textContent = value;
        
        bar.appendChild(valueLabel);
        container.appendChild(bar);
    });
}

// Update the comparison info text
function updateComparisonInfo(text) {
    const comparisonInfo = document.getElementById('comparison-info');
    comparisonInfo.textContent = text;
    
    // If the text indicates sorting is complete, apply the success highlight
    if (text === 'Array sorted!') {
        highlightSortingSuccess();
    }
}

// Apply success highlight effect to the comparison info
function highlightSortingSuccess() {
    const comparisonInfo = document.getElementById('comparison-info');
    comparisonInfo.classList.add('success-highlight');
    
    // Remove the class after the animation completes
    setTimeout(() => {
        comparisonInfo.classList.remove('success-highlight');
    }, 2000); // Match the animation duration in CSS
}

// Sleep function for animations - increased duration for slower animation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 2)); // Doubled the sleep time
}

// Reset all bar colors
function resetBarColors() {
    const bars = document.querySelectorAll('.array-bar');
    bars.forEach(bar => {
        bar.className = 'array-bar';
    });
}

// Update a specific bar's height and value
function updateBar(index, value, maxValue) {
    const bars = document.querySelectorAll('.array-bar');
    const scaleFactor = 250 / maxValue;
    
    bars[index].style.height = `${value * scaleFactor}px`;
    bars[index].querySelector('.value').textContent = value;
}

// Track events with Vercel Analytics
function trackEvent(eventName, properties = {}) {
    if (window.va) {
        window.va('event', {
            name: eventName,
            ...properties
        });
    }
}

// Initialize the visualization on page load
document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('array-container');
    if (arrayContainer) {
        const randomArray = generateRandomArray();
        createArrayBars(randomArray, 'array-container');
        
        // Store the array in a data attribute for the sorting functions to use
        arrayContainer.dataset.array = JSON.stringify(randomArray);
        
        // Track page view with algorithm type
        const pageTitle = document.title;
        const algorithmType = pageTitle.split(' ')[0]; // Extract algorithm name from title
        if (algorithmType && algorithmType !== 'Sorting') {
            trackEvent('page_view', { algorithm: algorithmType });
        }
    }
    
    // Add event listener to the reset button if it exists
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            const randomArray = generateRandomArray();
            createArrayBars(randomArray, 'array-container');
            arrayContainer.dataset.array = JSON.stringify(randomArray);
            resetBarColors();
            updateComparisonInfo('');
            
            // Track reset event
            const pageTitle = document.title;
            const algorithmType = pageTitle.split(' ')[0];
            trackEvent('reset_array', { algorithm: algorithmType });
        });
    }
    
    // Add event tracking to sort button
    const sortButton = document.getElementById('sort-button');
    if (sortButton) {
        // We'll use the original click handler, but add tracking
        const originalClickHandlers = sortButton.onclick;
        sortButton.addEventListener('click', () => {
            const pageTitle = document.title;
            const algorithmType = pageTitle.split(' ')[0];
            trackEvent('start_sort', { algorithm: algorithmType });
        });
    }
}); 