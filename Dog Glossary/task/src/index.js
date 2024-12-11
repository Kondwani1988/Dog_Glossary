function displayContent(content) {
   const contentDiv = document.getElementById('content');
   contentDiv.innerHTML = '';
   contentDiv.appendChild(content);
}

function displayImage(data, messageType) {
   const contentDiv = document.getElementById('content');
   contentDiv.innerHTML = '';

   if (data.status === "success") {
       const imgElement = document.createElement('img');
       imgElement.src = data.message;
       imgElement.alt = messageType === 'breed' ? 'Breed-specific dog' : 'Random dog';
       imgElement.style.width = '300px';
       imgElement.style.height = '300px';
       contentDiv.appendChild(imgElement);
   } else {
       const errorElement = document.createElement('p');
       errorElement.textContent = 'Breed not found!';
       contentDiv.appendChild(errorElement);
   }
}

function displaySubBreeds(data) {
   const contentDiv = document.getElementById('content');
   contentDiv.innerHTML = '';

   if (data.status === "success") {
       if (data.message.length === 0) {
           const noSubBreedsElement = document.createElement('p');
           noSubBreedsElement.textContent = 'No sub-breeds found!';
           contentDiv.appendChild(noSubBreedsElement);
       } else {
           const listElement = document.createElement('ol');
           data.message.forEach(subBreed => {
               const listItem = document.createElement('li');
               listItem.textContent = subBreed;
               listElement.appendChild(listItem);
           });
           contentDiv.appendChild(listElement);
       }
   } else {
       const errorElement = document.createElement('p');
       errorElement.textContent = 'Breed not found!';
       contentDiv.appendChild(errorElement);
   }
}

function fetchRandomDog() {
   const url = 'https://dog.ceo/api/breeds/image/random';

   const request = new XMLHttpRequest();
   request.addEventListener('load', function () {
       const data = JSON.parse(this.responseText);
       displayImage(data, 'random');
   });
   request.open('GET', url, true);
   request.send();
}

function fetchBreedDog(breed) {
   const formattedBreed = breed.toLowerCase();
   const url = `https://dog.ceo/api/breed/${formattedBreed}/images/random`;

   const request = new XMLHttpRequest();
   request.addEventListener('load', function () {
       const data = JSON.parse(this.responseText);
       displayImage(data, 'breed');
   });
   request.open('GET', url, true);
   request.send();
}

function fetchSubBreeds(breed) {
   const formattedBreed = breed.toLowerCase();
   const url = `https://dog.ceo/api/breed/${formattedBreed}/list`;

   const request = new XMLHttpRequest();
   request.addEventListener('load', function () {
       const data = JSON.parse(this.responseText);
       displaySubBreeds(data);
   });
   request.open('GET', url, true);
   request.send();
}

function fetchAllBreeds() {
   const url = 'https://dog.ceo/api/breeds/list/all';

   const request = new XMLHttpRequest();
   request.addEventListener('load', function () {
       const data = JSON.parse(this.responseText);

       if (data.status === "success") {
           const breeds = data.message;
           const contentDiv = document.getElementById('content');
           contentDiv.innerHTML = '';
           const orderedList = document.createElement('ol');

           Object.keys(breeds).forEach(breed => {
               const breedItem = document.createElement('li');
               breedItem.textContent = breed;

               if (breeds[breed].length > 0) {
                   const subBreedList = document.createElement('ul');
                   breeds[breed].forEach(subBreed => {
                       const subBreedItem = document.createElement('li');
                       subBreedItem.textContent = subBreed;
                       subBreedList.appendChild(subBreedItem);
                   });
                   breedItem.appendChild(subBreedList);
               }
               orderedList.appendChild(breedItem);
           });

           contentDiv.appendChild(orderedList);
       }
   });
   request.open('GET', url, true);
   request.send();
}

document.getElementById('button-random-dog').addEventListener('click', fetchRandomDog);

document.getElementById('button-show-breed').addEventListener('click', () => {
   const breedInput = document.getElementById('input-breed');
   const breed = breedInput.value.trim();

   if (breed) {
       fetchBreedDog(breed);
   } else {
       const errorElement = document.createElement('p');
       errorElement.textContent = 'Please enter a breed name!';
       displayContent(errorElement);
   }
});

document.getElementById('button-show-sub-breed').addEventListener('click', () => {
   const breedInput = document.getElementById('input-breed');
   const breed = breedInput.value.trim();

   if (breed) {
       fetchSubBreeds(breed);
   } else {
       const errorElement = document.createElement('p');
       errorElement.textContent = 'Please enter a breed name!';
       displayContent(errorElement);
   }
});

document.getElementById('button-show-all').addEventListener('click', fetchAllBreeds);