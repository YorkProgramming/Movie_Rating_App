const UserController = require('../controllers/user.controller');


module.exports = (app) => {

app.post("/api/user/new", UserController.createNewUser);
app.get("/api/user/:id", UserController.findOneUser);                  
app.get("/api/edit/:id", UserController.findOneUser);                 
app.patch("/api/user/edit/:id", UserController.updateUser);
app.post("/api/login_user", UserController.loginUser);
}