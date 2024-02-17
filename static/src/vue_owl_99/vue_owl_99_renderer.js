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
        this.state.activity_types    = this.props.activity_types;
        this.state.additionalPartner = this.props.partners;

        var jours=[];
        for (let i = 1; i <= 2*31; i++) {
            var jour={};
            jour={
                "key": i,
                "style": "cursor:default;background-color:white",
            };
            if (i>10 && i<20){
                jour.style = "cursor:move;background-color:Chartreuse"
            }
            if (i==10 || i==20){
                jour.style = "cursor:col-resize;background-color:Chartreuse"
            }
            jours.push(jour);
        }
        this.state.jours=jours;
    }


    willStart() {
        console.log("VueOwl99Renderer : willStart",this);
    }
    willRender() {
        console.log("VueOwl99Renderer : willRender",this);
    }
    rendered() {
        console.log("VueOwl99Renderer : rendered",this);
    }
     willUpdateProps() {
        console.log("VueOwl99Renderer : willUpdateProps",this);
    }
    willPatch() {
        console.log("VueOwl99Renderer : willPatch",this);
    }
    patched() {
        this.state.additionalPartner = this.props.partners
        console.log("VueOwl99Renderer : patched",this);
    }
    willUnmount() {
        console.log("VueOwl99Renderer : willUnmount",this);
    }
    willDestroy() {
        console.log("VueOwl99Renderer : willDestroy",this);
    }
    onError() {
        console.log("VueOwl99Renderer : onError",this);
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

    TrMouseDown(ev) {
        console.log('TrMouseDown',ev);
    }
    TrMouseMove(ev) {
        console.log('TrMouseMove',ev);
    }
    TrMouseUp(ev) {
        console.log('TrMouseUp',ev);
    }

    // t-on-mousedown="TrMouseDown" 
    // t-on-mousemove="TrMouseMove" 
    // t-on-mouseup="TrMouseUp" 





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
    
    DeleteAdditionalPartnerClick(ev){
        const id=ev.target.attributes.id.value;
        var partners = this.state.additionalPartner;
        partners.forEach((item, index) => {
            console.log(index, item.id);
            if (item.id==id){
                this.state.additionalPartner.splice(index, 1);
                return;
            }
            
        })
    }
    

    VoirPartnerClick(ev) {
        const id=ev.target.attributes.id.value;
        console.log('VoirPartnerClick',this);
        this.env.bus.trigger('do-action', {
            action: {
                name:'Partner',
                type: 'ir.actions.act_window',
                //target: 'new',
                res_id: parseInt(id),
                res_model: 'res.partner',
                views: [[false, 'form']],
            },
        });
    }



    ModifierPartnerClick(ev) {
        const id=ev.target.attributes.id.value;
        console.log('VoirPartnerClick',this);
        this.env.bus.trigger('do-action', {
            action: {
                name:'Partner',
                type: 'ir.actions.act_window',
                target: 'new',
                res_id: parseInt(id),
                res_model: 'res.partner',
                views: [[false, 'form']],
            },
        });
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
