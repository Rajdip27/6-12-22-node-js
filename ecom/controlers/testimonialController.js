const { validationResult } = require('express-validator');
const TestimonialModel = require('../models/testimonial')
const fs =require("fs");
module.exports={
  index: (req, res, next) => {
   TestimonialModel .find((err,docs)=>{
      if(err){
          require.res.json({error:"Something Went Worng!"+err});
      }
      const testimonial=[];
      docs.forEach(element=>{
        testimonial.push({
          name:element.name,
          image:element.image,
          details:element.details,
          designation:element.designation,
          id:element._id
          });
      });
      res.render('backend/testimonial/index', { title: 'Testimonial',layout:"backend/layout",data:testimonial });
  });


    res.render('backend/testimonial/index', { title: 'Admin testimonial', layout: 'backend/layout' });
  },

  create: (req, res, next) => {
    res.render('backend/testimonial/create', { title: 'Admin testimonial create', layout: 'backend/layout' });
  },

  edit: (req, res, next) => {
    res.render('backend/testimonial/edit', { title: 'Admin testimonial edit', layout: 'backend/layout' });
  },

  delete: (req, res, next) => {
    res.render('index', { title: 'Admin testimonial delete', layout: 'backend/layout' });
  },

  show: (req, res, next) => {
    TestimonialModel.find((err, docs) => {
      if (err) {
        return res.json({ error: "Something went wrong!" + err })
      }
      return res.json({ testimonial: docs });
    })
    res.render('backend/testimonial/show', { title: 'Admin testimonial show', layout: 'backend/layout' });
  },

  store: (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.mapped() });
    }

    let sampleFile;
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image;
        let rnd=new Date().valueOf();
        let filePath='upload/' +rnd+sampleFile.name;
      
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('public/'+filePath, function(err) {
          if (err)
            return res.status(500).send(err);
      
          res.send('File uploaded!');
        });

    const testimonial = new TestimonialModel({
      name: req.body.name,
      image: filePath,
      details: req.body.details,
      designation: req.body.designation
    });

    testimonial.save((err, newTestimonial) => {
      if (err) {
        return res.json({ error: errors.mapped() });
      }
      //return res.json({ testimonial: newTestimonial });
    });
    // return res.json(req.body);
    // res.render('index', { layout: 'backend/layout', });
  },

  update: (req, res, next) => {
    res.render('index', { title: 'Admin testimonial update', layout: 'backend/layout' });
  },

}