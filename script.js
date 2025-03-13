// Utility functions for sorting visualizations

// Generate a random array of 10 distinct numbers between 10 and 99
function generateRandomArray() {
    const numbers = [];
    while (numbers.length < 10) {
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
}

// Sleep function for animations
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

// Initialize the visualization on page load
document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('array-container');
    if (arrayContainer) {
        const randomArray = generateRandomArray();
        createArrayBars(randomArray, 'array-container');
        
        // Store the array in a data attribute for the sorting functions to use
        arrayContainer.dataset.array = JSON.stringify(randomArray);
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
        });
    }
}); 