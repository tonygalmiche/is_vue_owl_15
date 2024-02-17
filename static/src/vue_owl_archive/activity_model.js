/** @odoo-module **/
import BasicModel from 'web.BasicModel';
import session from 'web.session';

const ActivityModel = BasicModel.extend({
    __get: function () {
        var result = this._super.apply(this, arguments);
        return result;
    },

    /**
     * @override
     * @param {Array[]} params.domain
     */
    __load: function (params) {
        this.originalDomain = _.extend([], params.domain);
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
        if (params && 'domain' in params) {
            this.originalDomain = _.extend([], params.domain);
            //params.domain.push(['activity_ids', '!=', false]);
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
     * Fetch data
     *
     * @private
     * @returns {Promise}
     */

    _fetchData: function () {
        var self = this;
        console.log("ActivityModel : _fetchData",this); 
        return this._rpc({
            model: this.modelName,
            method: 'get_chantiers',
            kwargs: {
                //res_model: this.modelName,
                domain: this.domain,
                //context: session.user_context,
            }
        }).then(function (result) {
            //self.additionalData = result.chantiers;
            console.log("ActivityModel : _fetchData : self=",self);
            console.log("ActivityModel : _fetchData : result=",result);
            //self.props.chantiers = result.chantiers;
        });
    },
});

export default ActivityModel;
