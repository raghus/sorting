# Sorting Algorithm Visualizer

A web-based application to help people visualize and understand how different sorting algorithms work through interactive animations.

## Features

- Visualize five popular sorting algorithms:
  - **Bubble Sort**: A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
  - **Quick Sort**: An efficient, divide-and-conquer sorting algorithm that works by selecting a 'pivot' element and partitioning the array around the pivot.
  - **Merge Sort**: A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.
  - **Insertion Sort**: A simple sorting algorithm that builds the final sorted array one item at a time, similar to how you might sort playing cards in your hand.
  - **Heap Sort**: A comparison-based sorting algorithm that uses a binary heap data structure to build a max-heap and then repeatedly extracts the maximum element.

- Interactive visualization with:
  - Random array generation (5 distinct numbers between 10 and 99)
  - Slow, step-by-step animation of the sorting process for easier understanding
  - Color-coded elements to show comparisons, swaps, and sorted positions
  - Informative descriptions of each algorithm's approach and complexity
  - Confetti celebration when sorting is complete

## How to Use

1. Open `index.html` in a web browser
2. Choose a sorting algorithm to visualize
3. Click the "Sort" button to start the visualization
4. Watch how the algorithm works through the animation
5. Enjoy the confetti celebration when the array is sorted
6. Click "Reset" to generate a new random array and try again

## Technologies Used

- HTML5
- CSS3 (with Manrope font from Google Fonts)
- JavaScript (ES6+)
- No external libraries or frameworks

## Project Structure

- `index.html` - Main page with links to individual algorithm pages
- `bubble.html`, `quick.html`, `merge.html`, `insertion.html`, `heap.html` - Individual algorithm visualization pages
- `styles.css` - Styling for the entire application
- `script.js` - Common JavaScript functions used across all visualizations
- `bubble.js`, `quick.js`, `merge.js`, `insertion.js`, `heap.js` - Algorithm-specific JavaScript files
- `confetti.js` - Confetti celebration animation

## Educational Purpose

This project is designed to help students and developers understand sorting algorithms through visual learning. By seeing the algorithms in action, users can gain a better intuition for how these fundamental computer science concepts work. 