const db = require('../../../database/connect');
const User = require('../../../models/User');

describe('User Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe('getOneById', () => {
        it('fetches a user by id from the database', async () => {
            const mockUser = {
                userid: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@doe.com',
                password: 'hashedPassword',
            };
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUser] });

            const userId = 1;
            const user = await User.getOneById(userId);

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM users WHERE userid = $1', [userId]);
            expect(user).toEqual(new User(mockUser));
        });

        it('throws an error if user not found by id', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

            const userId = 1;
            await expect(User.getOneById(userId)).rejects.toThrow('Unable to locate user.');
        });
    });

    describe('getOneByEmail', () => {
        it('fetches a user by email from the database', async () => {
            const mockUser = {
                userid: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@doe.com',
                password: 'hashedPassword',
            };
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUser] });

            const userEmail = 'john@doe.com';
            const user = await User.getOneByEmail(userEmail);

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', [userEmail]);
            expect(user).toEqual(new User(mockUser));
        });

        it('throws an error if user not found by email', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

            const userEmail = 'john@doe.com';
            await expect(User.getOneByEmail(userEmail)).rejects.toThrow('Unable to locate user.');
        });
    });

    describe('create', () => {
        it('creates a new user in the database and returns the user', async () => {
            const mockUser = {
                userid: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@doe.com',
                password: 'hashedPassword',
            };
    
            
            jest.spyOn(User, 'getOneById').mockResolvedValueOnce(new User(mockUser));
    
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ userid: mockUser.userid }] });
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUser] });
    
            const userData = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@doe.com',
                password: 'testPassword',
            };
            const newUser = await User.create(userData);
    
            expect(db.query).toHaveBeenCalledWith(
                'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING userid;',
                [userData.first_name, userData.last_name, userData.email, userData.password]
            );
            
            expect(User.getOneById).toHaveBeenCalledWith(mockUser.userid);
            expect(newUser).toEqual(new User(mockUser));
        });
    });
});
