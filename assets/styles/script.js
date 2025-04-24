

// const textElement = document.querySelector(".container-text");

// // Set a variable to track how much the user has "scrolled"
// let scrollAmount = 0;

// // Set a smoother scroll threshold
// const scrollSensitivity = 1;  // Higher value = faster, lower value = slower

// // Listen to the wheel event (mouse wheel or trackpad)
// window.addEventListener('wheel', (event) => {
//     // Adjust scroll amount for smoother, faster effect
//     if (event.deltaY > 0) {  // Scrolling down
//         scrollAmount += scrollSensitivity;   // Increase scroll amount faster
//     } else if (event.deltaY < 0) {  // Scrolling up
//         scrollAmount -= scrollSensitivity;   // Decrease scroll amount faster
//     }

//     // Set the fade threshold value
//     const fadeThreshold = 5; // When to start fading out or in (lower this to make it happen sooner)

//     // If scrolling down and passing the threshold, start fading out
//     if (scrollAmount > fadeThreshold) {
//         textElement.classList.add("fade-out");  // Fade out
//     } else if (scrollAmount <= 0) {
//         // If the scroll amount goes back to 0 or less, stop fading out
//         textElement.classList.remove("fade-out");  // Fade in (back to original state)
//     }

//     // Prevent default scroll behavior to stop the page from scrolling
//     event.preventDefault();
// }, { passive: false });

const textElement = document.querySelector(".container-text");
const cityContainer = document.querySelector(".city-container");

// Set a variable to track how much the user has "scrolled"
let scrollAmount = 0;

// Set a smoother scroll threshold
const scrollSensitivity = 1;  // Higher value = faster, lower value = slower

// Set a fade threshold value
const fadeThreshold = 5; // When to start fading out or in (lower this to make it happen sooner)

// Listen to the wheel event (mouse wheel or trackpad)
window.addEventListener('wheel', (event) => {
    // Adjust scroll amount for smoother, faster effect
    if (event.deltaY > 0) {  // Scrolling down
        scrollAmount += scrollSensitivity;   // Increase scroll amount faster
    } else if (event.deltaY < 0) {  // Scrolling up
        scrollAmount -= scrollSensitivity;   // Decrease scroll amount faster
    }

    // If scrolling down and passing the threshold, start fading out
    if (scrollAmount > fadeThreshold) {
        textElement.classList.add("fade-out");  // Fade out
        cityContainer.classList.add("visible");  // Show city content
    } else if (scrollAmount <= 0) {
        // If the scroll amount goes back to 0 or less, stop fading out and hide city content
        textElement.classList.remove("fade-out");  // Fade in (back to original state)
        cityContainer.classList.remove("visible");  // Hide city content
    }

    // Prevent default scroll behavior to stop the page from scrolling
    event.preventDefault();
}, { passive: false });


