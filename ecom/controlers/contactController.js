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
    ContactModel.find((err,docs)=>{
      if(err){
          return res.json({error:"Something went wrong!"+err})
      }
      return res.json({contact:docs});
  })
    res.render('backend/contact/show', { title: 'Admin Contact show', layout: 'backend/layout' });
  },

  store: (req, res, next)=> {
   
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.mapped()});
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
    const contact = new ContactModel({
      image:filePath ,
      title: req.body.title,
      details: req.body.details
    })

    contact.save((err,newContact)=>{
      if(err){
        return res.json({error:errors.mapped()});
      }
      //return res.json({contact:newContact});
    })

    // return res.json(req.body);
    // res.render('index', { layout: 'backend/layout', });
  },

  update: (req, res, next)=> {
    res.render('index', { title: 'Admin Contact update', layout: 'backend/layout' });
  },
  
      
}