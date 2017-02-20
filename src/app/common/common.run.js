'use strict';

const runBlock = function () {
    'ngInject';

    //Fullscreen event and hack mozilla
    function exitFullScreen () {
        angular.element(document.body).removeClass('fullscreen');
    }
    
    angular.element(window.document).on('keyup', function(e) {
        if (e.keyCode == 27) {
            exitFullScreen();
        }
    });
    
    document.addEventListener("mozfullscreenchange", function () {
        if (!document.mozFullScreen) {
            exitFullScreen();
        }
    }, false);
};

export default runBlock;