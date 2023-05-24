const { beforeEach } = require('node:test');
const CategoryController = require('../../../controllers/category.controllers');
const Model = require('../../../models');
const CategoryModel = Model.category;
const newCategory = require('../../mock-data/new-category.json');
const {mockRequest,mockResponse} = require('../interceptor');

let req,res;

beforeEach(()=>{
    req = mockRequest();
    res = mockResponse();
})

describe('CategoryController.create',()=>{
    test('Should call CategoryController.create and create a new category', async()=>{

        //Mocking model command
        const spy = jest.spyOn (CategoryModel,'create')
            .mockImplementation((newCategory)=>Promise.resolve(newCategory));

        //Executing controller command
        await CategoryController.create(req,res);

        //Test to verify the create function
        expect(spy).toHaveBeenCalled();
        expect(CategoryModel.create).toHaveBeenCalledWith(newCategory);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newCategory);
    })
});
describe('CategoryController.findAll',()=>{
    test('Should Call CategoryController.findAll',async()=>{
        const queryParam={
            where:{
                name:"Electronics"
            }
        };
        const spy = jest.spyOn(categoryModel,'findAll')
        .mockImplementation((queryParam)=>Promise.resolve(newCategory));

        req.query ={
            name:"Electronics"
        }
        await CategoryController.findAll(req,res);

        expect(spy).toHaveBeenCalled();
        expect(CategoryModel.findAll).toHaveBeenCalledWith(queryParam);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newCategory);
    })
})
    describe('CategoryController.findOne', () => {

        test('should Call CategoryController.findOne', async () => {
    
            req.params = {id : '1' }
    
            const spy = jest.spyOn(CategoryModel, 'findByPk')
            .mockImplementation(() => Promise.resolve(newCategory))
    
            await CategoryController.findOne(req.params.id);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(newCategory);
            expect(CategoryModel.findByPk).toHaveBeenCalledWith(req.params.id);
        })
    })
