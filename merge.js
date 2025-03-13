// Merge Sort Visualization

document.addEventListener('DOMContentLoaded', () => {
    const sortButton = document.getElementById('sort-button');
    if (sortButton) {
        sortButton.addEventListener('click', async () => {
            await startMergeSort();
        });
    }
});

async function startMergeSort() {
    // Disable buttons during sorting
    document.getElementById('sort-button').disabled = true;
    document.getElementById('reset-button').disabled = true;
    
    // Get the array from the data attribute
    const arrayContainer = document.getElementById('array-container');
    const array = JSON.parse(arrayContainer.dataset.array);
    const maxValue = Math.max(...array);
    
    // Create a copy of the array for visualization
    const auxArray = [...array];
    
    // Start the merge sort
    await mergeSort(array, 0, array.length - 1, auxArray, maxValue);
    
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

async function mergeSort(array, left, right, auxArray, maxValue) {
    if (left < right) {
        // Find the middle point
        const mid = Math.floor((left + right) / 2);
        
        // Update comparison info
        updateComparisonInfo(`Dividing array from index ${left} to ${right}`);
        await sleep(500);
        
        // Sort first and second halves
        await mergeSort(array, left, mid, auxArray, maxValue);
        await mergeSort(array, mid + 1, right, auxArray, maxValue);
        
        // Merge the sorted halves
        await merge(array, left, mid, right, auxArray, maxValue);
    }
}

async function merge(array, left, mid, right, auxArray, maxValue) {
    const bars = document.querySelectorAll('.array-bar');
    
    // Update comparison info
    updateComparisonInfo(`Merging subarrays from index ${left} to ${mid} and ${mid + 1} to ${right}`);
    await sleep(500);
    
    // Copy data to auxiliary arrays
    for (let i = left; i <= right; i++) {
        auxArray[i] = array[i];
    }
    
    let i = left; // Initial index of first subarray
    let j = mid + 1; // Initial index of second subarray
    let k = left; // Initial index of merged subarray
    
    // Merge the subarrays
    while (i <= mid && j <= right) {
        // Highlight elements being compared
        bars[i].classList.add('comparing');
        bars[j].classList.add('comparing');
        
        updateComparisonInfo(`Comparing ${auxArray[i]} and ${auxArray[j]}`);
        await sleep(500);
        
        if (auxArray[i] <= auxArray[j]) {
            // Highlight element being placed in the merged array
            bars[i].classList.remove('comparing');
            bars[i].classList.add('swapping');
            
            updateComparisonInfo(`Placing ${auxArray[i]} at position ${k}`);
            await sleep(500);
            
            array[k] = auxArray[i];
            updateBar(k, array[k], maxValue);
            
            bars[i].classList.remove('swapping');
            i++;
        } else {
            // Highlight element being placed in the merged array
            bars[j].classList.remove('comparing');
            bars[j].classList.add('swapping');
            
            updateComparisonInfo(`Placing ${auxArray[j]} at position ${k}`);
            await sleep(500);
            
            array[k] = auxArray[j];
            updateBar(k, array[k], maxValue);
            
            bars[j].classList.remove('swapping');
            j++;
        }
        
        // Remove comparing highlight from remaining element
        if (i <= mid) bars[i].classList.remove('comparing');
        if (j <= right) bars[j].classList.remove('comparing');
        
        k++;
    }
    
    // Copy the remaining elements of left subarray, if any
    while (i <= mid) {
        bars[i].classList.add('swapping');
        
        updateComparisonInfo(`Placing remaining element ${auxArray[i]} at position ${k}`);
        await sleep(500);
        
        array[k] = auxArray[i];
        updateBar(k, array[k], maxValue);
        
        bars[i].classList.remove('swapping');
        i++;
        k++;
    }
    
    // Copy the remaining elements of right subarray, if any
    while (j <= right) {
        bars[j].classList.add('swapping');
        
        updateComparisonInfo(`Placing remaining element ${auxArray[j]} at position ${k}`);
        await sleep(500);
        
        array[k] = auxArray[j];
        updateBar(k, array[k], maxValue);
        
        bars[j].classList.remove('swapping');
        j++;
        k++;
    }
    
    // Mark the merged section as partially sorted
    for (let i = left; i <= right; i++) {
        bars[i].classList.add('sorted');
        await sleep(50);
    }
} 