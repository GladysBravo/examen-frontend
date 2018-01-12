'use strict';

import controller from './registro.controller';
import template from './registro.html';

const registroComponent = {
  bindings: {
    datos: '=',
    data: '='
  },
  controller,
  template
};
export default registroComponent;
