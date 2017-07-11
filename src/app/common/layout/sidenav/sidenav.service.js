'use strict';

class SidenavService {
    constructor($location) {
        'ngInject';

        this.$location = $location;
    }

    $onInit() {

    }

    path(url) {
        this.$location.path(url);

        setTimeout(() => {
            let origin = null;
            let el = document.querySelector('#sidenav-menu .sidenav-submenu-item.active');
            if (el) {
                el.classList.remove('active');
                origin = el.parentNode.parentNode.previousElementSibling.getAttribute('data-url');
            }

            el = document.querySelector(`#sidenav-menu .sidenav-submenu-item[data-url=${url}]`);
            if (el) {
                el.classList.add('active');
                el = el.parentNode.parentNode.previousElementSibling;
                if (el.getAttribute('data-url') != origin) {
                    el.dispatchEvent(new window.Event('click'));
                }
            }
        }, 100);
    }
}

export default SidenavService;