/** @odoo-module **/;
import ActivityController from '@is_clair_sarl/activity2/activity_controller';
import ActivityModel from '@is_clair_sarl/activity2/activity_model';
import ActivityRenderer from '@is_clair_sarl/activity2/activity_renderer';
import BasicView from 'web.BasicView';
import core from 'web.core';
import RendererWrapper from 'web.RendererWrapper';
import view_registry from 'web.view_registry';

const _lt = core._lt;

const ActivityView = BasicView.extend({
    accesskey: "a",
    display_name: _lt('Activity 2'),
    icon: 'fa-search-plus',
    config: _.extend({}, BasicView.prototype.config, {
        Controller: ActivityController,
        Model: ActivityModel,
        Renderer: ActivityRenderer,
    }),
    viewType: 'activity2',
    searchMenuTypes: ['filter', 'favorite'],

    /**
     * @override
     */
    init: function (viewInfo, params) {
        this._super.apply(this, arguments);
        const { search_view_id } = params.action || {};
        this.controllerParams.searchViewId = search_view_id ? search_view_id[0] : false;
        //this.loadParams.type = 'list';
        //this.loadParams.limit = false;
        this.rendererParams.templates = _.findWhere(this.arch.children, { 'tag': 'templates' });
        this.controllerParams.title = this.arch.attrs.string;
    },
    /**
     *
     * @override
     */
    getRenderer(parent, state) {
        console.log("ActivityView : getRenderer",state,this);
        state = Object.assign({}, state, this.rendererParams);
        return new RendererWrapper(null, this.config.Renderer, state);
    },
});

view_registry.add('activity2', ActivityView);
export default ActivityView;
