# -*- coding: utf-8 -*-
{
    "name"     : " Exemples de vues OWL pour Odoo 15 ",
    "version"  : "0.1",
    "author"   : "InfoSaône",
    "category" : "InfoSaône",
    "description": """
 Exemples de vues OWL pour Odoo 15 
===================================================
""",
    "maintainer" : "InfoSaône",
    "website"    : "http://www.infosaone.com",
    "depends"    : [
        "base",
        "sale_management",
        "web",
    ],
    "data" : [
        "views/is_vue_owl_15_views.xml",
    ],
    'assets': {
        'web.assets_backend': [
            'is_vue_owl_15/static/src/vue_owl_01/vue_owl_01_view.js',

            'is_vue_owl_15/static/src/vue_owl_02/vue_owl_02_controller.js',
            'is_vue_owl_15/static/src/vue_owl_02/vue_owl_02_model.js',
            'is_vue_owl_15/static/src/vue_owl_02/vue_owl_02_record.js',
            'is_vue_owl_15/static/src/vue_owl_02/vue_owl_02_renderer.js',
            'is_vue_owl_15/static/src/vue_owl_02/vue_owl_02_view.js',

            'is_vue_owl_15/static/src/vue_owl_99/vue_owl_99_controller.js',
            'is_vue_owl_15/static/src/vue_owl_99/vue_owl_99_model.js',
            'is_vue_owl_15/static/src/vue_owl_99/vue_owl_99_record.js',
            'is_vue_owl_15/static/src/vue_owl_99/vue_owl_99_renderer.js',
            'is_vue_owl_15/static/src/vue_owl_99/vue_owl_99_view.js',
        ],
        'web.assets_qweb': [
            'is_vue_owl_15/static/src/vue_owl_01/vue_owl_01_view.xml',
            'is_vue_owl_15/static/src/vue_owl_02/vue_owl_02_view.xml',
            'is_vue_owl_15/static/src/vue_owl_99/vue_owl_99_view.xml',
        ],
     },
    "installable": True,
    "application": True,
    "license": "LGPL-3",
}
