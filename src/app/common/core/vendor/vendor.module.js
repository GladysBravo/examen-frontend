'use strict';

// Cargando elementos de bootstrap que se usarán en el sistema
import Datepicker from './angular-ui-bootstrap/src/datepicker';
import Datepickerpopup from './angular-ui-bootstrap/src/datepickerPopup';
import Dropdown from './angular-ui-bootstrap/src/dropdown';
import Accordion from './angular-ui-bootstrap/src/accordion';
import Alert from './angular-ui-bootstrap/src/alert';
import Buttons from './angular-ui-bootstrap/src/buttons';
import Modal from './angular-ui-bootstrap/src/modal';
import Popover from './angular-ui-bootstrap/src/popover';
import Tabs from './angular-ui-bootstrap/src/tabs';
import Timepicker from './angular-ui-bootstrap/src/timepicker';
import Tooltip from './angular-ui-bootstrap/src/tooltip';

import Waves from './waves/waves.module';

import './vendor.css';

const Vendor = angular
    .module('app.vendor', [
        Datepicker,
        Datepickerpopup,
        Dropdown,
        Accordion,
        Alert,
        Buttons,
        Modal,
        Popover,
        Tabs,
        Timepicker,
        Tooltip,
        Waves
    ])
    .name;

export default Vendor;