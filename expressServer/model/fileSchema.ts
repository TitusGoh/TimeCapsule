import * as Mongoose from "mongoose";

const FileSchema = new Mongoose.Schema({
    filename: String,
    fileId: Mongoose.Schema.Types.ObjectId,
    capsuleId: Mongoose.Schema.Types.ObjectId
    },
    { collection: 'files' }
);
export {FileSchema};