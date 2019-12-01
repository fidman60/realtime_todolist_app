import Todo from '../models/TodoItem';

export function getTodoList(){
    return new Promise((resolve, reject) => {
        Todo.find({}).populate('user').sort({date: -1}).exec((err, todoList) => {
            if (err) reject(err);
            resolve(todoList);
        });
    });
}

export function getTodo(todoId){
    return new Promise((resolve, reject) => {
        Todo.findById(todoId).populate('user').exec((err, todo) => {
            if (err) reject(err);
            resolve(todo);
        });
    });
}

export function addTodo(todo, userId){
    return new Promise((resolve, reject) => {
        let data = {
            todo,
            user: userId,
        };
        Todo.create(data, (err, todo)=> {
            if (err) reject(err);
            todo.populate('user').execPopulate(() => resolve(todo))
        });
    });
}

export function editTodo(idTodo, newTodo){
    return new Promise((resolve, reject) => {
        Todo.findOneAndUpdate({_id: idTodo}, {todo: newTodo}, {runValidators: true, new: true}, (err, todo) => {
            if (err) reject(err);
            todo.populate('user').execPopulate(() => resolve(todo));
        });
    });
}

export function deleteTodo(idTodo){
    return new Promise((resolve, reject) => {
        Todo.remove({_id: idTodo}, (err) => {
            if (err) reject(false);
            resolve(true);
        });
    });
}
