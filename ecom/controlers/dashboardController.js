module.exports={
    index:(req, res, next)=> {
        // blog list
        res.render('backend/index', { title: 'Dashboard',layout:'backend/layout' });
    },
   
}