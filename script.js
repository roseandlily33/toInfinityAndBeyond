const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let count = 5;
let ready = false;
let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;

const apiKey = 
const unsplashAPI = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Fetches and gets all the photos: 
const getPhotos = async() => {
    try{
        let response = await fetch(unsplashAPI);
        photosArray = await response.json();
        displayPhotos();
    } catch(err){
        console.log(err)
    }
}
getPhotos();

//Loops over the atrributes of each photo getting made
const createAnAttribute = (element, attributes) => {
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}   

const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        createAnAttribute(item, {
            href: photo.links.html,
            target: '_blank'
        });
        const img = document.createElement('img');
        createAnAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
};
//Function is called for each one of the images
const imageLoaded = () => {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true; 
        count = 30;
    }
}

window.addEventListener('scroll', () => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getPhotos();
   }
});