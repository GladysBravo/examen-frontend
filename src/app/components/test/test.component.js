'use strict';

import controller from './test.controller';
import template from './test.html';

const testComponent = {
  bindings: {
    datos: '=?'
  },
  controller,
  template
};
export default testComponent;
