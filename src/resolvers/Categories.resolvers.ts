import categoriesController from "../controller/Categories.controller";
import { INewCategory, IUPdateCategory, IDeleteCategory, IFilterCategory } from '../model/types/ICategories';
import IContext from '../model/types/IContext'


const Query = {
    listCategories: async (_: unknown, args: { input: IFilterCategory}, ctx: IContext) => {
        return await categoriesController.listCategories(_, args, ctx);
    },
    getCategoryById: async (_: unknown, args: { input: IFilterCategory}, ctx: IContext) => {
        return await categoriesController.getCategoryById(_,args, ctx);
    }
}

const Mutation = {
    addNewCategory: async (_: unknown, args: { input: INewCategory}, ctx: IContext) => {
        return await categoriesController.addNewCategory(_, args, ctx);
    },
    updateCategory: async (_: unknown, args: { input: IUPdateCategory}, ctx: IContext) => {
        return await categoriesController.updateCategory(_, args, ctx);
    },
    deleteCategory: async (_: unknown, args: { input: IDeleteCategory}, ctx: IContext) => {
        return await categoriesController.deleteCategory(_, args, ctx);
    }
}

export default { Query, Mutation}