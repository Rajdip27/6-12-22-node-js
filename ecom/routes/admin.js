var express = require('express');
var router = express.Router();
const BlogController=require('../controlers/blogControler.js');
const ContactContorller = require('../controlers/contactController');

const TeamContorller = require('../controlers/teamController.js');
const TestimonialController = require('../controlers/testimonialController.js')
const DashboardController=require('../controlers/dashboardController.js');
const aboutController = require('../controlers/aboutController')
const BlogValidator=require('../Validator/blog')
const AboutValidator=require('../Validator/about')
const ContactValidator=require('../Validator/contact')
const TeamValidator=require('../Validator/team')
const TestimonialValidator=require('../Validator/testimonial')




/* GET home page. */
router.get('/',DashboardController.index);
//blog
router.get('/blog', BlogController.index);
router.get('/blog/create', BlogController.create);
router.get('/blog/:id/edit', BlogController.edit);
router.post('/blog/:id/delete', BlogController.delete);
router.get('/blog/:id/show', BlogController.show);
router.post('/blog/store',BlogValidator.store, BlogController.store);
router.post('/blog/:id/update',BlogController.update);

// team
/* GET contact-us page. */
router.get('/contact', ContactContorller.index);

router.get('/contact/create', ContactContorller.create);

router.get('/contact/:id/edit', ContactContorller.edit);

router.post('/contact/:id/delete', ContactContorller.delete);

router.get('/contact/:id/show', ContactContorller.show);

router.post('/contact/store', ContactValidator.store,ContactContorller.store);

router.post('/contact/:id/update',ContactContorller.update);




/* GET Team page. */
/* GET Team page. */
router.get('/team', TeamContorller.index);

router.get('/team/create', TeamContorller.create);

router.get('/team/:id/edit', TeamContorller.edit);

router.post('/team/:id/delete', TeamContorller.delete);

router.get('/team/:id/show', TeamContorller.show);

router.post('/team/store', TeamValidator.store, TeamContorller.store); 

router.post('/team/:id/update',TeamValidator.update, TeamContorller.update);


/* GET Testimonial page. */
router.get('/testimonial', TestimonialController.index);

router.get('/testimonial/create', TestimonialController.create);

router.get('/testimonial/:id/edit', TestimonialController.edit);

router.post('/testimonial/:id/delete', TestimonialController.delete);

router.get('/testimonial/:id/show', TestimonialController.show);

router.post('/testimonial/store',TestimonialValidator.store, TestimonialController.store);

router.post('/testimonial/:id/update',TestimonialController.update);
//about//

router.get('/about', aboutController.index);

router.get('/about/create', aboutController.create);

router.get('/about/:id/edit', aboutController.edit);

router.post('/about/:id/delete', aboutController.delete);

router.get('/about/:id/show', aboutController.show);

router.post('/about/store',AboutValidator.store, aboutController.store); 

router.post('/about/:id/update',AboutValidator.update, aboutController.update);


module.exports = router;
