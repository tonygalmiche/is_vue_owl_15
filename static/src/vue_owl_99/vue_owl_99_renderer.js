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
 
        //useState permet de faire un lien entre la vue XML et l'Object Javascript
        //Chaque modification de l'objet this.state entraine une modification de l'interface utilisateur
        this.state = useState({
            partners:[],
            activity_types:[]
        });
    }

    mounted() {
        console.log("VueOwl99Renderer : mounted",this);
        //Copies des données du model dans this.state pour être affichée dans la vue XML et modifiés directement
        this.state.activity_types = this.props.activity_types
    }




    TrMouseLeave(ev) {
        const click=ev.target.attributes.click.value;
        if (click!="1"){
            const memstyle = ev.target.attributes.memstyle.value;
            ev.target.style=memstyle;
        }
    }

    TrMouseEnter(ev) {
        const click=ev.target.attributes.click.value;
        if (click!="1"){
            ev.target.style="background-color:#FFFF00";
        }
    }

    TrClick(ev) {
        //var click=parseInt(ev.target.parentElement.attributes.click.value);
        var click=ev.target.parentElement.attributes.click;
        if (click!==undefined){
            click.value=-click.value
            if (click.value==1){
                ev.target.parentElement.style="background-color:rgb(204, 255, 204)";
            } else {
                const memstyle = ev.target.parentElement.attributes.memstyle.value;
                ev.target.parentElement.style=memstyle;
            }
            ev.target.parentElement.attributes.click.value=click.value;
        }
    }


    DeleteClick(ev){
        var id=ev.target.attributes.id.value;
        var partners = this.state.partners;
        partners.forEach((item, index) => {
            console.log(index, item.id);
            if (item.id==id){
                this.state.partners.splice(index, 1);
                return;
            }
            
        })
    }


    ActivityClearClick(ev){
        console.log("ActivityClearClick",this)
        this.state.activity_types=[]; // Le fait d'éffacer ce tableau entraine une modification directe de l'affichage utilisateur grace à useState

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
