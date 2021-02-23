import {showModal, closeModal} from './modal.js';
import {postData} from '../services/services.js';

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

            postData('http://localhost:3000/requests', jsonData)
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
        showModal('.modal', modalTimerId);

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
            closeModal('.modal');
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

export default myForms;
