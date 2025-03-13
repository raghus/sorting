// Bubble Sort Visualization

document.addEventListener('DOMContentLoaded', () => {
    const sortButton = document.getElementById('sort-button');
    if (sortButton) {
        sortButton.addEventListener('click', async () => {
            await bubbleSort();
        });
    }
});

async function bubbleSort() {
    // Disable buttons during sorting
    document.getElementById('sort-button').disabled = true;
    document.getElementById('reset-button').disabled = true;
    
    // Get the array from the data attribute
    const arrayContainer = document.getElementById('array-container');
    const array = JSON.parse(arrayContainer.dataset.array);
    const bars = document.querySelectorAll('.array-bar');
    const maxValue = Math.max(...array);
    
    let swapped;
    
    // Outer loop for passes
    for (let i = 0; i < array.length; i++) {
        swapped = false;
        
        // Inner loop for comparisons in each pass
        for (let j = 0; j < array.length - i - 1; j++) {
            // Highlight elements being compared
            bars[j].classList.add('comparing');
            bars[j + 1].classList.add('comparing');
            
            updateComparisonInfo(`Comparing ${array[j]} and ${array[j + 1]}`);
            await sleep(500); // Pause to show comparison
            
            // If elements are in wrong order, swap them
            if (array[j] > array[j + 1]) {
                // Highlight elements being swapped
                bars[j].classList.remove('comparing');
                bars[j + 1].classList.remove('comparing');
                bars[j].classList.add('swapping');
                bars[j + 1].classList.add('swapping');
                
                updateComparisonInfo(`Swapping ${array[j]} and ${array[j + 1]}`);
                await sleep(500); // Pause to show swapping
                
                // Perform the swap
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                
                // Update the visual representation
                updateBar(j, array[j], maxValue);
                updateBar(j + 1, array[j + 1], maxValue);
                
                swapped = true;
                await sleep(500); // Pause after swap
                
                // Remove swapping highlight
                bars[j].classList.remove('swapping');
                bars[j + 1].classList.remove('swapping');
            } else {
                // Remove comparing highlight if no swap needed
                bars[j].classList.remove('comparing');
                bars[j + 1].classList.remove('comparing');
            }
        }
        
        // Mark the last element of this pass as sorted
        bars[array.length - i - 1].classList.add('sorted');
        
        // If no swaps were made in a pass, the array is sorted
        if (!swapped) {
            // Mark all remaining elements as sorted
            for (let k = 0; k < array.length - i - 1; k++) {
                bars[k].classList.add('sorted');
            }
            break;
        }
    }
    
    // Update the array in the data attribute
    arrayContainer.dataset.array = JSON.stringify(array);
    
    updateComparisonInfo('Array sorted!');
    
    // Re-enable buttons
    document.getElementById('sort-button').disabled = false;
    document.getElementById('reset-button').disabled = false;
} 