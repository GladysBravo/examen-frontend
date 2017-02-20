'use strict';

import controller from './crud-table.controller';

const CrudTableComponent = {
    bindings: {},
    controller,
    template: `
        <div class="crud-table">
            <table>
                <thead>
                    <tr>
                        <th>Uno</th>
                        <th>Dos</th>
                        <th>Tres</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
};

export default CrudTableComponent;