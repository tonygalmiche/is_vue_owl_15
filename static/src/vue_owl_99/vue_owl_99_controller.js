/** @odoo-module **/
import BasicController from 'web.BasicController';
import core from 'web.core';

var _t = core._t;

var VueOwl99Controller = BasicController.extend({
    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
     * @override
     * @param parent
     * @param model
     * @param renderer
     * @param {Object} params
     * @param {String} params.title The title used in schedule activity dialog
     */
    init: function (parent, model, renderer, params) {
        this._super.apply(this, arguments);
        this.title = params.title;
        this.searchViewId = params.searchViewId;
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * Overridden to remove the pager as it makes no sense in this view.
     *
     * @override
     */
    _getPagingInfo: function () {
        return null;
    },

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------
});

export default VueOwl99Controller;
