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

export default myCalculator;
