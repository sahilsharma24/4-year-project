const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const users=require('./Route/user');
const pdfDocument=require('pdfkit')
const fs=require('fs')
const config=require('./config/database');

mongoose.connect(config.database);


mongoose.connection.on('connected',()=>{
    console.log('connected to database'+config.database)
})

mongoose.connection.on('error',(err)=>{
    console.log("Error occured",err)
})

const app=express();

const port=3000//process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());

//passport middelware

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users',users);

 var doc=new pdfDocument;
    doc.pipe(fs.createWriteStream('node1.pdf'));
    doc.font('Times-Roman')
       .fontSize(30)
       .text('Sahil Resume',200,5);
   
   doc.font('Times-Roman')
      .fontSize(18)
      .text("Sahil Sharma",20,50);
   
   doc.moveDown()

   doc.font('Times-Roman')
      .fontSize(10)
      .text("B.Tech, Computer Science & Engineering",20,70)
   doc.text("JUIT WAKNAGHAT SOLAN",20,82);

  const phone="9805867625"
  const email="sahilmarish@gmail.com"
   doc.font('Times-Roman')
      .fontSize(10)
      .text("Phone No: "+phone,400,55);
   doc.text("Email: "+email,400,66);
   doc.text("Address: House No-505,Modi Mohalla Ward No. 2 Una(HP)",400,76)
   
   doc.font('Times-Roman')
       .fontSize(18)
       .text('Summary',20,105);
   
   
    doc.end();

 
app.use(express.static(path.join(__dirname,'public')))

 app.post('/pdf',(req,res)=>{
    console.log("in download server "+req.body.name)
    var doc=new pdfDocument;
    doc.pipe(fs.createWriteStream('node.pdf'));
    doc.font('Times-Roman')
       .fontSize(30)
       .text(req.body.name+' Resume',100,5);
   
   doc.font('Times-Roman')
      .fontSize(24)
      .text(res.body.name+" Sharma",2,2);
   
   res.set('Content-type', 'application/pdf');
   doc.pipe(res);    
   doc.end();

// var file = fs.createReadStream('./public/modules/datacollectors/output.pdf');
// var stat = fs.statSync('./public/modules/datacollectors/output.pdf');
// res.setHeader('Content-Length', stat.size);
// res.setHeader('Content-Type', 'application/pdf');
// res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
// file.pipe(res);
// return res.json({success: true,msg:"Wrong Password"});
})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})

app.listen(port,() =>{
    console.log('Server started on port' + port);
})