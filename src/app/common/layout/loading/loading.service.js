'use strict';

class LoadingService {
    constructor() {
        // code
    }

    message(message, block, cancel) {
        var $loading = angular.element(document.querySelector('#loading-progress'));
        var $message = $loading.children('.loading-progress-message').find('span');
        if (block) {
            $loading.addClass('block');
        }
        if (cancel) {
            $loading.addClass('cancel');
        }
        $message.html(message).parent().parent().show();
        $loading.show();
    }

    show() {
        var $loading = angular.element('#loading-progress');
        if ($loading.css('display') == 'none') {
            $loading.show();
        }
    }

    hide() {
        var $loading = angular.element('#loading-progress');
        $loading.removeClass('block').removeClass('cancel');
        $loading.children('.loading-progress-message').hide().children('span').html('');
        $loading.hide();
    }
}

export default LoadingService;