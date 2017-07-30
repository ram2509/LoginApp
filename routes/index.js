var router = require('express').Router();

// Get Home Page
router.get('/',function (req,res) {
  res.render('layout');
})

module.exports = router;