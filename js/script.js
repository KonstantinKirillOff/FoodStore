window.addEventListener('DOMContentLoaded', () => {

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


    //Timer
    const timeEnd = '2020-10-25T17:23error correction:00';

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



    //Modal
    const showModalBtn = document.querySelectorAll('[data-modal]'),
        closeBtn = document.querySelectorAll('[data-close]'),
        modalForm = document.querySelector('.modal'),
        modalElem = document.querySelector('.modal__title');

    showModalBtn.forEach((item) => {
        item.addEventListener('click', function () {
            showModal();
        });
    });

    /* closeBtn.forEach((item) => {
        item.addEventListener('click', function () {
            closeModal(modalForm);
        });
    }); */

    modalForm.addEventListener('click', function (event) {
        if (event.target === modalElem || event.target === modalForm || event.target.hasAttribute('data-close')) {
            closeModal(modalForm);
        }
    });

    function closeModal(modalForm) {
        modalForm.classList.add('hide');
        modalForm.classList.remove('show');
    }

    function showModal() {
        modalForm.classList.add('show');
        modalForm.classList.remove('hide');
        //clearTimeout(modalTimerId);
    }

    function showModalByScroll() {

        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            document.removeEventListener('scroll', showModalByScroll);
        }

    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modalForm.classList.contains('show')) {
            closeModal(modalForm);
        }
    });

    /* const modalTimerId = setTimeout(() => {

        if ( !modalForm.classList.contains('show') ) {
            showModal();
        }

    }, 6000); */

    document.addEventListener('scroll', showModalByScroll);



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

    //vegy
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



    //Forms
    const forms = document.querySelectorAll('form');

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

            const Obj = {};
            formData.forEach((item, key) => {
                Obj[key] = item;
            });

            const jsontext = JSON.stringify(Obj);

            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: jsontext,
            }).then(data => data.text())
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

        });

    }

    function showThanksModal(message) {

        const modalContent = document.querySelector('.modal__dialog');
        modalContent.classList.add('hide');
        showModal();

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
            closeModal(modalForm);
            thanksMess.remove();
            modalContent.classList.add('show');
            modalContent.classList.remove('hide');
        }, 2000);

    }

    forms.forEach((form) => {
        sendForm(form);
    });


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
    }); //когда нужно дождаться ответов от всех промисов и потом собрать все в кучку. Ждет окончания всех промисов переданных в массив.

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
        .then(json => console.log(json)); */

});
