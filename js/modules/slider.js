function mySlider() {

    //Sliders
    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        sliderPrev = document.querySelector('.offer__slider-prev'),
        sliderNext = document.querySelector('.offer__slider-next'),
        currentSlidNumber = document.querySelector('#current'),
        totalSlidNumber = document.querySelector('#total'),
        slideWrapper = document.querySelector('.offer__slider-wrapper'),
        slideField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slideWrapper).width;

    let slideIndex = 1;
    let totalIndex = slides.length;
    let offSet = 0;
    let siziBlock = +width.replace(/\D/gi, '');
    console.log(siziBlock);

    if (slides.length < 10) {
        totalSlidNumber.textContent = `0${slides.length}`;
        currentSlidNumber.textContent = `0${slideIndex}`;
    } else {
        totalSlidNumber.textContent = slides.length;
        currentSlidNumber.textContent = slideIndex;
    }

    slideField.style.width = 100 * totalIndex + '%';
    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';

    slideWrapper.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = width;
    });



    //Slider's Navigation
    slider.style.position = 'relative';

    const dotsArray = [];
    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < totalIndex; i++) {
        const dot = document.createElement('il');
        dot.setAttribute('data-slideNumber', i + 1);
        dot.classList.add('dot');
        dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;

    if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dotsArray.push(dot);
    }

    indicators.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-slideNumber')) {

            const slideTo = e.target.getAttribute('data-slideNumber');

            slideIndex = slideTo;

            //offSet = +width.slice(0, width.length - 2) * (slideTo - 1);
            offSet = siziBlock * (slideTo - 1);
            slideField.style.transform = `translateX(-${offSet}px)`;

            if (slides.length < 10) {
                currentSlidNumber.textContent = `0${slideTo}`;
            } else {
                currentSlidNumber.textContent = slideTo;
            }

            dotsArray.forEach(item => {
                item.style.opacity = .5;
            });
            e.target.style.opacity = 1;

        }
    });



    sliderNext.addEventListener('click', (event) => {

        //if (offSet == +width.slice(0, width.length - 2) * (slides.length - 1)) {
        if (offSet == siziBlock * (slides.length - 1)) {
            offSet = 0;
        } else {
            offSet += siziBlock;
        };

        slideField.style.transform = `translateX(-${offSet}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        };

        if (slides.length < 10) {
            currentSlidNumber.textContent = `0${slideIndex}`;
        } else {
            currentSlidNumber.textContent = slideIndex;
        }

        dotsArray.forEach(item => {
            item.style.opacity = .5;
        });
        dotsArray[slideIndex - 1].style.opacity = 1;


    });

    sliderPrev.addEventListener('click', (event) => {

        if (offSet == 0) {
            //offSet = +width.slice(0, width.length - 2) * (slides.length - 1);
            offSet = siziBlock * (slides.length - 1);
        } else {
            offSet -= siziBlock;
        }

        slideField.style.transform = `translateX(-${offSet}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        };

        if (slides.length < 10) {
            currentSlidNumber.textContent = `0${slideIndex}`;
        } else {
            currentSlidNumber.textContent = slideIndex;
        };

        dotsArray.forEach(item => {
            item.style.opacity = .5;
        });
        dotsArray[slideIndex - 1].style.opacity = 1;

    });

    //slides in simple form
    /*    function showSlide(nextSlide) {

    if (nextSlide < 1) {
        slideIndex = slides.length;
    } else if (nextSlide > slides.length) {
        slideIndex = 1;
    } else {
        slideIndex = nextSlide;
    };

    slides.forEach((item, index) => {
        if(index == (slideIndex-1)) {
            item.classList.add('show');
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
            item.classList.remove('show');
        };
    });

    currentSlidNumber.textContent = (slideIndex < 10 ) ? `0${slideIndex}` : slideIndex;
    };

    showSlide(slideIndex);

    sliderNext.addEventListener('click', (event) => {
    showSlide(slideIndex + 1);
    });

    sliderPrev.addEventListener('click', (event) => {
    showSlide(slideIndex - 1);
    }); */

    //slides in advanced form


}

export default mySlider;
