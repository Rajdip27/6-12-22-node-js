// const { config } = require("dotenv");

const config=require('./../config/index')


module.exports={
    home:(req,res,next)=>{
        res.render('forntend/index',{title:'home'});
    },
    blogs:(req,res,next)=>{
        res.render('forntend/blog',{title:'home'});
    },
    testimonials:(req,res,next)=>{
        res.render('forntend/testimonial',{title:'home'});
    },
    team:(req,res,next)=>{
        res.render('forntend/team',{title:'home'});
    },
    contactUs:(req,res,next)=>{
        res.render('forntend/contact_us',{title:'home'});
    },
    about:(req,res,next)=>{
        res.render('forntend/about',{title:'home'});
    }
}