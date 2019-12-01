import {getTodoList} from "../database/repositories/todoListRepository";
import isAuthentified from "../middlewares/auth";

var express = require('express');
var router = express.Router();
import socket from 'socket.io';

/* GET home page. */
router.get('/',isAuthentified, function(req, res, next) {
  getTodoList()
      .then(todoList => {
        res.render('index', {todoList, user: req.session.user})
      })
      .catch(err => console.log(err));
});

router.get('/logout', isAuthentified, function(req, res, next) {
  req.session.destroy();
  res.redirect('/login');
});

router.get('/csv', isAuthentified, function(req, res){
  res.set('Content-Type', 'application/octet-stream');
  getTodoList()
      .then(todoList => res.send(todoList.map(todoItem => todoItem.todo).join("\r\n")))
      .catch(err => console.log(err));
});

module.exports = router;
