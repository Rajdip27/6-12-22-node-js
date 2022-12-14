const { validationResult } = require('express-validator');
const TestimonialModel = require('../models/testimonial')
const fs = require("fs");
module.exports = {
  index: (req, res, next) => {
    TestimonialModel.find((err, docs) => {
      if (err) {
        require.res.json({ error: "Something Went Worng!" + err });
      }
      const testimonial = [];
      docs.forEach(element => {
        testimonial.push({
          name: element.name,
          image: element.image,
          details: element.details,
          designation: element.designation,
          id: element._id
        });
        // console.log(testimonial);

      });
      res.render('backend/testimonial/index', { title: 'Testimonial', layout: "backend/layout", test: testimonial });

    });


    //res.render('backend/testimonial/index', { title: 'Admin testimonial', layout: 'backend/layout' });
  },

  create: (req, res, next) => {
    res.render('backend/testimonial/create', { title: 'Admin testimonial create', layout: 'backend/layout' });
  },

  edit: (req, res, next) => {
    TestimonialModel.findById(req.params.id)
      .then((Testimonial) => {
        // Testimonial list
        const data = {
          name: Testimonial.name,
          designation: Testimonial.designation,
          id: Testimonial._id,
          details: Testimonial.details,
          image: Testimonial.image,

        }
      
        // console.log(details);
        res.render('backend/testimonial/edit', { title: 'Testimonial Edit', layout: "backend/layout", testimonial: data });
      })
    //res.render('backend/testimonial/edit', { title: 'Admin testimonial edit', layout: 'backend/layout' });
  },

  delete: (req, res, next) => {
    TestimonialModel.findByIdAndRemove(req.params.id, (err, testimonial) => {
      if (err) {
        console.log("Could not deleted=====");
      }
      try {
        fs.unlink("public/" + testimonial.image, () => {
          console.log("File Deleted....")
        })


      }
      catch (error) {
        console.log("Something Went Wrong....")

      }

    })
    res.redirect("/admin/testimonial");
    // res.render('index', { title: 'Admin testimonial delete', layout: 'backend/layout' });
  },

  show: (req, res, next) => {
    TestimonialModel.find((err, docs) => {


      
      TestimonialModel.findById(req.params.id)
        .then((Testimonial)=>{
            // Testimonial list
            const details={
              details:Testimonial.details,
              name:Testimonial.name,
                image:Testimonial.image,
                designation:Testimonial.designation
            }
            // console.log(details);
            res.render('backend/testimonial/show', { title: 'testimonial show',layout:"backend/layout",Testimonial:details });
        })
        .catch((err)=>{
            res.json({"error":"Somethiong went wrong!"});
        })
    })
    //res.render('backend/testimonial/show', { title: 'Admin testimonial show', layout: 'backend/layout' });
  },

  store: (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("backend/testimonial/create", { layout: "backend/layout", errors: errors.mapped() })
    }

    let sampleFile, filePath;
    if (req.files || Object.keys(req.files).length !== 0) {
      sampleFile = req.files.image;
      let rnd = new Date().valueOf();
      filePath = 'upload/' + rnd + sampleFile.name;

      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv('public/' + filePath, function (err) {
        if (err) {
          res.redirect("admin/testimonial/create")

        }


      });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file


    const testimonial = new TestimonialModel({
      name: req.body.name,
      image: filePath,
      details: req.body.details,
      designation: req.body.designation
    });

    testimonial.save((err, newTestimonial) => {
      if (err) {
        res.redirect("admin/testimonial/create")

      }
      res.redirect("/admin/testimonial");
      //return res.json({ testimonial: newTestimonial });
    });
    // return res.json(req.body);
    // res.render('index', { layout: 'backend/layout', });
  },

  update: (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.mapped() });
    }
    let sampleFile, filePath;
    if (req.files) {
      sampleFile = req.files.image;
      let rnd = new Date().valueOf();
      filePath = 'upload/' + rnd + sampleFile.name;

      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv('public/' + filePath, function (err) {
        if (err)
          res.redirect("/admin/testimonial/create");
      });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

    const testimonialObj = {
      name: req.body.name,
      designation: req.body.designation,
      details: req.body.details

    }
    if (filePath) {
      testimonialObj.image = filePath;
    }


    TestimonialModel.findByIdAndUpdate(req.params.id,  testimonialObj, (err, testimonial) => {
      if (err) {
        res.redirect("/admin/testimonial/" + req.params.id + "/edit")

      }
      res.redirect("/admin/testimonial")
    });

    //res.render('index', { title: 'Admin testimonial update', layout: 'backend/layout' });
  },

}