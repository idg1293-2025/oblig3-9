const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.3 }
  );
  
  const polarBearSection = document.querySelector('#polarBear');
  observer.observe(polarBearSection);

  
if (polarBearSection.getBoundingClientRect().top < window.innerHeight) {
  polarBearSection.classList.add('visible');
}