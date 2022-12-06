const{validationResult}=require('express-validator');
const BlogModel=require('../models/blog');
const fs =require("fs");
module.exports={
    index:(req, res, next)=> {
        // blog list
        BlogModel.find((err,docs)=>{
            if(err){
                require.res.json({error:"Something Went Worng!"+err});
            }
            const blog=[];
            docs.forEach(element=>{
                blog.push({
                    title:element.title,
                    details:element.details,
                    image:element.image,
                    id:element._id
                });
            });
            res.render('backend/blog/index', { title: 'Blogs',layout:"backend/layout",data:blog });
        });
    },
    create:(req, res, next)=> {
        // blog list
        res.render('backend/blog/create', { title: 'Blog Create', layout: 'backend/layout' })
    },
    edit:(req, res, next)=> {
        BlogModel.findById(req.params.id)
        .then((blog)=>{
            // blog list
            const details={
                title:blog.title,
                slug:blog.slug,
                id:blog._id,
                details:blog.details,
                image:blog.image
            }
            // console.log(details);
            res.render('backend/blog/edit', { title: 'Blog Edit',layout:"backend/layout",blog:details });
        })
        // blog list
        //res.render('index', { title: 'blogs' });
    },
    show:(req, res, next)=> {
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
    delete:(req, res, next)=> {
        // blog list

        // BlogModel.findByIdAndRemove(req.params.id).then(()=>{
        //     console.log("deleted");
        // })
        // .catch((error)=>{
        //     console.log("could not deleted due to " +error);
          

        // })
        BlogModel.findByIdAndRemove(req.params.id,(err,blog)=>{
            if(err){
                console.log("Could not deleted=====");
            }
            try{
                fs.unlink("public/"+blog.image,()=>{
                    console.log("File Deleted....")
                })


            }
            catch(error){
                console.log("Something Went Wrong....")

            }

        })
        res.redirect("/admin/blog");
       
    },
    update:(req, res, next)=> {

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
                res.redirect("/admin/blog/create");
            });
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
       
        const blogObj={
            title:req.body.title,
            slug:req.body.slug,
            details:req.body.details

        }
        if(filePath){
            blogObj.image=filePath;
        }

        
        BlogModel.findByIdAndUpdate(req.params.id,blogObj,(err,blog)=>{
            if(err){
                res.redirect("/admin/blog/"+req.params.id+"/edit")

            }
            res.redirect("/admin/blog")
        });
        // blog list
       // res.render('index', { title: 'blogs' });
    },
    store:(req, res, next)=> {

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


        const blog=new BlogModel({
            title:req.body.title,
            slug:req.body.slug,
            details:req.body.details,
            image:filePath
        });

        blog.save((err,newBlog)=>{
            if(err){
              return res.json({error:"Something went wrong!"+err})
            }
           // return res.json({blog:newBlog});

          // res.redirect("/admin/blog")
          //res.redirect("/admin/blog");
           
        });



      
    }
}