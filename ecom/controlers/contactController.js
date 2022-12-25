const { validationResult } = require('express-validator');
const ContactModel = require('../Models/contact')
const fs = require("fs");

module.exports = {
  index: (req, res, next) => {
    ContactModel.find((err, docs) => {
      if (err) {
        require.res.json({ error: "Something Went Worng!" + err });
      }
      const contact = [];
      docs.forEach(element => {
        contact.push({
          title: element.title,
          details: element.details,
          image: element.image,
          id: element._id
        });

      });
      res.render('backend/contact/index', { title: 'Contact', layout: "backend/layout", data: contact });
    });

  },

  create: (req, res, next) => {
    res.render('backend/contact/create', { title: 'Admin Contact create', layout: 'backend/layout' });
  },

  edit: (req, res, next) => {
    ContactModel.findById(req.params.id)
      .then((contact) => {
        // blog list
        const data = {
          title: contact.title,
          id: contact._id,
          details: contact.details,
          image: contact.image
        }
       
        res.render('backend/contact/edit', { title: 'Contact Edit', layout: "backend/layout", Contact: data });
      })



    //res.render('backend/contact/edit', { title: 'Admin Contact edit', layout: 'backend/layout' });
  },

  delete: (req, res, next) => {
    ContactModel.findByIdAndRemove(req.params.id, (err, Contact) => {
      if (err) {
        console.log("Could not deleted=====");
      }
      try {
        fs.unlink("public/" + Contact.image, () => {
          console.log("File Deleted....")
        })


      }
      catch (error) {
        console.log("Something Went Wrong....")

      }

    })
    res.redirect("/admin/contact");


    //es.render('index', { title: 'Admin Contact delete', layout: 'backend/layout' });
  },

  show: (req, res, next) => {

    ContactModel.findById(req.params.id)
      .then((Contact) => {
        // blog list
        const details = {
          title: Contact.title,
          details: Contact.details,
          image: Contact.image
        }
        // console.log(details);
        res.render('backend/blog/show', { title: 'Blog', layout: "backend/layout", blog: details });
      })
      .catch((err) => {
        res.json({ "error": "Somethiong went wrong!" });
      })
  },

  store: (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("backend/contact/create", { layout: "backend/layout", errors: errors.mapped() })
    }

    let sampleFile, filePath;
    if (req.files || Object.keys(req.files).length !== 0) {
      sampleFile = req.files.image;
      let rnd = new Date().valueOf();
      filePath = 'upload/' + rnd + sampleFile.name;

      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv('public/' + filePath, function (err) {
        if (err) {
          res.redirect("/admin/contact/create");
        }

      });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

    const contact = new ContactModel({
      image: filePath,
      title: req.body.title,
      details: req.body.details
    })

    contact.save((err, newContact) => {
      if (err) {
        res.redirect("/admin/contact/create");
      }

      res.redirect("/admin/contact/");
    })


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
          res.redirect("/admin/contact/create");
      });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

    const contactObj = {
      title: req.body.title,
      details: req.body.details

    }
    if (filePath) {
      contactObj.image = filePath;
    }


    ContactModel.findByIdAndUpdate(req.params.id, contactObj, (err, blog) => {
      if (err) {
        res.redirect("/admin/contact/" + req.params.id + "/edit")

      }
      res.redirect("/admin/contact")
    });

    //res.render('index', { title: 'Admin Contact update', layout: 'backend/layout' });
  },


}