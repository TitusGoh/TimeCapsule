import * as Mongoose from "mongoose";

const CapsuleSchema = new Mongoose.Schema(
    {
        name: String,
        description: String,
        capsuleID: String,
        createdDate: String,
        openDate: String,
        completed: Boolean,
        userID: String,
        files: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'File' }]
    },
    { collection: 'capsuleList' }
);

export { CapsuleSchema };