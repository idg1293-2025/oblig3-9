
/* Mona new scripts with trigger animations */
var perspective = 1000,
  zSpacing = -155,
  zVals = [],
  $frames = $(".tree"),
  frames = $frames.toArray(),
  scrollMsg = document.getElementById("instructions-overlay"),
  numFrames = $frames.length,
  switchPoint = 1800, // Z movement stops here
  isUnlocked = false; // <<< NEW: Lock until user clicks

let lastScrollY = window.scrollY;

// ==ANIMATIONS!==
window.addEventListener('scroll', function () {
  const currentScrollY = window.scrollY;

  const cutTree = document.getElementById('cut-tree-animation');
  const flowerParts = document.querySelectorAll('#flower .petal, #flower .stem, #flower .leaf, #flower .center');
  const hill = document.querySelectorAll('#hill .hill--brown')
  const footballField = document.querySelectorAll('#footballfield .football_1, #footballfield .football_2, #footballfield .football_3, #footballfield .football_4')

  // === Tree animation trigger ===
  if (currentScrollY > 1700 && lastScrollY <= 1800) {
    cutTree.classList.add('start-animation');
  } else if (currentScrollY < 1000 && lastScrollY >= 1000) {
    cutTree.classList.remove('start-animation');
  }

  // === Flower animation trigger ===
  if (currentScrollY > 2200 && lastScrollY <= 2200) {
    flowerParts.forEach(part => {
      part.classList.add('start-animation');
    });
  } else if (currentScrollY < 2200 && lastScrollY >= 2200) {
    flowerParts.forEach(part => {
      part.classList.remove('start-animation');
    });
  }

  // === Hill animation trigger ===
  if (currentScrollY > 2200 && lastScrollY <= 2200) {
    hill.forEach(part => {
      part.classList.add('start-animation');
    });
  } else if (currentScrollY < 2200 && lastScrollY >= 2200) {
    hill.forEach(part => {
      part.classList.remove('start-animation');
    });
  }

  // === footballfield animation trigger ===
  if (currentScrollY > 2200 && lastScrollY <= 2200) {
    footballField.forEach(part => {
      part.classList.add('start-animation');
    });
  } else if (currentScrollY < 2200 && lastScrollY >= 2200) {
    footballField.forEach(part => {
      part.classList.remove('start-animation');
    });
  }
  lastScrollY = currentScrollY;
});


// Setup initial Z positions
for (var i = 0; i < numFrames; i++) {
  zVals.push((numFrames - i) * zSpacing);
}

// Listen for click to unlock
document.querySelector(".container-text").addEventListener("click", function () {
  isUnlocked = true;
});

$(window).scroll(function () {
  var yOffset = window.pageYOffset;

  const fadeStart = 300;   // When fading starts
  const fadeEnd = 600;     // When fading fully completes

  const textElement = document.querySelector(".container-text");
  const cityContainer = document.querySelector(".city-container");

  if (textElement && cityContainer) {
    if (isUnlocked) {
      if (yOffset > fadeStart) {
        textElement.classList.add("fade-out");
        cityContainer.classList.add("visible");
      } else {
        textElement.classList.remove("fade-out");
        cityContainer.classList.remove("visible");
      }
    } else {
      // Before unlocked: always show text, hide city
      textElement.classList.remove("fade-out");
      cityContainer.classList.remove("visible");
    }
  }

  // === Main 3D scroll logic ===
  for (var i = 0; i < numFrames; i++) {
    var frame = frames[i];

    var baseX = parseFloat(frame.dataset.x) || 0;
    var y = frame.dataset.y === "center"
      ? window.innerHeight / 2
      : parseFloat(frame.dataset.y) || 0;

    var cameraZ = 0;
    var cameraX = 0;

    if (yOffset < switchPoint) {
      cameraZ = yOffset;
      cameraX = 0;
    } else {
      cameraZ = switchPoint;
      cameraX = (yOffset - switchPoint) * -1;
    }

    var frameZ = zVals[i] + cameraZ;

    var transform = `translate3d(${cameraX}px, ${y}px, ${frameZ}px)`,
      opacity = frameZ < 50 ? 1 : 1 - Math.min(((frameZ - 100) / (perspective - 100)), 1),
      display = frameZ > perspective ? "none" : "block";

    frame.style.transform = transform;
    frame.style.webkitTransform = transform;
    frame.style.mozTransform = transform;
    frame.style.opacity = opacity;
    frame.style.display = display;
  }

  if (scrollMsg && yOffset > 200) {
    scrollMsg.parentNode.removeChild(scrollMsg);
    scrollMsg = null;
  }

  if (yOffset > switchPoint) {
    var offsetX = (yOffset - switchPoint);
    $('.horizontal-scroll, .horizontal-2, .horizontal-3').css('transform', 'translateX(' + (-offsetX) + 'px)');
  } else {
    $('.horizontal- .horizontal-2, .horizontal-3').css('transform', 'translateX(0)');
  }
});

//MONA ORGINALT SCRIPT

// var perspective = 1000,
//     zSpacing = -155,
//     zVals = [],
//     $frames = $(".tree"),
//     frames = $frames.toArray(),
//     scrollMsg = document.getElementById("instructions-overlay"),
//     numFrames = $frames.length,
//     switchPoint = 1800; // Z movement stops here

