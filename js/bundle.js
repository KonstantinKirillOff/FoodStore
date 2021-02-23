/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function myCalculator() {

    //Calculation
    const calculatingResult = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    function setParametersFromLocalStorage() {

        const sexLocalStorage = localStorage.getItem('sex');
        const ratioLocalStorage = localStorage.getItem('ratio');

        if (sexLocalStorage) {
            sex = sexLocalStorage;
        } else {
            sex = 'female';
        };

        if (ratioLocalStorage) {
            ratio = ratioLocalStorage;
        } else {
            ratio = '1.375';
        };

        document.querySelectorAll('.calculating__field div').forEach(item => {
            if ((item.hasAttribute('data-ratio') && (item.getAttribute('data-ratio') == ratio)) ||
                (item.hasAttribute('id') && (item.getAttribute('id') == sex))) {
                item.classList.add('calculating__choose-item_active');
            } else {
                item.classList.remove('calculating__choose-item_active');
            }
        });

    }


    function calculateCalories() {
        if (!sex || !height || !weight || !age || !ratio) {
            calculatingResult.textContent = "____";
            return;
        }

        if (sex == 'female') {
            calculatingResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            calculatingResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }


    function getStaticInformation(parentSelector, activeClass) {

        const staticElementsParent = document.querySelector(parentSelector);
        staticElementsParent.addEventListener('click', (e) => {

            if ((!e.target.hasAttribute('data-ratio')) && (!e.target.hasAttribute('id')) || e.target.getAttribute('id') == 'gender') {
                return;
            }

            if (e.target.hasAttribute('data-ratio')) {
                ratio = e.target.dataset.ratio;
                localStorage.setItem('ratio', ratio);
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', sex);
            };

            staticElementsParent.querySelectorAll('div').forEach(item => {
                item.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);

            calculateCalories();
        });

    }


    function getDynamicInformation(parentSelector) {

        const dynamicElements = document.querySelector(parentSelector);
        dynamicElements.addEventListener('input', (e) => {
            if (e.target) {
                switch (e.target.getAttribute('id')) {
                    case 'height':
                        height = +e.target.value;
                        break;

                    case 'weight':
                        weight = +e.target.value;
                        break;

                    case 'age':
                        age = +e.target.value;
                        break;
                }
            }

            if (e.target.value.match(/\D/) !== null) {
                e.target.style.border = '2px solid red';
            } else {
                e.target.style.border = 'none';
            }

            calculateCalories();
        });
    }

    setParametersFromLocalStorage();
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
    getDynamicInformation('.calculating__choose_medium');
    calculateCalories();


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myCalculator);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");



function myCards() {

    //Использование классов для карточек
    class MenuItem {

        constructor(src, subtitle, descr, price, ...classes) {
            this.src = src;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
        }
        render(container) {

            const element = document.createElement('div');

            if (this.classes.length > 0) {
                this.classes.forEach(className => element.classList.add(className));
            } else {
                element.classList.add("menu__item");
            }


            element.innerHTML +=
                `<img src=${this.src} alt="vegy">
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;

            container.append(element);
        }
    }

    const menuItemContainer = document.querySelector('.menu__field .container');



    axios.get('http://localhost:3000/menu')
        .then((responseData) => {
            console.log(responseData);
            responseData.data.forEach(({ img, title, descr, price }) => {
                new MenuItem(img, title, descr, price, "menu__item", "big").render(menuItemContainer);
            });
        });


    /* getResources('http://localhost:3000/menu')
    .then((data) => {
        console.log(data);
        data.forEach(({img, title, descr, price}) => {
            new MenuItem(img, title, descr, price, "menu__item", "big").render(menuItemContainer);
        });
    }); */

    /* function createCard(data) {
        data.forEach(({ img, title, descr, price }) => {
            const element = document.createElement('div');
            element.classList.add("menu__item");
            element.innerHTML +=
            `<img src=${img} alt="vegy">
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price}</span> грн/день</div>
            </div>`;

            menuItemContainer.append(element);

        });
    } */

    /* getResources('http://localhost:3000/menu')
        .then((data) => {
            createCard(data);
        }); */

    /* //vegy
    new MenuItem(
        "img/tabs/vegy.jpg",
        'Меню "Фитнес"',
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.
        Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        229,
        "menu__item",
        "big").render(menuItemContainer);


    //elite
    new MenuItem(
        "img/tabs/elite.jpg",
        'Меню “Премиум”',
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд.
        Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        550,
        "menu__item").render(menuItemContainer);


    //post
    new MenuItem(
        "img/tabs/post.jpg",
        'Меню "Постное"',
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения,
         молоко из миндаля, овса, кокоса или гречки,
         правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        430,
        "menu__item").render(menuItemContainer);

 */

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myCards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");



function myForms(formSelector, modalTimerId) {

    //Forms
    const forms = document.querySelectorAll(formSelector),
        modalForm = document.querySelector('.modal');

    const errors = {
        loading: 'img/form/spinner.svg',
        sucsess: 'Спасибо за вашу заявку! Мы скоро свяжемся с вами!',
        error: 'При отправке произошла ошибка'
    };

    function sendForm(form) {

        form.addEventListener('submit', (event) => {

            event.preventDefault();

            const message = document.createElement('img');
            message.src = errors.loading;
            message.classList.add('spinerSenter');
            form.insertAdjacentElement('afterend', message);

            let formData = new FormData(form);
            const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services_js__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', jsonData)
                .then((data) => {
                    console.log(data);
                    showThanksModal(errors.sucsess);
                })
                .catch(() => {
                    showThanksModal(errors.error);
                })
                .finally(() => {
                    form.reset();

                    setInterval(() => {
                        message.remove();
                    }, 2000);
                });
        });

    }

    function showThanksModal(message) {

        const modalContent = document.querySelector('.modal__dialog');
        modalContent.classList.add('hide');
        (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);

        const thanksMess = document.createElement('div');
        thanksMess.classList.add('modal__dialog');
        thanksMess.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        modalForm.append(thanksMess);

        setTimeout(() => {
            (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
            thanksMess.remove();
            modalContent.classList.add('show');
            modalContent.classList.remove('hide');
        }, 2000);

    }

    forms.forEach((form) => {
        sendForm(form);
    });

};


/* let xhr = new XMLHttpRequest();
        xhr.open("POST", "server.php");
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        //xhr.send(formData);
        xhr.send(jsontext); */

/* xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
        console.log(xhr.response);
        //message.textContent = errors.sucsess;
        showThanksModal(errors.sucsess);
        form.reset();
        message.remove();
    } else {
        //message.textContent = errors.error;
        showThanksModal(errors.error);
    }


}); */


/* fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res)); */


//тренировка по Promise
/* console.log('Запрос данных');
const prom = new Promise((resolve, regect) => {
    setTimeout(() => {
        console.log('Подготовка...');
        const product = {
            name: 'TV',
            price: 2000
        };
        resolve(product);
    }, 2000);
}).then((product) => {
    return new Promise((res, reg) => {
        setTimeout(() => {
            console.log('Обработка...');
            product.status = 'order';
            res(product);
        }, 2000);
    });
}).then((data) => {
    data.modify = true;
    console.log('modify data...');
    return data;
}).then(finalData => {
    console.log(finalData);
}).catch((d) => {
    console.log(`${d.name} Ошибка исполнения!`);
}).finally((d) => {
    console.log('finally');
}); */

/* const test = time => {
    return new Promise(resolve => {
        setTimeout(() => resolve(),time);
    });
};

test(1000).then(() => console.log('1000ms'));
test(2000).then(() => console.log('2000ms'));

Promise.all([test(1000), test(2000)]).then(() => {
    console.log('All');
}); //когда нужно дождаться ответов от всех промисов и потом собрать
 все в кучку. Ждет окончания всех промисов переданных в массив.

Promise.race([test(1000), test(2000)]).then(() => {
    console.log('first');
}); //выполнится, когда какой либо из промисов будет выполнен. Ждет окончания лишь первого промиса */

//fetch
/* fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json));

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: "POST",
    body: JSON.stringify({ name: "Alex" }),
    headers: {
        'Content-type': 'application/json'
    }
})
    .then(response => response.json())
    .then(json => console.log(json));


}*/

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myForms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modalForm = document.querySelector(modalSelector);

    modalForm.classList.add('hide');
    modalForm.classList.remove('show');
}

function showModal(modalSelector, modalTimerId) {
    const modalForm = document.querySelector(modalSelector);

    modalForm.classList.add('show');
    modalForm.classList.remove('hide');

    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }

}

function myModal(trigerSelector, modalSelector, modalTimerId) {

    //Modal
    const showModalBtn = document.querySelectorAll(trigerSelector),
        closeBtn = document.querySelectorAll('[data-close]'),
        modalForm = document.querySelector(modalSelector),
        modalElem = document.querySelector('.modal__title');

    showModalBtn.forEach((item) => {
        item.addEventListener('click', function () {
            showModal(modalSelector, modalTimerId);
        });
    });

    /* closeBtn.forEach((item) => {
        item.addEventListener('click', function () {
            closeModal(modalForm);
        });
    }); */

    modalForm.addEventListener('click', function (event) {
        if (event.target === modalElem || event.target === modalForm || event.target.hasAttribute('data-close')) {
            closeModal(modalSelector);
        }
    });


    function showModalByScroll() {

        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            document.removeEventListener('scroll', showModalByScroll);
        }

    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modalForm.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });



    document.addEventListener('scroll', showModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mySlider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function myTabs() {

    //Tabs
    const tabheaderItems = document.querySelector('.tabheader__items'),
        menuItem = document.querySelectorAll('.tabheader__item'),
        arrTabcontent = document.querySelectorAll('.tabcontent');


    function clearTabcontainer() {
        arrTabcontent.forEach((item) => {
            item.style.display = 'none';
        });

        menuItem.forEach((item, i) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabcontainer(i = 0) {
        arrTabcontent[i].style.display = 'block';
        menuItem[i].classList.add('tabheader__item_active');
    }

    clearTabcontainer();
    showTabcontainer();

    tabheaderItems.addEventListener('click', (event) => {

        let targetElement = event.target;

        if (targetElement && targetElement.matches('.tabheader__item')) {
            clearTabcontainer();
            menuItem.forEach((item, i) => {
                if (item == targetElement) {
                    showTabcontainer(i);
                }
            });

        }
    });

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myTabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function myTimer() {

    //Timer
    const timeEnd = '2021-10-25T17:23:00';

    function getRemainTime(timeEnd) {

        const diff = Date.parse(timeEnd) - Date.parse(new Date()),
            days = Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours = Math.floor((diff / (1000 * 60 * 60) % 24)),
            // - остаток отделения = количеству оставшихся часов(5 % 2 = 2*2 + 1 - 1 остаток от деления)
            minutes = Math.floor((diff / (1000 * 60) % 60)),
            seconds = Math.floor((diff / 1000) % 60);


        return {
            diff,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(num) {
        return (num >= 0 && num < 10) ? `0${num}` : `${(num > 0) ? num : '00'}`;
    }


    function setCurrentTimer(timerSelector, endTime) {

        const timerBox = document.querySelector(timerSelector),
            daysBox = timerBox.querySelector('#days'),
            hoursBox = timerBox.querySelector('#hours'),
            minutesBox = timerBox.querySelector('#minutes'),
            secondsBox = timerBox.querySelector('#seconds'),
            idInterval = setInterval(setClock, 1000);

        setClock();
        function setClock() {

            const dataTime = getRemainTime(endTime);

            secondsBox.textContent = getZero(dataTime.seconds);
            minutesBox.textContent = getZero(dataTime.minutes);
            hoursBox.textContent = getZero(dataTime.hours);
            daysBox.textContent = getZero(dataTime.days);

            if (dataTime.diff <= 0) {
                clearInterval(idInterval);
            }

        }

    }

    setCurrentTimer('.timer', timeEnd);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myTimer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResources": () => (/* binding */ getResources)
/* harmony export */ });
const postData = async (url, data) => {

    const result = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json();

};

//fetch
const getResources = async (url) => {
    const result = await fetch(url);
    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    return await result.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal.js */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer.js */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards.js */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms.js */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider.js */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator.js */ "./js/modules/calculator.js");










window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => {

        //if ( !modalForm.classList.contains('show') ) {
            (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal',modalTimerId);
        //}

    }, 6000);

    (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_forms_js__WEBPACK_IMPORTED_MODULE_4__.default)('form', modalTimerId);
    (0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_calculator_js__WEBPACK_IMPORTED_MODULE_6__.default)();

});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map