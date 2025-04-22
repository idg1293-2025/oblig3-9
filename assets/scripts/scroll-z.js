document.addEventListener("DOMContentLoaded", function () {
    setSceneHeight();
    window.addEventListener("scroll", moveCamera);
  });
  
  

  function moveCamera() {
    document.documentElement.style.setProperty("--cameraZ", window.pageYOffset);
  }

  function setSceneHeight() {
    const numberOfItems = 25; // Or number of items you have in `.scene3D`
    const itemZ = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--itemZ")
    );
    const scenePerspective = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--scenePerspective"
      )
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