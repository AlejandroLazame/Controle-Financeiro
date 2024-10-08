import categoriesController from './Categories.controller';
import mongoDb from '../utils/ConnectOnMongo';
import { INewCategory, IUPdateCategory, IDeleteCategory, IFilterCategory } from '../model/types/ICategories';
import { ObjectId } from "mongodb";

let _id: ObjectId;

test('Gravação de nova categoria no banco de dados, 200 = Sucesso', async ()=> {
    const input: INewCategory = {
        name: "Casa"
    }
    
    const MockTransaction = {
        input
    }
    
    const expectedResult = {
        name: "Casa",
        _id: expect.any(ObjectId)
    }
    const db = await mongoDb.connectToMongo()
    const result = await categoriesController.addNewCategory(null, MockTransaction, { db });
    _id = result._id!;
    expect(result).toEqual(expectedResult);
})

test('Atualizando nome da Categoria no banco de dados', async () => {
    const input: IUPdateCategory = {
        _id: new ObjectId('66f7fe303c2f23fba098f331'),
        name: "Lazer"
    };

    const MockTransaction = {
        input
    };

    const db = await mongoDb.connectToMongo();
    const result = await categoriesController.updateCategory(null, MockTransaction, { db });
    expect(result).toBeTruthy();
})

test('Consultando categorias no banco de dados', async ()=>{
    const filters: IFilterCategory = {
        name: "Lazer"
    }

    const Mock = {
        input: filters
    }
    const db = await mongoDb.connectToMongo();
    const result = await categoriesController.listCategories(null, Mock, { db });
    expect(Array.isArray(result)).toBe(true);
    result.map(transaction=>{
        expect(transaction).toHaveProperty('_id');
        expect(typeof transaction._id).toBe('object');
        expect(transaction).toHaveProperty('name');
        expect(typeof transaction.name).toBe('string');
    })
})

test('Consultando categoria por ID no banco de dados', async ()=>{
    const filters: IFilterCategory = {
        _id: new ObjectId('66f7fe303c2f23fba098f331')
    }

    const Mock = {
        input: filters
    }
    const db = await mongoDb.connectToMongo();
    const result = await categoriesController.getCategoryById(null, Mock, { db });
    expect(result).toHaveProperty('_id');
    expect(typeof result._id).toBe('object');
    expect(result).toHaveProperty('name');
    expect(typeof result.name).toBe('string');
})

test('Deletar transação', async () => {
    const db = await mongoDb.connectToMongo();
    const result = await categoriesController.deleteCategory(null, { input: { _id } }, { db })
    expect(result).toBeTruthy();
})