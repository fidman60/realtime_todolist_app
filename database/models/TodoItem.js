import mongoose from 'mongoose';

let todoListSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('Todo', todoListSchema, 'todo_list');
