/** @odoo-module **/;
import BasicController from 'web.BasicController';
import BasicModel from 'web.BasicModel';
import AbstractRendererOwl from 'web.AbstractRendererOwl';
import BasicView from 'web.BasicView';
import core from 'web.core';
import RendererWrapper from 'web.RendererWrapper';
import view_registry from 'web.view_registry';

AbstractRendererOwl.template = 'is_vue_owl_15.VueOwl01Template';

const _lt = core._lt;

const VueOwl01View = BasicView.extend({
    accesskey      : "w",
    display_name   : _lt('Vue Owl 01'),
    icon           : 'fa-search-plus',
    viewType       : 'vue_owl_01',
    searchMenuTypes: ['filter', 'favorite'],

    config: _.extend({}, BasicView.prototype.config, {
        Controller: BasicController,
        Model: BasicModel,
        Renderer: AbstractRendererOwl,
    }),

    /**
     * @override
     */
    init: function (viewInfo, params) {
        this._super.apply(this, arguments);
        const { search_view_id } = params.action || {};
        this.controllerParams.searchViewId = search_view_id ? search_view_id[0] : false;
        this.loadParams.type = 'list';
        this.loadParams.limit = 8; //false;
        this.rendererParams.templates = _.findWhere(this.arch.children, { 'tag': 'templates' });
        this.controllerParams.title = this.arch.attrs.string;
    },
    /**
     *
     * @override
     */
    getRenderer(parent, state) {
        console.log("VueOwl01View : getRenderer",state,this);
        state = Object.assign({}, state, this.rendererParams);
        return new RendererWrapper(null, this.config.Renderer, state);
    },
});

view_registry.add('vue_owl_01', VueOwl01View);
export default VueOwl01View;
