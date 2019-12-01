import User from "../models/User";

export function findUserByName(name) {
    return new Promise((resolve, reject) => {
        User.findOne({name}, (err, user) => {
            if (err) reject(err);
            resolve(user);
        });
    });
}

export function createUser(name) {
    return new Promise((resolve, reject) => {
        User.create({name}, (err, user)=> {
            if (err) reject(err);
            resolve(user);
        });
    });
}
