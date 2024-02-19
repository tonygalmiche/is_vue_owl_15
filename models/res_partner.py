from odoo import api, fields, models

class ResPartner(models.Model):
    _inherit = "res.partner"

    @api.model
    def get_vue_owl_99(self,domain):

        print('get_vue_owl_99 : domain=',domain)

        res=[]
        partners=self.env['res.partner'].search(domain, order="name", limit=100)
        trcolor=""
        for partner in partners:

            if trcolor=="#ffffff":
                trcolor="#f2f3f4"
            else:
                trcolor="#ffffff"
            trstyle="background-color:%s"%(trcolor)

            vals={
                "id"      : partner.id,
                "name"    : partner.name,
                "trstyle" : trstyle,
            }
            res.append(vals)
        print('get_vue_owl_99 : res=',res)
        return {"partners":res}
