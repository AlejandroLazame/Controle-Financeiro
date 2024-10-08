import { ObjectId } from "mongodb";

export interface INewCategory {
    _id?: ObjectId;
    name: String;
}

export interface IUPdateCategory {
    _id: ObjectId
    data: {
        name?: String;
    }
}

export interface IDeleteCategory {
    _id: ObjectId
}

export interface IFilterCategory {
    _id?: ObjectId;
    name?: String;
}

export default INewCategory;