// // Setup initial Z positions
// for (var i = 0; i < numFrames; i++) {
//   zVals.push((numFrames - i) * zSpacing);
// }

// $(window).scroll(function () {
//   var yOffset = window.pageYOffset;

//   // Loop through each frame and update Z/X/Y
//   for (var i = 0; i < numFrames; i++) {
//     var frame = frames[i];

//     // Get the base X and Y positions from data attributes
//     var baseX = parseFloat(frame.dataset.x) || 0;
//     var y = frame.dataset.y === "center"
//       ? window.innerHeight / 2
//       : parseFloat(frame.dataset.y) || 0;

//     // Initialize Z and X based on the scroll position
//     var cameraZ = 0;
//     var cameraX = 0;

//     // Z-scroll before switchPoint
//     if (yOffset < switchPoint) {
//       cameraZ = yOffset;  
//       cameraX = 0; 
//     } else {
//       cameraZ = switchPoint;  
//       cameraX = (yOffset - switchPoint) * -1; 
//     }

//     // Calculate final Z value for each frame
//     var frameZ = zVals[i] + cameraZ;

//     // Apply the calculated X, Y, Z values as a transform
//     var transform = `translate3d(${cameraX}px, ${y}px, ${frameZ}px)`,
//         opacity = frameZ < 50 ? 1 : 1 - Math.min(((frameZ - 100) / (perspective - 100)), 1),
//         display = frameZ > perspective ? "none" : "block";

//     frame.style.transform = transform;
//     frame.style.webkitTransform = transform;
//     frame.style.mozTransform = transform;
//     frame.style.opacity = opacity;
//     frame.style.display = display;
//   }

//   // Remove scroll message if the user has scrolled far enough
//   if (scrollMsg && yOffset > 200) {
//     scrollMsg.parentNode.removeChild(scrollMsg);
//     scrollMsg = null;
//   }

//   // Horizontal movement of the main container
//   if (yOffset > switchPoint) {
//     var offsetX = (yOffset - switchPoint);
//     $('.horizontal-scroll').css('transform', 'translateX(' + (-offsetX) + 'px)');
//   } else {
//     $('.horizontal-scroll').css('transform', 'translateX(0)');
//   }
// });

//VILDE SCRIPT TEST 1
/*var perspective = 1000,
    zSpacing = -155,
    zVals = [],
    $frames = $(".tree"),
    frames = $frames.toArray(),
    scrollMsg = document.getElementById("instructions-overlay"),
    numFrames = $frames.length,
    switchPoint = 1800, // Z movement stops here
    isUnlocked = false; // <<< NEW: Lock until user clicks

// Setup initial Z positions
for (var i = 0; i < numFrames; i++) {
  zVals.push((numFrames - i) * zSpacing);
}

// Listen for click to unlock
document.querySelector(".container-text").addEventListener("click", function() {
  isUnlocked = true;
});

$(window).scroll(function () {
  var yOffset = window.pageYOffset;

  const fadeStart = 300;   // When fading starts
  const fadeEnd = 600;     // When fading fully completes

  const textElement = document.querySelector(".container-text");
  const cityContainer = document.querySelector(".city-container");

  if (textElement && cityContainer) {
    if (isUnlocked) {
      if (yOffset > fadeStart) {
        textElement.classList.add("fade-out");
        cityContainer.classList.add("visible");
      } else {
        textElement.classList.remove("fade-out");
        cityContainer.classList.remove("visible");
      }
    } else {
      // Before unlocked: always show text, hide city
      textElement.classList.remove("fade-out");
      cityContainer.classList.remove("visible");
    }
  }

  // === Main 3D scroll logic ===
  for (var i = 0; i < numFrames; i++) {
    var frame = frames[i];

    var baseX = parseFloat(frame.dataset.x) || 0;
    var y = frame.dataset.y === "center"
      ? window.innerHeight / 2
      : parseFloat(frame.dataset.y) || 0;

    var cameraZ = 0;
    var cameraX = 0;

    if (yOffset < switchPoint) {
      cameraZ = yOffset;
      cameraX = 0;
    } else {
      cameraZ = switchPoint;
      cameraX = (yOffset - switchPoint) * -1;
    }

    var frameZ = zVals[i] + cameraZ;

    var transform = `translate3d(${cameraX}px, ${y}px, ${frameZ}px)`,
        opacity = frameZ < 50 ? 1 : 1 - Math.min(((frameZ - 100) / (perspective - 100)), 1),
        display = frameZ > perspective ? "none" : "block";

    frame.style.transform = transform;
    frame.style.webkitTransform = transform;
    frame.style.mozTransform = transform;
    frame.style.opacity = opacity;
    frame.style.display = display;
  }

  if (scrollMsg && yOffset > 300) {
    scrollMsg.parentNode.removeChild(scrollMsg);
    scrollMsg = null;
  }

  if (yOffset > switchPoint) {
    var offsetX = (yOffset - switchPoint);
    $('.horizontal-scroll, .horizontal-2').css('transform', 'translateX(' + (-offsetX) + 'px)');
  } else {
    $('.horizontal-scroll, .horizontal-2').css('transform', 'translateX(0)');
  }
}); */