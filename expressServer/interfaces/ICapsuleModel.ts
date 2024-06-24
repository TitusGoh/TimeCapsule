import Mongoose = require("mongoose");

interface ICapsuleModel extends Mongoose.Document {
    name: string;
    description: string;
    capsuleID: string;
    createdDate: string;
    openDate: string;
    completed: boolean;
    owner: string;
    fileIds: Mongoose.Types.ObjectId[];
}
export {ICapsuleModel};