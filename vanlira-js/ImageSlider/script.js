const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; //getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(),60);
    })
})

const autoSlide = () => {
    if(carousel.scrollLeft === (carousel.scrollWidth - carousel.clientWidth)) return;
    positionDiff = Math.abs(positionDiff)
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;
    if(carousel.scrollLeft > prevScrollLeft){
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    autoSlide()
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    setTimeout(() => showHideIcons(),60);
}

// mousedown 
// - 사용자가 해당 element에서 마우스 버튼을 눌렀을 때 발생합니다.
// mouseup 
// - 사용자가 해당 element에서 눌렀던 마우스 버튼을 떼었을 때 발생합니다.
// mousemove 
// - 사용자가 해당 element에서 마우스를 움직였을 때 발생합니다.
carousel.addEventListener("mousedown", dragStart)
carousel.addEventListener("touchstart", dragStart)

carousel.addEventListener("mousemove", dragging)
carousel.addEventListener("touchmove", dragging)

carousel.addEventListener("mouseup", dragStop)
carousel.addEventListener("mouseleave", dragStop)
carousel.addEventListener("toucheend", dragStop)