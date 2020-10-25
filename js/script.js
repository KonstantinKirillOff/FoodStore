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
    const timeEnd = '2020-10-25T16:22:00';

    function getRemainTime(timeEnd) {

        const diff = Date.parse(timeEnd) - Date.parse(new Date()),
            days = Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours = Math.floor((diff / (1000 * 60 * 60) % 24)),
            // - остаток отделения = количеству оставшихся часов(5 % 2 = 2*2 + 1 - 1 остаток от деления)
            minutes = Math.floor((diff / (1000 * 60) % 60)),
            seconds = Math.floor((diff / 1000) % 60);


        return {
            days,
            hours,
            minutes,
            seconds
        };
    }


    function setCurrentTimer(timerSelector) {

        const dataTime = getRemainTime(timeEnd);

        const timerBox = document.querySelector(timerSelector),
            daysBox    = timerBox.querySelector('#days'),
            hoursBox   = timerBox.querySelector('#hours'),
            minutesBox = timerBox.querySelector('#minutes'),
            secondsBox = timerBox.querySelector('#seconds');


        secondsBox.textContent = (dataTime.seconds < 10) ? `0${dataTime.seconds}` : `${dataTime.seconds}`;
        minutesBox.textContent = (dataTime.minutes < 10) ? `0${dataTime.minutes}` : `${dataTime.minutes}`;
        hoursBox.textContent   = (dataTime.hours < 10) ? `0${dataTime.hours}` : `${dataTime.hours}`;
        daysBox.textContent    = (dataTime.days < 10) ? `0${dataTime.days}` : `${dataTime.days}`;
    }

    setCurrentTimer('.timer');


    const idInterval = setInterval(function() {

        if ( Date.parse(timeEnd) - Date.parse(new Date()) < 0 )  {
            clearInterval(idInterval);
        } else {
            setCurrentTimer('.timer');
        }

    }, 10);



});
