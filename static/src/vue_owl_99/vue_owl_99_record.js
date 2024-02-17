/** @odoo-module **/
import KanbanRecord from 'web.KanbanRecord';

var VueOwl99Record = KanbanRecord.extend({
    /**
     * @override
     */
    init: function (parent, state) {
        this._super.apply(this,arguments);
        console.log("VueOwl99Record : __get : parent,state,this=",parent,state,this); 
        //this.fieldsInfo = state.fieldsInfo.activity;
    },
});

export default VueOwl99Record;
