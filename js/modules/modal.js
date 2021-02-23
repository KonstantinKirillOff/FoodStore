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

export default myModal;
export {closeModal};
export {showModal};
