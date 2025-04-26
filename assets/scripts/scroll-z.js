var perspective = 1000,
    zSpacing = -155,
    zVals = [],
    $frames = $(".tree"),
    frames = $frames.toArray(),
    scrollMsg = document.getElementById("instructions-overlay"),
    numFrames = $frames.length,
    switchPoint = 1800; // Z movement stops here

// Setup initial Z positions
for (var i = 0; i < numFrames; i++) {
  zVals.push((numFrames - i) * zSpacing);
}

$(window).scroll(function () {
  var yOffset = window.pageYOffset;

  // Loop through each frame and update Z/X/Y
  for (var i = 0; i < numFrames; i++) {
    var frame = frames[i];

    // Get the base X and Y positions from data attributes
    var baseX = parseFloat(frame.dataset.x) || 0;
    var y = frame.dataset.y === "center"
      ? window.innerHeight / 2
      : parseFloat(frame.dataset.y) || 0;

    // Initialize Z and X based on the scroll position
    var cameraZ = 0;
    var cameraX = 0;

    // Z-scroll before switchPoint
    if (yOffset < switchPoint) {
      cameraZ = yOffset;  
      cameraX = 0; 
    } else {
      cameraZ = switchPoint;  
      cameraX = (yOffset - switchPoint) * -1; 
    }

    // Calculate final Z value for each frame
    var frameZ = zVals[i] + cameraZ;

    // Apply the calculated X, Y, Z values as a transform
    var transform = `translate3d(${cameraX}px, ${y}px, ${frameZ}px)`,
        opacity = frameZ < 50 ? 1 : 1 - Math.min(((frameZ - 100) / (perspective - 100)), 1),
        display = frameZ > perspective ? "none" : "block";

    frame.style.transform = transform;
    frame.style.webkitTransform = transform;
    frame.style.mozTransform = transform;
    frame.style.opacity = opacity;
    frame.style.display = display;
  }

  // Remove scroll message if the user has scrolled far enough
  if (scrollMsg && yOffset > 200) {
    scrollMsg.parentNode.removeChild(scrollMsg);
    scrollMsg = null;
  }

  // Horizontal movement of the main container
  if (yOffset > switchPoint) {
    var offsetX = (yOffset - switchPoint);
    $('.horizontal-scroll').css('transform', 'translateX(' + (-offsetX) + 'px)');
  } else {
    $('.horizontal-scroll').css('transform', 'translateX(0)');
  }
});