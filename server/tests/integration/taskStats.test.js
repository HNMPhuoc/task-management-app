import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../../src/app.js';
import { User } from '../../src/models/User.js';
import { Task } from '../../src/models/Task.js';
import { signToken } from '../../src/config/jwt.js';

let mongoServer;
let token;
let userId;

beforeAll(async () => {
    // Khởi động MongoDB in-memory
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { dbName: 'testdb' });

    // Tạo user giả
    const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword'
    });
    userId = user._id;
    token = signToken({ userId: user._id });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Task.deleteMany({});
});

describe('GET /api/tasks/stats', () => {
    test('trả về thống kê đúng khi có task', async () => {
        // Tạo task cho user
        await Task.create([
            { title: 'Task 1', owner: userId, completed: true },
            { title: 'Task 2', owner: userId, completed: true },
            { title: 'Task 3', owner: userId, completed: false }
        ]);

        const res = await request(app)
            .get('/api/tasks/stats')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.total).toBe(3);
        expect(res.body.completed).toBe(2);
        expect(res.body.percentCompleted).toBe(67); // làm tròn
        expect(res.body.percentIncomplete).toBe(33);
    });

    test('trả về 0 khi chưa có task', async () => {
        const res = await request(app)
            .get('/api/tasks/stats')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.total).toBe(0);
        expect(res.body.completed).toBe(0);
        expect(res.body.percentCompleted).toBe(0);
    });
});
