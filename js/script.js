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

    closeBtn.forEach((item) => {
        item.addEventListener('click', function () {
            closeModal(modalForm);
        });
    });

    modalForm.addEventListener('click', function (event) {
        if ( event.target === modalElem ) {
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

        if ( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
            showModal();
            document.removeEventListener('scroll', showModalByScroll);
        }

    }

    document.addEventListener('keydown', (event) => {
        if ( event.code === 'Escape' && modalForm.classList.contains('show')) {
            closeModal(modalForm);
        }
    });

    const modalTimerId = setTimeout(() => {

        if ( !modalForm.classList.contains('show') ) {
            showModal();
        }

    }, 6000);

    document.addEventListener('scroll', showModalByScroll);

});
