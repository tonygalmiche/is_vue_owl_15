/** @odoo-module **/

import KanbanRecord from 'web.KanbanRecord';


console.log("## TEST ActivityRecord")


var ActivityRecord = KanbanRecord.extend({
    /**
     * @override
     */
    init: function (parent, state) {
        this._super.apply(this,arguments);

        //this.fieldsInfo = state.fieldsInfo.activity;
    },


});

export default ActivityRecord;
