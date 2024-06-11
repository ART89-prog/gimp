const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup-group__wrapper') ||
        event.target.classList.contains('popup-group__container') ||
        event.key === 'Escape' ||
        event.target.closest('.popup-close')
    ) {
        hideAllPopups();
    }
};
const showPopup = popupId => {
    const popup = document.querySelector(popupId);
    if (!popup) return

    const pageWrapper = document.querySelector('body'),
        popupGroup = document.querySelector('.popup-group');

    hideAllPopups();

    popup.classList.add('popup--active');
    pageWrapper.classList.add('no-scroll');

    if (popupGroup) popupGroup.classList.add('popup-group--active')

    document.addEventListener('click', checkTargetOrKey);
    document.addEventListener('keyup', checkTargetOrKey);
};

const hideAllPopups = () => {
    const popups = document.querySelectorAll('.popup'),
        pageWrapper = document.querySelector('body'),
        popupGroup = document.querySelector('.popup-group');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    pageWrapper.classList.remove('no-scroll');

    if (popupGroup) popupGroup.classList.remove('popup-group--active');


    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};

document.addEventListener('DOMContentLoaded', () => {
    const __sliderPaginationParams = {
        el: '.slider-pagination',
        hiddenClass: 'slider-pagination--hidden',
        bulletClass: 'slider-pagination__bullet',
        bulletActiveClass: 'slider-pagination__bullet--active',
        lockClass: 'slider-pagination--lock'
    }
    const __sliderNavigationParams = (sliderPrevClass = '.slider-button--prev', sliderNextClass = '.slider-button--next') => {
        return {
            nextEl: sliderNextClass,
            prevEl: sliderPrevClass,
            hiddenClass: 'slider-pagination--hidden',
            disabledClass: 'slider-button--disabled',
        }
    }
    const __sliderProductNavParams = {
        speed: 500,
        watchSlidesProgress: true,
        slidesPerView: "auto",
        spaceBetween: 12,
        loop: false,
        
       /* loopAditionSlides: 12,*/
        centeredSlides: true,
        /*centeredSlidesBounds: true,*/
        slideToClickedSlide: true,
        breakpoints: {
            320: {
                cssMode : true,
            },
            701: {
                cssMode : false,
            }
        }
    }
    const __sliderProductImgParams = {
        speed: 500,
        loop: true,
        navigation: __sliderNavigationParams(),
        pagination: __sliderPaginationParams,
        spaceBetween: 10,
        slidesPerView: 1,
    }
    const __sliderProductParams = (sliderNav, sliderPrevButton, sliderNextButton) => {
        return {
            slidesPerView: 1,
            /*freeMode: false,*/
            speed: 500,
            loop:false,
            centeredSlides: true,
            spaceBetween:50,
            /*loopAditionSlides: 12,
            loopedSlides: 12,*/
            allowTouchMove: false,
            breakpoints: {
                320: {
                    cssMode : true,
                },
                701: {
                    cssMode : false,
                }
            },
            navigation: __sliderNavigationParams(sliderPrevButton, sliderNextButton),
            /*thumbs: {
                swiper: sliderNav,
                slideThumbActiveClass: 'product-label--active'
            }*/
        }
    }

    const productSliderNav = new Swiper('.js-product-nav-slider', __sliderProductNavParams);
    const productSlider = new Swiper(".js-product-slider", __sliderProductParams(productSliderNav, '.js-product-prev-button', '.js-product-next-button'));

    productSlider.controller.control = productSliderNav;
    productSliderNav.controller.control = productSlider;

    /*productSlider.on('slideChange', function () {
        productSliderNav.slideToLoop(productSlider.realIndex)
    });*/


    const productObjectNav = new Swiper('.js-object-nav-slider', __sliderProductNavParams);
    const productObjectSlider = new Swiper(".js-object-slider", __sliderProductParams(productObjectNav, '.js-object-prev-button', '.js-object-next-button'));

    productObjectSlider.controller.control = productObjectNav;
    productObjectNav.controller.control = productObjectSlider;


    /*productObjectSlider.on('slideChange', function () {
        productObjectNav.slideToLoop(productObjectSlider.realIndex)
    });*/

    const productImgSlider = new Swiper(".js-product-img-slider", __sliderProductImgParams);

    const popupButtons = document.querySelectorAll('[data-popup]');
    const popups = document.querySelectorAll('.popup');

    if (popups.length) {
        popupButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const popupId = button.dataset.popup
                showPopup(popupId);
            });
        });
    }


    const popupFormArray = document.querySelectorAll('form');

    if (popupFormArray.length) {
        popupFormArray.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();


                const formData = new FormData(form);
            
                fetch("/mail.php", {
                    method: 'POST',
                    body: formData
                })
                    .then(response => {
                        if (response.ok) {
                        } else {
                        }
                    })
                    .catch(error => {
                    });
                showPopup('.popup-thanks');
            });
        })
    }


    [].forEach.call(document.querySelectorAll('.phone-input'), function (input) {
        let keyCode;
        function mask(event) {
            console.log(event.target.value.length)
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault()
            let matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                newValue = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                newValue = newValue.slice(0, i);
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
            if (event.type == "blur" && this.value.length < 5) this.value = "";
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
        input.addEventListener('mouseup', event => {
            event.preventDefault()
            if (input.value.length < 4) {
                input.setSelectionRange(4, 4)
            } else {
                input.setSelectionRange(input.value.length, input.value.length)
            }
        })
    });


    const header = document.querySelector('.header');
    document.addEventListener('scroll', () => {

        const scrollTop = document.documentElement.scrollTop;

        if (scrollTop > 0) {
            header.classList.add('header--fixed')
        } else {
            header.classList.remove('header--fixed')
        }
    });


    document.body.style.setProperty('--scrollbar-width', `${window.innerWidth - document.documentElement.clientWidth}px`)

    
    const productImgArray = document.querySelectorAll('.product__img');
    //var lightbox = new SimpleLightbox('.js-gall .product__img a', { /* options */ });
    if (productImgArray.length) {
        productImgArray.forEach(element => {
            const elementImages = element.querySelectorAll('a');
            // var lightbox = new SimpleLightbox(elementImages, { /* options */ });
        })
    }


});