'use strict';

import CInputComponent from './c-input/c-input.component';
import CInputMoneyComponent from './c-input-money/c-input-money.component';
import CSelectComponent from './c-select/c-select.component';
import CTextAreaComponent from './c-textarea/c-textarea.component';

import CCheckboxComponent from './c-checkbox/c-checkbox.component';
import CRadioButton from './c-radiobutton/c-radiobutton.component';
import CDateComponent from './c-date/c-date.component';
import CSelectSeccionDivision from './c-select-seccion-division/c-select-seccion-division.component';
import CSelectGrupoClase from './c-select-grupo-clase/c-select-grupo-clase.component';
import CSelectDPA from './c-select-dpa/c-select-dpa.component';
import CInputTagsComponent from './c-input-tags/c-input-tags.component';
import CInputChipsComponent from './c-input-chips/c-input-chips.component';
import NoIncluyeDirective from './c-input/no-incluye.directive';
const UiComponentsModule = angular
    .module('app.uicomponents', [])
    .component('cInput', CInputComponent)
    .component('cInputMoney',CInputMoneyComponent)
    .component('cSelect',CSelectComponent)
    .component('cCheckbox',CCheckboxComponent)
    .component('cRadiobutton',CRadioButton)
    .component('cTextarea',CTextAreaComponent)
    .component('cDate',CDateComponent)
    .component('cSelectSeccionDivision',CSelectSeccionDivision)
    .component('cSelectGrupoClase',CSelectGrupoClase)
    .component('cSelectDpa',CSelectDPA)
    .component('cInputTags',CInputTagsComponent)
    .component('cInputChips',CInputChipsComponent)
    .directive('noIncluye', () => new NoIncluyeDirective())
    .name;

export default UiComponentsModule;
