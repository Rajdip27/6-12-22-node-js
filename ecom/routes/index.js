var express = require('express');
var router = express.Router();

var forntendController = require('../controlers/forntendController');

/* GET home page. */
router.get('/', forntendController.home);
router.get('/blog', forntendController.blogs);
router.get('/testimonial', forntendController.testimonials);
router.get('/team', forntendController.team);
router.get('/contact_us', forntendController.contactUs);
router.get('/about', forntendController.about);

module.exports = router;
