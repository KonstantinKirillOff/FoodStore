
import myTabs from './modules/tabs';
import myModal from './modules/modal';
import myTimer from './modules/timer';
import myCards from './modules/cards';
import myForms from './modules/forms';
import mySlider from './modules/slider';
import myCalculator from './modules/calculator';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => {

        //if ( !modalForm.classList.contains('show') ) {
            showModal('.modal',modalTimerId);
        //}

    }, 6000);

    myTabs();
    myModal('[data-modal]', '.modal', modalTimerId);
    myTimer();
    myCards();
    myForms('form', modalTimerId);
    mySlider();
    myCalculator();

});
