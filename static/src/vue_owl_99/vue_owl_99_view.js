/** @odoo-module **/;
import VueOwl99Controller from '@is_vue_owl_15/vue_owl_99/vue_owl_99_controller';
import VueOwl99Model from '@is_vue_owl_15/vue_owl_99/vue_owl_99_model';
import VueOwl99Renderer from '@is_vue_owl_15/vue_owl_99/vue_owl_99_renderer';

import BasicView from 'web.BasicView';
import core from 'web.core';
import RendererWrapper from 'web.RendererWrapper';
import view_registry from 'web.view_registry';

const _lt = core._lt;

const VueOwl99View = BasicView.extend({
    accesskey: "a",
    display_name: _lt('Vue Owl 99'),
    icon: 'fa-search-plus',
    config: _.extend({}, BasicView.prototype.config, {
        Controller: VueOwl99Controller,
        Model: VueOwl99Model,
        Renderer: VueOwl99Renderer,
    }),
    viewType: 'vue_owl_99',
    searchMenuTypes: ['filter', 'favorite'],

    /**
     * @override
     */
    init: function (viewInfo, params) {
        this._super.apply(this, arguments);
        const { search_view_id } = params.action || {};
        this.controllerParams.searchViewId = search_view_id ? search_view_id[0] : false;
        this.loadParams.type = 'list';
        this.loadParams.limit = 2; //false;
        this.rendererParams.templates = _.findWhere(this.arch.children, { 'tag': 'templates' });
        this.controllerParams.title = this.arch.attrs.string;
    },
    /**
     *
     * @override
     */
    getRenderer(parent, state) {
        console.log("VueOwl99View : getRenderer",state,this);
        state = Object.assign({}, state, this.rendererParams);
        return new RendererWrapper(null, this.config.Renderer, state);
    },
});

view_registry.add('vue_owl_99', VueOwl99View);
export default VueOwl99View;
