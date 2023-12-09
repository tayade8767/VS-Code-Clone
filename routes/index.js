var express = require('express');
var router = express.Router();

/* GET home page. */

var fs = require("fs");

router.get("/", function(req, res) {                        //   this is the local route ( / )
  fs.readdir("./uploads", { withFileTypes:true } , function(err , files){     //  this is the Asynchronus code and it is run after  the synchronus code
      res.render("index",{ files : files});      // it is dirents
      // console.log(files);           //  we need the first show the all files and then get on the / route  ( It is the Synchronus code and run before the Asynchronus Code)
  });
});

router.get("/file/:filename", function(req, res) {
  fs.readdir("./uploads", { withFileTypes:true } , function(err , files){     //  this is the Asynchronus code and it is run after  the synchronus code
    fs.readFile(`./uploads/${req.params.filename}`, "utf8" , function(err,data){
      res.render("opened",{ files : files ,filename: req.params.filename ,filedata: data}); 
    });
  });
});

router.post("/filechange/:filename", function(req, res) {
    fs.writeFile(`./uploads/${req.params.filename}`, req.body.filedata , function(err){
      res.redirect("back");
    });
});

router.get("/filecreate", function(req, res) {
     fs.writeFile(`./uploads/${req.query.filename}` , "" ,function(err){                  //  this is for the filecreate route
      if(err) res.send(err);
      else res.redirect("back");
     });
});

router.get("/foldercreate", function(req, res){
  fs.mkdir(`./uploads/${req.query.foldername}`, function(err){             //  this route is for the foldercrete
    if(err) res.send(err);
    else res.redirect("back");
  });
});

module.exports = router;
