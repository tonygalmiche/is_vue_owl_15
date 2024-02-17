from odoo import fields, models


class View(models.Model):
    _inherit = "ir.ui.view"

    type = fields.Selection(selection_add=[
        ("vue_owl_01", "Vue OWL 01"),
        ("vue_owl_02", "Vue OWL 02"),
        ("vue_owl_99", "Vue OWL 99"),
    ])

