import {getTodo} from "../database/repositories/todoListRepository";

export default function socketIsAuthorized(userId, todoId) {
    return new Promise((resolve, reject) => {
        getTodo(todoId)
            .then(todo => {
                const todoUserId = todo._doc.user._id + '';
                resolve(todoUserId === userId)
            })
            .catch(error => reject(error));
    });
}
