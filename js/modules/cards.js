import {getResources} from '../services/services.js';


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

export default myCards;
