const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let photosArray = [];
const count = 10;

const unsplashAPI = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

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

const createAnAttribute = (element, attributes) => {
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}   

const displayPhotos = () => {
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
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
};