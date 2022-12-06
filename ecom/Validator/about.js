const { check } = require('express-validator');

exports.store=[
   
    check('title1', "Invalid title").not().isEmpty().trim(),
    check('title2', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('image', "Invalid image"),
    check('map', "Invalid map").not().isEmpty().trim(),
   
]

exports.update=[
    check('title1', "Invalid title").not().isEmpty().trim(),
    check('title2', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('image', "Invalid image"),
    check('map', "Invalid map").not().isEmpty().trim(),
]