"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const capsuleModel_1 = require("./model/capsuleModel");
const capsuleSchema_1 = require("./model/capsuleSchema");
const fileSchema_1 = require("./model/fileSchema");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const GooglePassport_1 = require("./GooglePassport");
const passport = require("passport");
const mongodb_1 = require("mongodb");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor(mongoDBConnection) {
        this.googlePassportObj = new GooglePassport_1.default();
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Capsules = new capsuleModel_1.capsuleModel(mongoDBConnection);
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(session({
            secret: 'key12345',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                maxAge: 24 * 60 * 60 * 1000
            }
        }));
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
        this.expressApp.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "http://localhost:4200");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    }
    validate(req, res, next) {
        if (req.isAuthenticated()) {
            console.log("User is authenticated.");
            return next();
        }
        else {
            console.log("User is not authenticated.");
            //res.redirect('http://localhost:8080/auth/google');
            res.status(401).json({ redirectUrl: 'https://timecapsuleww2.azurewebsites.net/auth/google' });
        }
    }
    //Capsule API endpoints
    routes() {
        let router = express.Router();
        router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
        router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:4200' }), (req, res) => {
            if (req.isAuthenticated()) {
                console.log("Successfully authenticated user.");
                res.redirect('https://timecapsuleww2.azurewebsites.net/');
            }
        });
        const Grid = require('gridfs-stream');
        const { Readable } = require('stream');
        let gfs;
        mongoose.connection.once('open', () => {
            gfs = Grid(mongoose.connection.db, mongoose.mongo);
            gfs.collection('fileData');
        });
        // Define a model for Capsules
        const CapsuleModel = mongoose.model('Capsule', capsuleSchema_1.CapsuleSchema);
        // Define a model for Files
        const FileModel = mongoose.model('File', fileSchema_1.FileSchema);
        const upload = multer({});
        router.get('/checkAuth', (req, res) => {
            if (req.isAuthenticated()) {
                console.log("User Authenticated");
                res.json({ isLoggedIn: true, userName: req.user.displayName });
            }
            else {
                console.log("DIDN'T WORK");
                res.json({ isLoggedIn: false, userName: '' });
            }
        });
        router.post('/capsuleList', upload.array('file'), this.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, description, createdDate, openDate, completed } = req.body;
            console.log('body', req.body);
            //const capsuleID = crypto.randomBytes(12).toString("hex");
            const userID = req.user.id;
            const username = req.user.displayName;
            console.log("NAME: ", username);
            //req.body.capsuleID = capsuleID;
            const capsuleID = req.body.capsuleID;
            const files = req.files;
            try {
                const fileIds = [];
                if (Array.isArray(files)) {
                    for (const file of files) {
                        const readStream = new Readable();
                        readStream.push(file.buffer);
                        readStream.push(null);
                        const writeStream = gfs.createWriteStream({ filename: file.originalname });
                        readStream.pipe(writeStream);
                        writeStream.on('close', (file) => __awaiter(this, void 0, void 0, function* () {
                            const validObject = mongoose.Types.ObjectId.isValid(capsuleID);
                            if (!validObject) {
                                console.error('Invalid ObjectID: ', capsuleID);
                                return res.status(400).send('Invalid object.');
                            }
                            // Create a new file instance
                            const newFile = new FileModel({
                                filename: file.filename,
                                fileId: file._id,
                                capsuleId: capsuleID
                            });
                            yield newFile.save();
                            fileIds.push(newFile._id);
                        }));
                        writeStream.on('error', (error) => {
                            console.error('Error uploading file:', error);
                            if (!res.headersSent) {
                                res.status(500).send('Error uploading file');
                            }
                        });
                    }
                }
                const capsule = new CapsuleModel({
                    name,
                    description,
                    capsuleID,
                    createdDate,
                    openDate,
                    completed: completed === 'true',
                    userID,
                    fileIds: fileIds // Store the file ID in the Capsule document
                });
                // Save the capsule to the database
                yield capsule.save();
                res.json({ message: 'Capsule with ID ' + capsuleID + ' has been created.' });
            }
            catch (error) {
                console.log(error);
                console.error(error);
                console.log('Capsule creation failed');
            }
        }));
        //Get all the capsules
        router.get('/capsuleList', this.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query every capsule');
            const userID = req.user.id;
            try {
                const capsules = yield CapsuleModel.find({ userID });
                const capsuleFiles = [];
                for (const capsule of capsules) {
                    const files = yield FileModel.find({ capsuleId: capsule.capsuleID });
                    capsuleFiles.push({ capsule, files });
                }
                res.send(capsuleFiles);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Error retrieving capsules information');
            }
        }));
        //Get all the information of a single capsule
        router.get('/capsuleList/:capsuleID', this.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const capsuleID = req.params.capsuleID;
            console.log('Query single capsule with id: ' + capsuleID);
            try {
                const capsule = yield CapsuleModel.findOne({ capsuleID: capsuleID });
                if (!capsule) {
                    return res.status(404).send('Capsule not found');
                }
                const files = yield FileModel.find({ capsuleId: capsuleID });
                res.send({ capsule, files });
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Error retrieving capsule information');
            }
        }));
        //Endpoint to download a file by its ID
        router.get('/file/:fileID', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { GridFSBucket } = require('mongodb');
            const fileID = req.params.fileID;
            const db = mongoose.connection;
            const bucket = new GridFSBucket(db.db);
            try {
                // Find the file by its ID in the database
                const objectId = new mongodb_1.ObjectId(fileID);
                const downloadStream = bucket.openDownloadStream(objectId);
                downloadStream.pipe(res);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Error retrieving file');
            }
        }));
        //Delete a capsule from the capsule list
        router.delete('/capsuleList/:capsuleID', this.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.capsuleID;
            console.log('Deleted capsule with id: ' + id);
            try {
                yield this.Capsules.model.deleteOne({ capsuleID: id });
                res.json('Capsule with ID ' + id + ' has been deleted.');
            }
            catch (error) {
                console.error(error);
                console.log('Capsule deletion failed');
            }
        }));
        //Update a capsule from the capsule list
        router.put('/capsuleList/:capsuleID', this.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.capsuleID;
            const updatedCapsule = req.body;
            try {
                // Update the capsule with the given ID
                yield this.Capsules.model.findOneAndUpdate({ capsuleID: id }, updatedCapsule);
                res.json({ message: 'Capsule with ID ' + id + ' has been updated.' });
            }
            catch (error) {
                console.error(error);
                console.log('Capsule update failed');
            }
        }));
        router.delete('/files/:fileID', this.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const fileID = req.params.fileID;
            const { GridFSBucket } = require('mongodb');
            const db = mongoose.connection;
            const bucket = new GridFSBucket(db.db);
            if (!mongodb_1.ObjectId.isValid(fileID)) {
                return res.status(400).send('Invalid file ID');
            }
            try {
                // Delete the file from GridFS
                const objectId = new mongodb_1.ObjectId(fileID);
                yield bucket.delete(objectId);
                // Delete the file from the File model
                yield FileModel.deleteOne({ fileId: fileID });
                res.json({ message: 'File with ID ' + fileID + ' has been deleted.' });
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Error deleting file');
            }
        }));
        router.post('/capsuleList/:capsuleID/files', upload.array('file'), this.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const capsuleID = req.params.capsuleID;
            const files = req.files;
            if (!mongodb_1.ObjectId.isValid(capsuleID)) {
                return res.status(400).send('Invalid capsule ID');
            }
            const validObject = mongoose.Types.ObjectId.isValid(capsuleID);
            if (!validObject) {
                return res.status(400).send('Invalid capsule ID');
            }
            try {
                const fileIds = [];
                if (Array.isArray(files)) {
                    for (const file of files) {
                        const readStream = new Readable();
                        readStream.push(file.buffer);
                        readStream.push(null);
                        const writeStream = gfs.createWriteStream({ filename: file.originalname });
                        readStream.pipe(writeStream);
                        writeStream.on('close', (file) => __awaiter(this, void 0, void 0, function* () {
                            const newFile = new FileModel({
                                filename: file.filename,
                                fileId: file._id,
                                capsuleId: capsuleID
                            });
                            yield newFile.save();
                            fileIds.push(newFile._id);
                        }));
                        writeStream.on('error', (error) => {
                            console.error('Error uploading file:', error);
                            if (!res.headersSent) {
                                res.status(500).send('Error uploading file');
                            }
                        });
                    }
                }
                // Update the capsule with the new file IDs
                yield CapsuleModel.findOneAndUpdate({ capsuleID: capsuleID }, { $push: { fileIds: { $each: fileIds } } });
                res.json({ message: 'Files added successfully to capsule with ID ' + capsuleID });
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Error adding files to capsule');
            }
        }));
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        //this.expressApp.use('/', express.static(__dirname + '/pages'));
        this.expressApp.use('/', express.static(__dirname + '/dist/todo-application2/browser'));
    }
}
exports.App = App;
//# sourceMappingURL=capsuleApp.js.map