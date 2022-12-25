// const { config } = require("dotenv");

const config=require('./../config/index')
const BlogModel=require('../models/blog');
const TestimonialModel = require('../models/testimonial')
const TeamModel = require('../Models/team')
const ContactModel = require('../Models/contact')
const AboutModel = require('../Models/about')


module.exports={
    home:(req,res,next)=>{
      BlogModel.find((err,docs)=>{
        if(err){
            require.res.json({error:"Something Went Worng!"+err});
        }
        const blog=[];
        docs.forEach(element=>{
            blog.push({
                image:element.image,
                
            });
        });
        //res.render('backend/blog/index', { title: 'Blogs',layout:"backend/layout",data:blog });
        //res.render('forntend/blog',{title:'home',data:blog });
        res.render('forntend/index',{title:'home',data:blog});
    });


       
    },
    blogs:(req,res,next)=>{
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
                    
                });
            });
            //res.render('backend/blog/index', { title: 'Blogs',layout:"backend/layout",data:blog });
            res.render('forntend/blog',{title:'home',data:blog });
        });

        
    },
    testimonials:(req,res,next)=>{
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
                
              });
              // console.log(testimonial);
      
            });
            //res.render('backend/testimonial/index', { title: 'Testimonial', layout: "backend/layout", test: testimonial });
            res.render('forntend/testimonial',{title:'home',test: testimonial});
      
          });
      
       
    },
    team:(req,res,next)=>{
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
                facebook:element.facebook,
                twitter:element.twitter,
                instagram:element.instagram,
                linked:element.linked

                
    
              })
            })
           // res.render('backend/team/index', { title: 'Admin team', layout: 'backend/layout',data:team });
           res.render('forntend/team',{title:'home',data:team});
    
          })
        
    },
    contactUs:(req,res,next)=>{
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
            
          });
  
        });
        //res.render('backend/contact/index', { title: 'Contact', layout: "backend/layout", data: contact });
        res.render('forntend/contact_us',{title:'home',Contact:contact});
      });
        
    },
    about:(req,res,next)=>{
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
               
            });
        });
       // res.render('backend/about/index', { title: 'Admin about', layout: 'backend/layout',data:about });
       res.render('forntend/about',{title:'home',About:about});
    });

        
    }
}