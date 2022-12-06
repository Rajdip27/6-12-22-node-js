const { validationResult } = require('express-validator');
const TeamModel = require('../Models/team')
const fs =require("fs");
module.exports={
    index: (req, res, next)=> {
      TeamModel.find((err,docs)=>{
        if(err){
          return res.json({error:"Something went wrong!"+err})
        }
        const team=[];
        docs.forEach(element=>{
          team.push({
            name:element.name,
            designation:element.designation,
            image:element.image,
            id:element._id

          })
        })
        res.render('backend/team/index', { title: 'Admin team', layout: 'backend/layout',data:team });

      })


        
      },

      create: (req, res, next)=> {
        res.render('backend/team/create', { title: 'Admin team create', layout: 'backend/layout' });
      },
      
      edit: (req, res, next)=> {
        TeamModel.findById(req.params.id)
        .then((team)=>{
            // blog list
            const details={
              name: team.name,
              image:team.image,
              designation: team.designation,
              facebook: team.facebook,
              twitter: team.twitter,
              instagram: team.instagram,
              linked: team.linked,
              id:team._id
            }
            // console.log(details);
            res.render('backend/team/edit', { title: 'Blog Edit',layout:"backend/layout",team:details });
        })




        //res.render('backend/team/edit', { title: 'Admin team edit', layout: 'backend/layout' });
      },

      delete: (req, res, next)=> {

        TeamModel.findByIdAndRemove(req.params.id,(err,about)=>{
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
          res.redirect("/admin/team");

      })
      
        //res.render('index', { title: 'Admin team delete', layout: 'backend/layout' });
      },

      show: (req, res, next)=> {
        TeamModel.findById(req.params.id)
        .then((team)=>{
            // blog list
            const details={
                name:team.name,
                designation:team.designation,
                image:team.image
            }
            // console.log(details);
            res.render('backend/team/show', { title: 'Team',layout:"backend/layout",team:details });
        })
        .catch((err)=>{
            res.json({"error":"Somethiong went wrong!"});
        })
        // res.render('index', { title: 'Admin team show' });
      },

      store: (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({error:errors.mapped()});
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



        const team = new TeamModel({
          name: team.name,
          image: filePath,
          designation: team.designation,
          facebook: team.facebook,
          twitter: team.twitter,
          instagram: team.instagram,
          linked: team.linked
        })

        team.save((err,newTeam)=>{
          if(err){
            return res.json({error:errors.mapped()});
          }
          
          //return res.json({team:newTeam});
        })



        // res.render('index', { title: 'Admin team store' });
      },

      update: (req, res, next)=> {
        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.json({errors:errors.mapped()});
        }
        let sampleFile,filePath;

        if (req.files) {
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.image;
            let rnd=new Date().valueOf();
            filePath='upload/' +rnd+sampleFile.name;
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv('public/'+filePath, function(err) {
                if (err)
                res.redirect("/admin/team/"+req.params.id+"/edit");
            });
        }
        const TeamObj={
          name: req.body.name,
          designation: req.body.designation,
          facebook: req.body.facebook,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
          linked: req.body.linked
        };

        if(filePath){
          TeamObj.image=filePath;
        }

        // /
        TeamModel.findByIdAndUpdate(req.params.id,TeamObj,(err,blog)=>{
            if(err){
                res.redirect("/admin/team/"+req.params.id+"/edit");
            }
            res.redirect("/admin/team");
        });

        //res.render('index', { title: 'Admin team update', layout: 'backend/layout'  });
      },
      
}