//Scroll on z-axses. Source https://vinceumo.github.io/devNotes/CSS/css-3d-scrolling-on-the-z-axis/

document.addEventListener("DOMContentLoaded", function () {
    setSceneHeight();
    window.addEventListener("scroll", moveCamera);
  });

  function moveCamera() {
    const yOffset = window.pageYOffset;
    const startZ = 300; 
    const switchPoint = 4000; // Scroll Y threshold where we switch to X-axis
  
    let cameraZ = 0;
    let cameraX = 0;
  
    if (yOffset < startZ) {
      cameraZ = 0;
    } else if (yOffset >= startZ && yOffset < switchPoint) {
      cameraZ = yOffset - startZ;
    } else if (yOffset >= switchPoint) {
      cameraZ = switchPoint - startZ; // Stop Z movement
      cameraX = (yOffset - switchPoint) * -1; // Begin X movement (leftward)
    }
  
    document.documentElement.style.setProperty("--cameraZ", cameraZ);
    document.documentElement.style.setProperty("--cameraX", cameraX);
  }

  function setSceneHeight() {
    const numberOfItems = 25; // Or number of items you have in `.scene3D`
    const itemZ = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--itemZ")
    );
    const scenePerspective = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--scenePerspective")
    );
    const cameraSpeed = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--cameraSpeed")
    );
  
    const height =
      window.innerHeight +
      scenePerspective * cameraSpeed +
      itemZ * cameraSpeed * numberOfItems;
  
    // Update --viewportHeight value
    document.documentElement.style.setProperty("--viewportHeight", height);
  }