
import myTabs from './modules/tabs.js';
import myModal from './modules/modal.js';
import myTimer from './modules/timer.js';
import myCards from './modules/cards.js';
import myForms from './modules/forms.js';
import mySlider from './modules/slider.js';
import myCalculator from './modules/calculator.js';
import {showModal} from './modules/modal.js';

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
