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

export default myTimer;
