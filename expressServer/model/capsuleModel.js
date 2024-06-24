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
exports.capsuleModel = void 0;
const Mongoose = require("mongoose");
const capsuleSchema_1 = require("./capsuleSchema");
class capsuleModel {
    constructor(DB_CONNECTION_STRING) {
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
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
                this.model = Mongoose.model("capsuleList", capsuleSchema_1.CapsuleSchema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getAllCapsules(response) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find({});
            try {
                const itemArray = yield query.exec();
                response.json(itemArray);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getCapsule(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ capsuleID: value });
            try {
                const result = yield query.exec();
                response.json(result);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.capsuleModel = capsuleModel;
//# sourceMappingURL=capsuleModel.js.map