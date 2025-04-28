var perspective = 1000,
  zSpacing = -155,
  zVals = [],
  $frames = $(".tree"),
  $cityframes = $(".city"),
  cityframes = $cityframes.toArray(),
  frames = $frames.toArray(),
  numFrames = $frames.length,
  numcityFrames = $cityframes.length,
  switchPoint = 1800, // Z movement stops here
  xStopPoint = 2650,
  isUnlocked = false; // <<< NEW: Lock until user clicks
 

let lastScrollY = window.scrollY;

const cityElement = document.getElementById("city-zoom");
const cityContainer = document.querySelector(".city-container");

// ==ANIMATIONS!==
window.addEventListener('scroll', function () {
  const currentScrollY = window.scrollY;

  const cutTree = document.getElementById('cut-tree-animation');
  const flowerParts = document.querySelectorAll('#flower .petal, #flower .stem, #flower .leaf, #flower .center');
  const hill = document.querySelectorAll('#hill .hill--brown')
  const footballField = document.querySelectorAll('#footballfield .football_1, #footballfield .football_2, #footballfield .football_3, #footballfield .football_4')

  // === Tree animation trigger ===
  if (currentScrollY > 1800 && lastScrollY <= 1800) {
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

  if (yOffset > xStopPoint) {
    yOffset = xStopPoint;
    window.scrollTo(0, xStopPoint); // Ensure the scroll position is fixed at 2800px
  }

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

   // 1. Z-axis movement before the switchPoint
   if (yOffset <= switchPoint) {
    cameraZ = yOffset;
    cameraX = 0;
  }
  // 2. X-axis movement between switchPoint and xStopPoint
  else if (yOffset > switchPoint && yOffset <= xStopPoint) {
    cameraZ = switchPoint;
    cameraX = (yOffset - switchPoint) * -1; // Move along X-axis
  }
  // 3. Z-axis movement after xStopPoint
  else if (yOffset > xStopPoint) {
    cameraZ = (yOffset - xStopPoint);  // Move along Z-axis again after the xStopPoint
    cameraX = 0;  // Stop movement along X-axis after the xStopPoint
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

   // === Main 3D scroll logic for cityframes (after xStopPoint) ===
   for (var i = 0; i < numcityFrames; i++) {
    var cityframe = cityframes[i];
    var baseX = parseFloat(cityframe.dataset.x) || 0;
    var y = cityframe.dataset.y === "center" ? window.innerHeight / 2 : parseFloat(cityframe.dataset.y) || 0;

    var cameraZ = 0;
    var cameraX = 0;

    // 2. Z-axis movement for cityframes after xStopPoint
    if (yOffset > xStopPoint) {
      cameraZ = (yOffset - xStopPoint);  // Move cityframes towards the viewer along Z-axis
      cameraX = 0;
    }

    var cityframeZ = zVals[i] + cameraZ;

    var cityTransform = `translate3d(${cameraX}px, ${y}px, ${cityframeZ}px)`,
        cityOpacity = cityframeZ < 50 ? 1 : 1 - Math.min(((cityframeZ - 100) / (perspective - 100)), 1),
        cityDisplay = cityframeZ > perspective ? "none" : "block";

    cityframe.style.transform = cityTransform;
    cityframe.style.webkitTransform = cityTransform;
    cityframe.style.mozTransform = cityTransform;
    cityframe.style.opacity = cityOpacity;
    cityframe.style.display = cityDisplay;
  }

  // === Handle horizontal scrolling ===
  if (yOffset > switchPoint && yOffset <= xStopPoint) {
    var offsetX = (yOffset - switchPoint); // Calculate the offset based on scroll position
    $('.horizontal-scroll, .horizontal-2').css('transform', 'translateX(' + (-offsetX) + 'px)');
  } else if (yOffset > xStopPoint) {
    // Once we've passed the xStopPoint, stop horizontal movement by setting translateX to 0
    $('.horizontal-scroll, .horizontal-2').css('transform', 'translateX(' + (-xStopPoint + switchPoint) + 'px)');
  } else {
    // Before the switchPoint, no horizontal movement
    $('.horizontal-scroll, .horizontal-2').css('transform', 'translateX(0)');
  }
});