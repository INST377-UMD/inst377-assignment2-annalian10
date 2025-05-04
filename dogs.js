function loadCarousel() {
    fetch('https://dog.ceo/api/breeds/image/random/10')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('dogCarousel');
        container.innerHTML = "";
        data.message.forEach(img => {
            const imgEl = document.createElement('img');
            imgEl.src = img;
            imgEl.alt = "Cute dog";
            imgEl.classList.add('carousel-img');
            container.appendChild(imgEl);
        });

        window.simpleslider.getSlider().init({
            container: container,
            pauseOnHover: false,
            autoPlay: true,
            interval: 3000,
        });
    });
}

// Create breed buttons dynamically from Dog CEO
function loadBreedButtons() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {
        const breeds = Object.keys(data.message);
        const buttonContainer = document.getElementById('breedButtons');

        breeds.forEach(breed => { 
            const btn = document.createElement('button');
            btn.classList.add('red-btn');
            btn.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
            btn.setAttribute('data-breed', breed);
            btn.onclick = () => showBreedInfo(breed);
            buttonContainer.appendChild(btn);
        });
    });
}

function showBreedInfo(breed) {
    fetch(`https://dogapi.dog/api/v2/breeds`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          alert("Breed info not found.");
          return;
        }
        const info = data[0];
        document.getElementById('breedName').textContent = info.name || breed;
        document.getElementById('breedDesc').textContent = info.temperament || "No description available.";
        document.getElementById('breedLife').textContent = info.life_span || "Unknown";
  
        document.getElementById('breedInfoContainer').style.display = 'block';
      });
  }

  window.onload = () => {
    loadCarousel();
    loadBreedButtons();
  
    if (annyang) {
      const commands = {
        "hello": () => alert("Hello World"),
        "change the color to *color": color => document.body.style.backgroundColor = color,
        "navigate to *page": page => window.location.href = `${page.toLowerCase()}.html`,
        "load dog breed *breed": breed => showBreedInfo(breed.toLowerCase())
      };
      annyang.addCommands(commands);
      annyang.start();
    }
  };