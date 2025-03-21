const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser')
const logger = require('morgan');
const multer =require( 'multer')

const upload = multer({dest: "./public/uploads"});

const fs  =require( 'fs')
const axios=require( 'axios')


const app = express();
const PORT = process.env.PORT || 4041;
const knex=require("knex");
const db=knex( require("./knexfile").development)
const nodemailer= require( "nodemailer-promise");
var mailer = nodemailer.config({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, // true for 465, false for other ports 587
    auth: {
        user: "info@uralcyberfin.ru",
        pass: "hbyNp46AsLCuHJAHt8Z3"//"qDNe2ML9njBBnaDqp4DU"это для news// metroBiberevo
    }
});


app.use(cors());

app.set("view engine", "pug");
app.use(logger("dev"))
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    try {
        let projects = await db("projects").where({isDeleted: 0, isEnable: 1}).orderBy("sort")

        res.render("start", {projects});
    }
    catch (e) {
        console.warn(e)
        res.sendStatus(500)
    }
});


app.get("/admin", (req, res) => {
  res.render("admin");
});
app.get("/start", async (req, res) => {
    try {
    let projects=await db("projects").where({isDeleted:0, isEnable:1}).orderBy("sort")

    res.render("start", {projects});
    }
    catch (e) {
        console.warn(e)
        res.sendStatus(500)
    }
});
app.get("/projects", async (req, res) => {
    let projects=await db("projects").where({isDeleted:0, isEnable:1}).orderBy("sort")
    console.log(projects)
    res.render("pageProjects", {projects});
});
app.get("/feedBackForm", async (req, res) => {

    res.render("feedBackForm", );
});

app.get("/project/:id", async (req, res) => {
    try {
        let projects = await db("projects").where({isDeleted: 0, isEnable: 1, id: req.params.id}).orderBy("sort")
        if (projects.length == 0)
            return res.sendStatus(404)
        res.render("projectPopup", {proj:projects[0]})


    }
    catch (e) {
        console.warn(e)
        return res.sendStatus(500)
    }
});

app.post("/api/feedback", async (req, res) => {
    try {

        const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=6LcQafkqAAAAAIYgDnETI0mjg4JQJpzPom_5nGBY"
            + "&response=" + req.body.token;// + "&remoteip=" + req.headers['x-forwarded-for'];
        let capcha = await axios.get(verificationURL);
        console.log(capcha.data)
        if (!capcha.data.success) {
            console.warn("no capcha")
            return res.json({
                status: "error",
                errMsg: "Вы не прошли проверку capcha"
            })
        }

        let html=""
        for(let key of Object.keys(req.body.dt)){
            html+=key+": "+ req.body.dt[key]+"\n"

        }
        await mailer(
            {
                from: 'info@uralcyberfin.ru',
                to: "info@effectcomm.ru",
                subject: "Новое сообщение с сайта effectomm.ru",
                text:html
            });
        res.json(true)

    }
    catch (e) {
        console.warn(e)
        return res.sendStatus(500)
    }
});


app.get("/api/projects",async (req, res) => {
  try {
    return res.json((await db("projects").where({isDeleted:0}).orderBy("sort")))
  }catch (e) {
    console.warn(e)
    res.send(500)
  }

  });

app.get("/api/files",async (req, res) => {
    try {
        let files=(await db("t_files").where({isDeleted:0}).orderBy("sort"))
        files.forEach(f=>{
            f.url=f.filepath.replace('public', 'https://effectcomm.ru')
        })
        return res.json(files)
    }catch (e) {
        console.warn(e)
        res.send(500)
    }

});

app.post("/api/file", async (req, res) => {
    try {

        if (!req.body.id) {
            return res.json((await db("t_files").insert(
                {
                    title:req.file.originalname,
                    filename:newPath,
                    filepath:newPath,
                    origName:req.file.originalname,
                    size:0,
                    isEnable:0,
                    isDeleted:0,
                    sort:0
                }, "*"))[0])
        } else {
            let id = req.body.id;
            delete req.body.id;
            delete req.body.url;
            console.log(req.body, id)
            return res.json((await db("t_files").update(req.body, "*").where({id}))[0])
        }
    }
    catch (e) {
        console.warn(e)
        res.send(500)
    }

});
app.post("/api/project", async (req, res) => {
  try {

    if (!req.body.id) {
      return res.json((await db("projects").insert(
          {
            title:"",
            img:'',
            video:'',
            isVideo:false,
            sort:0,
            isEnable:false,
            isDeleted:false
          }, "*"))[0])
    } else {
      let id = req.body.id;
      delete req.body.id;
      console.log(req.body, id)
      return res.json((await db("projects").update(req.body, "*").where({id}))[0])
    }
  }
  catch (e) {
    console.warn(e)
    res.send(500)
  }

});
app.post("/api/addFile",upload.single('file'), async (req, res) => {
    try {
        let ext = path.extname(req.file.originalname)
        let newPath = req.file.path + ext
        await fs.promises.rename(req.file.path, newPath)
        req.file.path = newPath;
        req.file.filename = req.file.filename + ext;

        let r= await db("t_files").insert({
            title:req.file.originalname,
            filename:newPath,
            filepath:newPath,
            origName:req.file.originalname,
            size:0,
            isEnable:0,
            isDeleted:0,
            sort:0

        }, "*")
        res.json(r[0])
    }
    catch (e) {
        console.warn(e)
        res.send(500)
    }

});
app.post("/api/uploadFile",upload.single('file'), async (req, res) => {
    try {
        let ext = path.extname(req.file.originalname)
        let newPath = req.file.path + ext
        await fs.promises.rename(req.file.path, newPath)
        req.file.path = newPath;
        req.file.filename = req.file.filename + ext;
        res.json("/uploads/"+req.file.filename)
    }
    catch (e) {
        console.warn(e)
        res.send(500)
    }

});





app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT}`);
});
