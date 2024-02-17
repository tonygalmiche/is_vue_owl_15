/** @odoo-module **/
import AbstractRendererOwl from 'web.AbstractRendererOwl';
import core  from 'web.core';
import QWeb from 'web.QWeb';
import session from 'web.session';
import utils from 'web.utils';

const _t = core._t;
const { useState } = owl.hooks;
var rpc = require('web.rpc');


class VueOwl02Renderer extends AbstractRendererOwl {
    constructor(parent, props) {
        super(...arguments);
        this.qweb = new QWeb(this.env.isDebug(), {_s: session.origin});
        this.qweb.add_template(utils.json_node_to_xml(props.templates));
        this.state = useState({
        });
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
        console.log("VueOwl02Renderer : setup",this);
    }
    willStart() {
        console.log("VueOwl02Renderer : willStart",this);
    }
    willRender() {
        console.log("VueOwl02Renderer : willRender",this);
    }
    rendered() {
        console.log("VueOwl02Renderer : rendered",this);
    }
    mounted() {
        console.log("VueOwl02Renderer : mounted",this);
    }
    willUpdateProps() {
        console.log("VueOwl02Renderer : willUpdateProps",this);
    }
    willPatch() {
        console.log("VueOwl02Renderer : willPatch",this);
    }
    patched() {
        console.log("VueOwl02Renderer : patched",this);
    }
    willUnmount() {
        console.log("VueOwl02Renderer : willUnmount",this);
    }
    willDestroy() {
        console.log("VueOwl02Renderer : willDestroy",this);
    }
    onError() {
        console.log("VueOwl02Renderer : onError",this);
    }
}

VueOwl02Renderer.components = {};
VueOwl02Renderer.template = 'is_vue_owl_15.VueOwl02Template';
export default VueOwl02Renderer;
