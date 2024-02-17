/** @odoo-module **/;
import VueOwl02Controller from '@is_vue_owl_15/vue_owl_02/vue_owl_02_controller';
import VueOwl02Model from '@is_vue_owl_15/vue_owl_02/vue_owl_02_model';
import VueOwl02Renderer from '@is_vue_owl_15/vue_owl_02/vue_owl_02_renderer';

import BasicView from 'web.BasicView';
import core from 'web.core';
import RendererWrapper from 'web.RendererWrapper';
import view_registry from 'web.view_registry';

const _lt = core._lt;

const VueOwl02View = BasicView.extend({
    accesskey: "a",
    display_name: _lt('Vue Owl 02'),
    icon: 'fa-search-plus',
    config: _.extend({}, BasicView.prototype.config, {
        Controller: VueOwl02Controller,
        Model: VueOwl02Model,
        Renderer: VueOwl02Renderer,
    }),
    viewType: 'vue_owl_02',
    searchMenuTypes: ['filter', 'favorite'],

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
        console.log("VueOwl02View : getRenderer",state,this);
        state = Object.assign({}, state, this.rendererParams);
        return new RendererWrapper(null, this.config.Renderer, state);
    },
});

view_registry.add('vue_owl_02', VueOwl02View);
export default VueOwl02View;
