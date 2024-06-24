"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapsuleSchema = void 0;
const Mongoose = require("mongoose");
const CapsuleSchema = new Mongoose.Schema({
    name: String,
    description: String,
    capsuleID: String,
    createdDate: String,
    openDate: String,
    completed: Boolean,
    userID: String,
    files: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'File' }]
}, { collection: 'capsuleList' });
exports.CapsuleSchema = CapsuleSchema;
//# sourceMappingURL=capsuleSchema.js.map