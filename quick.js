// Quick Sort Visualization

document.addEventListener('DOMContentLoaded', () => {
    const sortButton = document.getElementById('sort-button');
    if (sortButton) {
        sortButton.addEventListener('click', async () => {
            await startQuickSort();
        });
    }
});

async function startQuickSort() {
    // Disable buttons during sorting
    document.getElementById('sort-button').disabled = true;
    document.getElementById('reset-button').disabled = true;
    
    // Get the array from the data attribute
    const arrayContainer = document.getElementById('array-container');
    const array = JSON.parse(arrayContainer.dataset.array);
    const maxValue = Math.max(...array);
    
    // Start the quick sort
    await quickSort(array, 0, array.length - 1, maxValue);
    
    // Mark all elements as sorted when done
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.add('sorted');
    }
    
    // Update the array in the data attribute
    arrayContainer.dataset.array = JSON.stringify(array);
    
    updateComparisonInfo('Array sorted!');
    
    // Celebrate with confetti!
    celebrateSuccess();
    
    // Re-enable buttons
    document.getElementById('sort-button').disabled = false;
    document.getElementById('reset-button').disabled = false;
}

async function quickSort(array, low, high, maxValue) {
    if (low < high) {
        // Partition the array and get the pivot index
        const pivotIndex = await partition(array, low, high, maxValue);
        
        // Recursively sort the sub-arrays
        await quickSort(array, low, pivotIndex - 1, maxValue);
        await quickSort(array, pivotIndex + 1, high, maxValue);
    }
}

async function partition(array, low, high, maxValue) {
    const bars = document.querySelectorAll('.array-bar');
    
    // Choose the rightmost element as pivot
    const pivot = array[high];
    
    // Highlight the pivot element
    bars[high].classList.add('pivot');
    updateComparisonInfo(`Pivot: ${pivot}`);
    await sleep(500);
    
    // Index of smaller element
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        // Highlight current element being compared
        bars[j].classList.add('comparing');
        updateComparisonInfo(`Comparing ${array[j]} with pivot ${pivot}`);
        await sleep(500);
        
        // If current element is smaller than the pivot
        if (array[j] < pivot) {
            i++;
            
            // Swap array[i] and array[j]
            if (i !== j) {
                bars[i].classList.add('swapping');
                bars[j].classList.add('swapping');
                updateComparisonInfo(`Swapping ${array[i]} and ${array[j]}`);
                await sleep(500);
                
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                
                // Update the visual representation
                updateBar(i, array[i], maxValue);
                updateBar(j, array[j], maxValue);
                
                await sleep(500);
                
                bars[i].classList.remove('swapping');
                bars[j].classList.remove('swapping');
            }
        }
        
        bars[j].classList.remove('comparing');
    }
    
    // Swap array[i+1] and array[high] (the pivot)
    i++;
    if (i !== high) {
        bars[i].classList.add('swapping');
        bars[high].classList.add('swapping');
        updateComparisonInfo(`Placing pivot ${pivot} at position ${i}`);
        await sleep(500);
        
        const temp = array[i];
        array[i] = array[high];
        array[high] = temp;
        
        // Update the visual representation
        updateBar(i, array[i], maxValue);
        updateBar(high, array[high], maxValue);
        
        await sleep(500);
        
        bars[i].classList.remove('swapping');
        bars[high].classList.remove('swapping');
    }
    
    // Remove pivot highlight
    bars[high].classList.remove('pivot');
    
    // Mark the pivot element as sorted
    bars[i].classList.add('sorted');
    
    return i; // Return the pivot index
} 