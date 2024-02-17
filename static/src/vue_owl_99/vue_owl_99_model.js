/** @odoo-module **/
import BasicModel from 'web.BasicModel';
import session from 'web.session';


const VueOwl99Model = BasicModel.extend({
    __get: function () {
        var result = this._super.apply(this, arguments);
        if (result && result.model === this.modelName && result.type === 'list') {
            _.extend(result, this.additionalData);
            //_.extend(result, this.additionalData, {getKanbanActivityData: this.getKanbanActivityData});
        }

        console.log(result);


        return result;
    },




    /**
     * @override
     * @param {Array[]} params.domain
     */
    __load: function (params) {
        console.log("VueOwl99Model : __load : params=",params); 
        this.originalDomain = _.extend([], params.domain);
        //params.domain.push(['id', '=', false]);
        this.domain = params.domain;
        this.modelName = params.modelName;
        params.groupedBy = [];
        var def = this._super.apply(this, arguments);
        return Promise.all([def, this._fetchData()]).then(function (result) {
            return result[0];
        });
    },
    /**
     * @override
     * @param {Array[]} [params.domain]
     */
    __reload: function (handle, params) {
        console.log("VueOwl99Model : __reload : params=",params); 
        if (params && 'domain' in params) {
            this.originalDomain = _.extend([], params.domain);
            //params.domain.push(['id', '=', false]);
            this.domain = params.domain;
        }
        if (params && 'groupBy' in params) {
            params.groupBy = [];
        }
        var def = this._super.apply(this, arguments);
        return Promise.all([def, this._fetchData()]).then(function (result) {
            return result[0];
        });
    },



    /**
     * Fetch activity data.
     *
     * @private
     * @returns {Promise}
     */
    _fetchData: function () {
        console.log("VueOwl99Model : _fetchData",this); 

        var self = this;
        return this._rpc({
            model: "mail.activity",
            method: 'get_activity_data',
            kwargs: {
                res_model: this.modelName,
                domain: this.domain,
                context: session.user_context,
            }
        }).then(function (result) {

            console.log("VueOwl99Model : _fetchData : additionalData=",result); 


            self.additionalData = result;
        });
    },


    // /**
    //  * Fetch data
    //  *
    //  * @private
    //  * @returns {Promise}
    //  */

    // _fetchData: function () {
    //     var self = this;
    //     console.log("VueOwl99Model : _fetchData",this); 
    // },


    // _fetchData: function () {
    //     var self = this;
    //     return this._rpc({
    //         model: "mail.activity",
    //         method: 'get_activity_data',
    //         kwargs: {
    //             res_model: this.modelName,
    //             domain: this.domain,
    //             context: session.user_context,
    //         }
    //     }).then(function (result) {
    //         self.additionalData = result;
    //     });
    // },









});

export default VueOwl99Model;
