// Radix Sort Visualization

document.addEventListener('DOMContentLoaded', () => {
    const sortButton = document.getElementById('sort-button');
    if (sortButton) {
        sortButton.addEventListener('click', async () => {
            await radixSort();
        });
    }
});

async function radixSort() {
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
    
    // Find the number of digits in the largest number
    const maxDigits = Math.floor(Math.log10(maxValue)) + 1;
    
    updateComparisonInfo(`Starting Radix Sort with ${maxDigits} digit passes`);
    await sleep(500);
    
    // Do counting sort for every digit
    for (let digitPlace = 0; digitPlace < maxDigits; digitPlace++) {
        updateComparisonInfo(`Processing digits at 10^${digitPlace} place (${digitPlace === 0 ? 'ones' : digitPlace === 1 ? 'tens' : 'hundreds'})`);
        await sleep(500);
        
        // Create buckets (0-9)
        const buckets = Array.from({ length: 10 }, () => []);
        
        // Place numbers in buckets based on the current digit
        for (let i = 0; i < array.length; i++) {
            // Highlight the current element
            bars[i].classList.add('comparing');
            
            // Get the digit at the current place
            const digit = Math.floor(array[i] / Math.pow(10, digitPlace)) % 10;
            
            updateComparisonInfo(`Number ${array[i]} has digit ${digit} at ${digitPlace === 0 ? 'ones' : digitPlace === 1 ? 'tens' : 'hundreds'} place`);
            await sleep(500);
            
            // Add to the appropriate bucket
            buckets[digit].push(array[i]);
            
            // Change highlight to show it's being placed in a bucket
            bars[i].classList.remove('comparing');
            bars[i].classList.add('swapping');
            
            await sleep(300);
            
            // Remove highlight
            bars[i].classList.remove('swapping');
        }
        
        // Flatten the buckets back into the array
        let index = 0;
        for (let digit = 0; digit < 10; digit++) {
            for (let j = 0; j < buckets[digit].length; j++) {
                // Update the array
                array[index] = buckets[digit][j];
                
                // Highlight the element being placed back
                bars[index].classList.add('swapping');
                
                updateComparisonInfo(`Placing ${array[index]} back at position ${index}`);
                updateBar(index, array[index], maxValue);
                
                await sleep(300);
                
                // Remove highlight
                bars[index].classList.remove('swapping');
                
                index++;
            }
        }
        
        // Show the array after this digit pass
        updateComparisonInfo(`Completed pass for ${digitPlace === 0 ? 'ones' : digitPlace === 1 ? 'tens' : 'hundreds'} place`);
        await sleep(500);
    }
    
    // Mark all elements as sorted
    for (let i = 0; i < array.length; i++) {
        bars[i].classList.add('sorted');
        await sleep(100);
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