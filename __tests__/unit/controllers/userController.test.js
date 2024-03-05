const bcrypt = require('bcrypt');
const userController = require('../../../controllers/userController'); 
const User = require('../../../models/User');
const Token = require('../../../models/Token');


const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }));
const mockRes = { status: mockStatus };

describe("User Controller", () =>{
    beforeEach(() => {
        jest.clearAllMocks();
      });
      
      afterAll(() => {
        jest.resetAllMocks();
      });

    describe("register", () => {
        it("Registers a new user", async () => {
            mockReq = { body: { 'first_name': "John", 'last_name': "Doe", 'email': "john@doe.com", 'password': 'test123'} }
            const newUser = { 'userid': 1, 'first_name': "John", 'last_name': "Doe", 'email': "john@doe.com", 'password': 'test123'}
            jest.spyOn(User, 'create').mockResolvedValue(newUser)

            await userController.register(mockReq, mockRes)
            
            expect(User.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockJson).toHaveBeenCalledWith(newUser)
        })
    })
})


