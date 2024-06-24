"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSchema = void 0;
const Mongoose = require("mongoose");
const FileSchema = new Mongoose.Schema({
    filename: String,
    fileId: Mongoose.Schema.Types.ObjectId,
    capsuleId: Mongoose.Schema.Types.ObjectId
}, { collection: 'files' });
exports.FileSchema = FileSchema;
//# sourceMappingURL=fileSchema.js.map