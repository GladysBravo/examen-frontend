'use strict';

class ToggleMenu {
    constructor() {
        this.restrict = 'A';
    }

    link($scope, $elem) {
        $elem.on('click', (e) => {
            e.preventDefault();

            let $submenu = $elem.next();
            let $items = $submenu.find('a');

            if ($items.length) {                
                if ($elem.parent().hasClass('sidenav-open')) {
                    $elem.next().css('height', 0);
                    $elem.parent().removeClass('sidenav-open');
                    $elem.removeClass('active');
                } else {
                    document.querySelectorAll('#sidenav-menu .sidenav-open').forEach((el) => {
                        el.querySelector('ul').style.height = 0;
                        el.classList.remove('sidenav-open');
                        el.querySelector('.active').classList.remove('active');
                    });
                    $submenu.css('height', ($items.length * $items[0].offsetHeight + 20) + 'px');
                    $elem.parent().addClass('sidenav-open');
                    $elem.addClass('active');
                }
            }
        });
    }
}

export default ToggleMenu;