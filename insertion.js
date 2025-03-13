// Insertion Sort Visualization

document.addEventListener('DOMContentLoaded', () => {
    const sortButton = document.getElementById('sort-button');
    if (sortButton) {
        sortButton.addEventListener('click', async () => {
            await insertionSort();
        });
    }
});

async function insertionSort() {
    // Disable buttons during sorting
    const sortButton = document.getElementById('sort-button');
    const resetButton = document.getElementById('reset-button');
    
    sortButton.disabled = true;
    resetButton.disabled = true;
    
    // Get the array from the data attribute
    const arrayContainer = document.getElementById('array-container');
    const array = JSON.parse(arrayContainer.dataset.array);
    const bars = document.querySelectorAll('.array-bar');
    const maxValue = Math.max(...array);
    
    // Mark the first element as sorted
    bars[0].classList.add('sorted');
    updateComparisonInfo('First element is already sorted');
    await sleep(500);
    
    // Start from the second element
    for (let i = 1; i < array.length; i++) {
        // Current element to be inserted
        const key = array[i];
        
        // Highlight the current element being inserted
        bars[i].classList.add('comparing');
        updateComparisonInfo(`Inserting element ${key} into the sorted portion`);
        await sleep(500);
        
        // Find the position to insert the current element
        let j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && array[j] > key) {
            // Highlight element being compared and shifted
            bars[j].classList.add('swapping');
            updateComparisonInfo(`${array[j]} > ${key}, shifting ${array[j]} to the right`);
            await sleep(500);
            
            // Shift element to the right
            array[j + 1] = array[j];
            updateBar(j + 1, array[j + 1], maxValue);
            
            // Remove highlight after shifting
            bars[j].classList.remove('swapping');
            
            j--;
        }
        
        // Place the key in its correct position
        array[j + 1] = key;
        updateBar(j + 1, array[j + 1], maxValue);
        
        // Remove the comparing highlight
        bars[i].classList.remove('comparing');
        
        // Mark all elements up to current position as sorted
        for (let k = 0; k <= i; k++) {
            bars[k].classList.add('sorted');
        }
        
        updateComparisonInfo(`Inserted ${key} at position ${j + 1}`);
        await sleep(500);
    }
    
    // Update the array in the data attribute
    arrayContainer.dataset.array = JSON.stringify(array);
    
    // Show success message with highlight effect
    updateComparisonInfo('Array sorted!');
    
    // Wait for the highlight animation to complete before showing confetti
    await sleep(1000);
    
    // Celebrate with confetti!
    celebrateSuccess();
    
    // Re-enable buttons
    sortButton.disabled = false;
    resetButton.disabled = false;
} 