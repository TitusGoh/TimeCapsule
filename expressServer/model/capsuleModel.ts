import * as Mongoose from "mongoose";
import {ICapsuleModel} from '../interfaces/ICapsuleModel';
import {CapsuleSchema} from './capsuleSchema';

class capsuleModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        //this.createSchema();
        this.createModel();
    }

    /*public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                name: String,
                description: String,
                capsuleID: String,
                createdDate: String,
                openDate: String,
                completed: Boolean,
                owner: String,
                fileIds: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'File' }]
            }, {collection: 'capsuleList'}
        );    
    }*/

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            this.model = Mongoose.model<ICapsuleModel>("capsuleList", CapsuleSchema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async getAllCapsules(response:any) {
        var query = this.model.find({});
        try {
            const itemArray = await query.exec();
            response.json(itemArray);
        }
        catch(e) {
            console.error(e);
        }
    }

    public async getCapsule(response:any, value:number) {
        var query = this.model.findOne({capsuleID: value});
        try {
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.error(e);
        }
    }
}
export {capsuleModel};