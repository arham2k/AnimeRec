let topPicksIndex = 0;
let newReleasesIndex = 0;
let recommendationsIndex = 0; // Add this line

function nextSlide(slideshowId) {
    let wrapper = document.getElementById(slideshowId);
    let slides = wrapper.getElementsByClassName('mySlides').length;
    let currentIndex = slideshowId === 'topPicksSlideshow' ? topPicksIndex : slideshowId === 'newReleasesSlideshow' ? newReleasesIndex : recommendationsIndex; // Modify this line
    currentIndex = (currentIndex + 5) % slides;
    wrapper.style.transform = 'translateX(' + (-currentIndex * 20) + '%)';
    if (slideshowId === 'topPicksSlideshow') {
        topPicksIndex = currentIndex;
    } else if (slideshowId === 'newReleasesSlideshow') {
        newReleasesIndex = currentIndex;
    } else {
        recommendationsIndex = currentIndex; // Add this line
    }
}

function prevSlide(slideshowId) {
    let wrapper = document.getElementById(slideshowId);
    let slides = wrapper.getElementsByClassName('mySlides').length;
    let currentIndex = slideshowId === 'topPicksSlideshow' ? topPicksIndex : slideshowId === 'newReleasesSlideshow' ? newReleasesIndex : recommendationsIndex; // Modify this line
    currentIndex = (currentIndex - 5 + slides) % slides;
    wrapper.style.transform = 'translateX(' + (-currentIndex * 20) + '%)';
    if (slideshowId === 'topPicksSlideshow') {
        topPicksIndex = currentIndex;
    } else if (slideshowId === 'newReleasesSlideshow') {
        newReleasesIndex = currentIndex;
    } else {
        recommendationsIndex = currentIndex; // Add this line
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.search-form');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const animeName = document.querySelector('#animeName').value;
        const response = await fetch('/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ 'animeName': animeName })
        });

        if (response.ok) {
            const recommendations = await response.json();
            displayRecommendations(recommendations);
        } else {
            console.error('Error fetching recommendations');
        }
    });

    function displayRecommendations(recommendations) {
        const slideshowWrapper = document.querySelector('#recommendationsSlideshow');
        slideshowWrapper.innerHTML = '';
        recommendations.forEach(anime => {
            const slide = document.createElement('div');
            slide.classList.add('mySlides');
            const img = document.createElement('img');
            img.src = anime.images.jpg.image_url;
            img.alt = anime.title;
            slide.appendChild(img);
            slideshowWrapper.appendChild(slide);
        });
    }
});