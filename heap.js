// Heap Sort Visualization

document.addEventListener('DOMContentLoaded', () => {
    const sortButton = document.getElementById('sort-button');
    if (sortButton) {
        sortButton.addEventListener('click', async () => {
            await heapSort();
        });
    }
});

async function heapSort() {
    // Disable buttons during sorting
    document.getElementById('sort-button').disabled = true;
    document.getElementById('reset-button').disabled = true;
    
    // Get the array from the data attribute
    const arrayContainer = document.getElementById('array-container');
    const array = JSON.parse(arrayContainer.dataset.array);
    const bars = document.querySelectorAll('.array-bar');
    const maxValue = Math.max(...array);
    
    const n = array.length;
    
    // Build max heap
    updateComparisonInfo('Building max heap...');
    await sleep(500);
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i, bars, maxValue);
    }
    
    updateComparisonInfo('Max heap built. Extracting elements...');
    await sleep(500);
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        bars[0].classList.add('pivot');
        bars[i].classList.add('swapping');
        
        updateComparisonInfo(`Moving max element ${array[0]} to position ${i}`);
        await sleep(500);
        
        // Swap
        const temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        
        // Update the visual representation
        updateBar(0, array[0], maxValue);
        updateBar(i, array[i], maxValue);
        
        await sleep(500);
        
        bars[0].classList.remove('pivot');
        bars[i].classList.remove('swapping');
        
        // Mark the element as sorted
        bars[i].classList.add('sorted');
        
        // Call heapify on the reduced heap
        await heapify(array, i, 0, bars, maxValue);
    }
    
    // Mark the first element as sorted
    bars[0].classList.add('sorted');
    
    // Update the array in the data attribute
    arrayContainer.dataset.array = JSON.stringify(array);
    
    updateComparisonInfo('Array sorted!');
    
    // Celebrate with confetti!
    celebrateSuccess();
    
    // Re-enable buttons
    document.getElementById('sort-button').disabled = false;
    document.getElementById('reset-button').disabled = false;
}

// Heapify a subtree rooted with node i
async function heapify(array, n, i, bars, maxValue) {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1; // Left child
    const right = 2 * i + 2; // Right child
    
    // Highlight the current root
    bars[i].classList.add('pivot');
    updateComparisonInfo(`Heapifying subtree with root at index ${i}`);
    await sleep(500);
    
    // If left child is larger than root
    if (left < n) {
        bars[left].classList.add('comparing');
        updateComparisonInfo(`Comparing ${array[left]} with ${array[largest]}`);
        await sleep(500);
        
        if (array[left] > array[largest]) {
            largest = left;
        }
        
        bars[left].classList.remove('comparing');
    }
    
    // If right child is larger than largest so far
    if (right < n) {
        bars[right].classList.add('comparing');
        updateComparisonInfo(`Comparing ${array[right]} with ${array[largest]}`);
        await sleep(500);
        
        if (array[right] > array[largest]) {
            largest = right;
        }
        
        bars[right].classList.remove('comparing');
    }
    
    // If largest is not root
    if (largest !== i) {
        bars[i].classList.remove('pivot');
        bars[i].classList.add('swapping');
        bars[largest].classList.add('swapping');
        
        updateComparisonInfo(`Swapping ${array[i]} and ${array[largest]}`);
        await sleep(500);
        
        // Swap
        const temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;
        
        // Update the visual representation
        updateBar(i, array[i], maxValue);
        updateBar(largest, array[largest], maxValue);
        
        await sleep(500);
        
        bars[i].classList.remove('swapping');
        bars[largest].classList.remove('swapping');
        
        // Recursively heapify the affected sub-tree
        await heapify(array, n, largest, bars, maxValue);
    } else {
        bars[i].classList.remove('pivot');
    }
} 