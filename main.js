// Selector
const slider = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'));

// Global Variables
let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationId = 0,
    currentIndex = 0;


// Function for the slides

slides.forEach((slide, index) =>{
    // Prevent picture draging function
    const slideImage = slide.querySelector('img');
    slideImage.addEventListener('dragstart', (e) => e.
    preventDefault());

    // Touch events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);



    // Mouse eventes
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mouseleave', touchEnd);
    slide.addEventListener('mousemove', touchMove);
});

// Prevent menu display in movile while holding finger or right mouse click in pc
window.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
}

// Event functions

function touchStart(index){
    return function(event){
        currentIndex = index
        startPos = getPositionX(event)
        isDragging = true

        animationID = requestAnimationFrame(animation)    
        slider.classList.add('grabbing')
    }
};

function touchEnd(){
    isDragging = false
    cancelAnimationFrame(animationId)

    const moveBy = currentTranslate - prevTranslate

    if(moveBy < -100 && currentIndex < slides.length -1) currentIndex += 1

    if(moveBy > 100 && currentIndex > 0) currentIndex -= 1

    setPositionByIndex()

    slider.classList.remove('grabbing')
};

function touchMove(event){
    if(isDragging){
        const currentPosition = getPositionX(event)
        currentTranslate = prevTranslate + currentPosition - startPos
    }
};

function getPositionX(event){
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
};

function animation (){
   setSliderPosition()
    if(isDragging) requestAnimationFrame(animation)
};

function setSliderPosition(){
    slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex (){
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()
}