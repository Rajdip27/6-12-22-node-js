const { validationResult } = require('express-validator');
const AboutModel = require('../Models/about')
const fs =require("fs");

module.exports={
    index: (req, res, next)=> {

      AboutModel.find((err,docs)=>{
        if(err){
            require.res.json({error:"Something Went Worng!"+err});
        }
        const about=[];
        docs.forEach(element=>{
          about.push({
                title:element.title1,
                details:element.details,
                image:element.image,
                id:element._id
            });
        });
        res.render('backend/about/index', { title: 'Admin about', layout: 'backend/layout',data:about });
    });

      },

      create: (req, res, next)=> {
        res.render('backend/about/create', { title: 'Admin blog create', layout: 'backend/layout'});
      },
      
      edit: (req, res, next)=> {
        AboutModel.findById(req.params.id)
        .then((about)=>{
            // blog list
            const details={
              title1:about.title1,
              title2:about.title2,
              details:about.details,
              image:about.image,
              map: about.map,
              id:about._id
          }
            // console.log(details);
            res.render('backend/about/edit', { title: 'About Edit',layout:"backend/layout",about:details });
        })


        //res.render('backend/about/edit', { title: 'Admin blog edit', layout: 'backend/layout' });
      },

      delete: (req, res, next)=> {

        AboutModel.findByIdAndRemove(req.params.id,(err,about)=>{
          if(err){
              console.log("Could not deleted=====");
          }
          try{
              fs.unlink("public/"+about.image,()=>{
                  console.log("File Deleted....")
              })


          }
          catch(error){
              console.log("Something Went Wrong....")

          }

      })
      res.redirect("/admin/about");



        //res.render('index', { title: 'Admin blog delete' , layout: 'backend/layout'});
      },

      show: (req, res, next)=> {
        
        AboutModel.findById(req.params.id)
        .then((about)=>{
           
            const details={
                title:about.title1,
                details:about.details,
                image:about.image
            }
            // console.log(details);
            res.render('backend/about/show', { title: 'About',layout:"backend/layout",about:details });
        })
        .catch((err)=>{
            res.json({"error":"Somethiong went wrong!"});
        })
      },

      store: (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.render("backend/about/create",{layout:"backend/layout",errors:errors.mapped()})
        }

        let sampleFile,filePath ;
        if (req.files || Object.keys(req.files).length !== 0) {
          sampleFile = req.files.image;
          let rnd=new Date().valueOf();
           filePath='upload/' +rnd+sampleFile.name;
        
          // Use the mv() method to place the file somewhere on your server
          sampleFile.mv('public/'+filePath, function(err) {
            if (err){
              res.redirect("/admin/about/create");
            }
              
          });
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        

        const about = new AboutModel({
          image: filePath,
          title1: req.body.title1,
          title2: req.body.title2,
          details: req.body.details,
          map: req.body.map
        })

        about.save((err,newAbout)=>{
          if(err){
            res.redirect("admin/about/create")
          }
          res.redirect("/admin/about");
        })

        // return res.json(req.body);
        // res.render('index', { layout: 'backend/layout', });
      },



      update: (req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.json({errors:errors.mapped()});
        }
        let sampleFile,filePath;
        if (req.files ) {
            sampleFile = req.files.image;
            let rnd=new Date().valueOf();
             filePath='upload/' +rnd+sampleFile.name;
          
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv('public/'+filePath, function(err) {
              if (err)
                res.redirect("/admin/about/create");
            });
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
       
        const aboutObj={
          title1: req.body.title1,
          title2: req.body.title2,
          details: req.body.details,
          map: req.body.map
          

        }
        if(filePath){
          aboutObj.image=filePath;
        }
        AboutModel.findByIdAndUpdate(req.params.id,aboutObj,(err,about)=>{
            if(err){
                res.redirect("/admin/about/"+req.params.id+"/edit")

            }
            res.redirect("/admin/about")
        });





        //res.render('index', { title: 'Admin blog update' , layout: 'backend/layout'});
      },
      
}