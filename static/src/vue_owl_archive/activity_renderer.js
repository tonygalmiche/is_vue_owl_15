/** @odoo-module **/
import AbstractRendererOwl from 'web.AbstractRendererOwl';
import core  from 'web.core';
import QWeb from 'web.QWeb';
import session from 'web.session';
import utils from 'web.utils';
//import rpc from 'web.rpc';


//import { useService } from "@web/core/utils/hooks";



const _t = core._t;
const { useState } = owl.hooks;
var rpc = require('web.rpc');


// class DhtmlxGanttOtRenderer extends AbstractRendererOwl {
//     constructor(parent, props) {
//         super(...arguments);
//         this.qweb = new QWeb(this.env.isDebug(), { _s: session.origin });
//         this.state   = useState({
//             localItems: props.items || [],
//             //'gantt' : {},
//         });
//     }


class ActivityRenderer extends AbstractRendererOwl {
    constructor(parent, props) {
        super(...arguments);
        this.qweb = new QWeb(this.env.isDebug(), {_s: session.origin});
        this.qweb.add_template(utils.json_node_to_xml(props.templates));

        this.state = useState({
            chantiers:[],
        });


        //this.rpc = useService("rpc");
    




        // this.activeFilter = useState({
        //     state: null,
        //     activityTypeId: null,
        //     resIds: [],
        //     chantiers:[],
        // });
        // this.widgetComponents = {
        // };
    }

    // Lifecycle Owl Component => https://github.com/odoo/owl/blob/master/doc/reference/component.md
    // - setup
    // - willStart
    // - willRender
    // - rendered
    // - mounted
    // - willUpdateProps
    // - willPatch
    // - patched
    // - willUnmount
    // - willDestroy
    // - onError

    setup() {
        console.log("ActivityRenderer : setup",this);
    }
    willStart() {
        console.log("ActivityRenderer : willStart",this);
    }
    willRender() {
        console.log("ActivityRenderer : willRender",this);
    }
    rendered() {
        console.log("ActivityRenderer : rendered",this);
    }
    mounted() {
        console.log("ActivityRenderer : mounted",this);
    }
    willUpdateProps() {
        console.log("ActivityRenderer : willUpdateProps",this);
    }
    willPatch() {
        console.log("ActivityRenderer : willPatch",this);
    }
    patched() {
        console.log("ActivityRenderer : patched",this);
    }
    willUnmount() {
        console.log("ActivityRenderer : willUnmount",this);
    }
    willDestroy() {
        console.log("ActivityRenderer : willDestroy",this);
    }
    onError() {
        console.log("ActivityRenderer : onError",this);
    }


    TestClick(ev) {
        console.log("TestClick",ev)
        this.testRpcWrite();
        this.testRpcRead();
        this.testRpcMethod();
    }

    async testRpcWrite(s){
        var vals={
            "name": "3IA Auxerre 2222",
        }

        var prom = rpc.query({
            model: 'res.partner',
            method: 'write',
            args: [[108], vals],
        });
    }

    async testRpcRead(s){
        rpc.query({
            model: 'product.product',
            method: 'search_read',
            args: [[], ['id','name']],
            kwargs: {
                limit: 10,
            }
        }).then(function (products) {
            console.log(products);
        });
    }

    async testRpcMethod(s){
        var self=this;
        rpc.query({
            model: 'is.chantier',
            method: 'get_chantiers',
            kwargs: {
                domain: [],
            }
        }).then(function (result) {
            console.log("ActivityModel : _fetchData : this=",this);
            console.log("ActivityModel : _fetchData : result=",result);
            self.state.chantiers = result.chantiers;
        });
    }
}

ActivityRenderer.components = {};
ActivityRenderer.template = 'is_clair_sarl.ActivityRenderer';
export default ActivityRenderer;
