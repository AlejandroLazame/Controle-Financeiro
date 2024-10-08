import { ObjectId } from 'mongodb';
import IContext from '../model/types/IContext';
import { INewCategory, IUPdateCategory, IDeleteCategory, IFilterCategory } from '../model/types/ICategories';

interface CategoriesController {
    listCategories: (
        _: unknown, 
        args: {input: IFilterCategory }, 
        ctx: IContext ) => Promise<Array<INewCategory>>;
    getCategoryById: (
        _: unknown,
        args: {input: IFilterCategory},
        ctx: IContext
    ) => Promise<INewCategory>;
    addNewCategory: (
        _: unknown,
        args: {input: INewCategory},
        ctx: IContext
    ) => Promise<INewCategory>;
    updateCategory: (
        _: unknown,
        args: {input: IUPdateCategory},
        ctx: IContext
    ) => Promise<Boolean>;
    deleteCategory: (
        _: unknown,
        args: {input: IDeleteCategory},
        ctx: IContext
    ) => Promise<Boolean>;
}

const categoriesController: CategoriesController = {
    listCategories: async (_: unknown, args: {input: IFilterCategory}, ctx: IContext): Promise<Array<INewCategory>> => {
        const { db } = ctx;
        const filters = {
            ...args.input
        }

        const categories: Array<INewCategory> = await db.collection('categories')
            .find<INewCategory>(filters)
            .toArray();

        if(!categories){
            throw new Error('Não foram encontradas categorias para os filtros fornecidos');
        }

        return categories!
    },
    getCategoryById: async (_: unknown, args: {input: IFilterCategory}, ctx: IContext): Promise<INewCategory> => {
        const { db } = ctx;
        const { _id } = args.input;

        const categories: INewCategory | null = await db.collection('categories')
            .findOne<INewCategory>({_id: new ObjectId(_id)});

        if(categories === null){
            throw new Error('Não foram encontradas categorias para os filtros fornecidos');
        }

        return categories!
    },
    addNewCategory: async (_: unknown, args: {input: INewCategory}, ctx: IContext): Promise<INewCategory> => {
        const input = args.input;
        const { db } = ctx;
        try {
            const newCategory = {
                ...input
            }
            const { insertedId } = await db.collection('categories')
                .insertOne(newCategory);
                newCategory._id = insertedId;
           
            return newCategory!
        } catch (error) {
            console.error('Ocorreu um erro ao adicionar nova categoria: ', error);
            throw new Error(`Erro ao salvar categoria: ${(error as Error).message}`);
        }
    },
    updateCategory: async (_: unknown, args: { input: IUPdateCategory}, ctx: IContext): Promise<Boolean> => {
        const { _id, data} = args.input;
        const { db } = ctx;
        try {
            const { acknowledged } = await db.collection('categories')
                .updateOne({_id: new ObjectId(_id)}, {$set: data}, { upsert: false});
           
            return acknowledged;
        } catch (error) {
            console.error('Ocorreu um erro ao adicionar nova categoria: ', error);
            throw new Error(`Erro ao salvar categoria: ${(error as Error).message}`);
        }
    },
    deleteCategory: async (_: unknown, args: {input: IDeleteCategory}, ctx: IContext): Promise<Boolean> => {
        const { _id } = args.input;
        const { db } = ctx;
        try {
            const { acknowledged } = await db.collection('categories')
                .deleteOne({ _id: new ObjectId(_id)});

            return acknowledged;
        } catch (error) {
            console.error(`Ocorreu um erro ao deletar uma caegoria`, error);
            throw new Error(`Erro ao excluir categoria: ${(error as Error).message}`);
        }
    }
}

export default categoriesController;