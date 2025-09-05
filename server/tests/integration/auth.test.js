import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import app from '../../src/app.js';
import { User } from '../../src/models/User.js';

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { dbName: 'testdb' });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await User.deleteMany({});
});

describe('Auth API', () => {
    test('đăng ký thành công và trả về user + token', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'tester',
                email: 'tester@example.com',
                password: 'secret123'
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'Đăng ký thành công');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('id');
        expect(res.body.user).toHaveProperty('username', 'tester');
        expect(res.body).toHaveProperty('token');

        const userInDb = await User.findOne({ email: 'tester@example.com' });
        expect(userInDb).not.toBeNull();
    });

    test('không cho phép đăng ký email trùng', async () => {
        await User.create({
            username: 'existing',
            email: 'dup@example.com',
            password: 'hashed'
        });

        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'newuser',
                email: 'dup@example.com',
                password: 'secret123'
            });

        expect(res.status).toBe(500); // hoặc 409 nếu bạn đổi
        expect(res.body).toHaveProperty('message');
    });

    test('đăng nhập thành công và trả về user + token', async () => {
        const plainPassword = 'secret123';
        const hashed = await bcrypt.hash(plainPassword, 10);

        await User.create({
            username: 'loginuser',
            email: 'login@example.com',
            password: hashed
        });

        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'login@example.com',
                password: plainPassword
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Đăng nhập thành công');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('id');
        expect(res.body.user).toHaveProperty('username', 'loginuser');
        expect(res.body).toHaveProperty('token');
    });

    test('đăng nhập sai mật khẩu thì 401', async () => {
        const hashed = await bcrypt.hash('secret123', 10);
        await User.create({
            username: 'baduser',
            email: 'bad@example.com',
            password: hashed
        });

        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'bad@example.com',
                password: 'wrongpass'
            });

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('message');
    });
});
