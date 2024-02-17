from odoo import api, fields, models

class ResPartner(models.Model):
    _inherit = "res.partner"

    @api.model
    def get_vue_owl_99(self,domain):

        print('get_vue_owl_99 : domain=',domain)


        res=[]
        partners=self.env['res.partner'].search(domain, order="name", limit=10)
        for partner in partners:
            vals={
                "id"      : partner.id,
                "name"    : partner.name,
            }
            res.append(vals)
        print('get_vue_owl_99 : res=',res)
        return {"partners":res}
