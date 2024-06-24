import Mongoose = require("mongoose");

interface ICapsuleModel extends Mongoose.Document {
    filename: String,
    fileId: Mongoose.Schema.Types.ObjectId,
    capsuleId: Mongoose.Schema.Types.ObjectId
}
export {ICapsuleModel};