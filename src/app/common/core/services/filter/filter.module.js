'use strict';

import FilterService from './filter.service';

import './filter.scss';

const Filter = angular
    .module('app.service.filter', [])
    .service('Filter', FilterService)
    .directive('integer', (Filter) => {
        return (scope, element) => {
            element.bind("keydown", (e) => {
                Filter.integer(e);
            });
        };
    })
    .directive('decimal', (Filter) => {
        return (scope, element) => {
            element.bind("keydown", (e) => {
                Filter.decimal(e);
            });
        };
    })
    .directive('numeric', (Filter) => {
        return (scope, element) => {
            element.bind("keydown", (e) => {
                Filter.numeric(e);
            });
        };
    })
    .directive('alpha', (Filter) => {
        return (scope, element) => {
            element.bind("keydown", (e) => {
                Filter.alpha(e);
            });
        };
    })
    .directive('alphaNumeric', (Filter) => {
        return (scope, element) => {
            element.bind("keydown", (e) => {
                Filter.alphaNumeric(e);
            });
        };
    })
    .directive('alphaDash', (Filter) => {
        return (scope, element) => {
            element.bind("keydown", (e) => {
                Filter.alphaDash(e);
            });
        };
    })
    .directive('uppercase', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.$parsers.push(function(input) {
                    return input ? input.toUpperCase() : "";
                });
                element.css("text-transform","uppercase");
            }
        };
    })
    .directive('nit', (Filter) => {
        let $error = angular.element('<div class="md-error-nit">NIT inválido</div>');

        return (scope, element) => {
            element.bind("keydown", (e) => {
                Filter.numeric(e);
            }).bind("keyup", () => {
                let isNit = Filter.isNit(element[0].value);
                let $element = angular.element(element[0]).parent();
                if (isNit) {
                    $element.removeClass('md-input-invalid');
                    $element.children('.md-error-nit').remove();
                } else {
                    $element.addClass('md-input-invalid');
                    $element.append($error);
                }
            });
        };
    })
    .name;

export default Filter;