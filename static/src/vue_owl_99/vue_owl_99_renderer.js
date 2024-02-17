/** @odoo-module **/
import AbstractRendererOwl from 'web.AbstractRendererOwl';
import core  from 'web.core';
import QWeb from 'web.QWeb';
import session from 'web.session';
import utils from 'web.utils';

const _t = core._t;
const { useState } = owl.hooks;
var rpc = require('web.rpc');


class VueOwl99Renderer extends AbstractRendererOwl {
    constructor(parent, props) {
        super(...arguments);
        this.qweb = new QWeb(this.env.isDebug(), {_s: session.origin});
        this.qweb.add_template(utils.json_node_to_xml(props.templates));
 
        this.state = useState({
            partners:[],
        });
    }

    mounted() {
        console.log("VueOwl99Renderer : mounted",this);
    }

    TestButtonClick(ev) {
        console.log("TestButtonClick",ev)
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
        console.log("testRpcWrite")
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
        console.log("testRpcRead")
    }

    async testRpcMethod(s){
        console.log("testRpcMethod : this=",this)

        var self=this;
        rpc.query({
            model: 'res.partner',
            method: 'get_vue_owl_99',
            kwargs: {
                domain: [],
            }
        }).then(function (result) {
            console.log("testRpcMethod : result=",result);
            self.state.partners = result.partners;
        });
    }



}

VueOwl99Renderer.components = {};
VueOwl99Renderer.template = 'is_vue_owl_15.VueOwl99Template';
export default VueOwl99Renderer;
