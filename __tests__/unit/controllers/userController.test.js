const bcrypt = require('bcrypt');
const userController = require('../../../controllers/userController');
const User = require('../../../models/User');
const Token = require('../../../models/Token');



const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }));
const mockRes = { status: mockStatus };

describe("User Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("register", () => {
        it("Registers a new user", async () => {
            const mockReq = { body: { 'first_name': "John", 'last_name': "Doe", 'email': "john@doe.com", 'password': 'test123'} };
            
            jest.spyOn(User, 'create').mockImplementation(async () => {
                return Promise.resolve({ 'userid': 1, 'first_name': "John", 'last_name': "Doe", 'email': "john@doe.com", 'password': 'test123' });
            });

            
            await userController.register(mockReq, mockRes);

            
            expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
                first_name: "John",
                last_name: "Doe",
                email: "john@doe.com",
            }));

            expect(mockStatus).toHaveBeenCalledWith(201);

           
        });
    });

    describe("login", () => {
      it("Successfully logs in", async () => {
          const mockReq = { body: { 'email': "john@doe.com", 'password': 'test123'} }
          const mockUser = { 'id': 1, 'email': "john@doe.com", 'password': 'hashedPassword' };
          jest.spyOn(User, 'getOneByEmail').mockResolvedValueOnce(mockUser);
          jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

          const mockToken = { 'token': 'mockToken' };
          jest.spyOn(Token, 'create').mockResolvedValueOnce(mockToken);

          await userController.login(mockReq, mockRes);

          expect(User.getOneByEmail).toHaveBeenCalledWith("john@doe.com");
          expect(bcrypt.compare).toHaveBeenCalledWith('test123', 'hashedPassword');
          expect(Token.create).toHaveBeenCalledWith(1);

          expect(mockStatus).toHaveBeenCalledWith(200);
          expect(mockJson).toHaveBeenCalledWith({ authenticated: true, token: 'mockToken' });
      });

      it("Fails to log in with incorrect details", async () => {
          const mockReq = { body: { 'email': "john@doe.com", 'password': 'test123'} }
          jest.spyOn(User, 'getOneByEmail').mockResolvedValueOnce({ 'id': 1, 'email': "john@doe.com", 'password': 'hashedPassword' });
          jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

          await userController.login(mockReq, mockRes);

          expect(User.getOneByEmail).toHaveBeenCalledWith("john@doe.com");
          expect(bcrypt.compare).toHaveBeenCalledWith('test123', 'hashedPassword');

          expect(mockStatus).toHaveBeenCalledWith(401);
          expect(mockJson).toHaveBeenCalledWith({ error: "Incorrect details" });
      });
  });
});


