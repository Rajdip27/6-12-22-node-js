const { validationResult } = require('express-validator');
const ContactModel = require('../Models/contact')
const fs =require("fs");

module.exports={
  index: (req, res, next)=> {
    ContactModel.find((err,docs)=>{
      if(err){
          require.res.json({error:"Something Went Worng!"+err});
      }
      const Contac=[];
      docs.forEach(element=>{
        Contac.push({
              title:element.title,
              details:element.details,
              image:element.image,
              id:element._id
          });
         
      });
      res.render('backend/contact/index', { title: 'Contact',layout:"backend/layout",data:Contac });
  });
    
  },

  create: (req, res, next)=> {
    res.render('backend/contact/create', { title: 'Admin Contact create', layout: 'backend/layout' });
  },
  
  edit: (req, res, next)=> {
    res.render('backend/contact/edit', { title: 'Admin Contact edit', layout: 'backend/layout' });
  },

  delete: (req, res, next)=> {
    res.render('index', { title: 'Admin Contact delete', layout: 'backend/layout' });
  },

  show: (req, res, next)=> {

     BlogModel.findById(req.params.id)
        .then((blog)=>{
            // blog list
            const details={
                title:blog.title,
                details:blog.details,
                image:blog.image
            }
            // console.log(details);
            res.render('backend/blog/show', { title: 'Blog',layout:"backend/layout",blog:details });
        })
        .catch((err)=>{
            res.json({"error":"Somethiong went wrong!"});
        })
  },

  store: (req, res, next)=> {
   
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.render("backend/contact/create",{layout:"backend/layout",errors:errors.mapped()})
    }

    let sampleFile,filePath;
    if (req.files || Object.keys(req.files).length !== 0) {
      ampleFile = req.files.image;
    let rnd=new Date().valueOf();
    filePath='upload/' +rnd+sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('public/'+filePath, function(err) {
      if (err){
        res.redirect("/admin/contact/create");
      }
        
    });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    
    const contact = new ContactModel({
      image:filePath ,
      title: req.body.title,
      details: req.body.details
    })

    contact.save((err,newContact)=>{
      if(err){
        res.redirect("/admin/contact/create");
      }
      res.redirect("/admin/contact/");
    })

    
  },

  update: (req, res, next)=> {
    res.render('index', { title: 'Admin Contact update', layout: 'backend/layout' });
  },
  
      
}