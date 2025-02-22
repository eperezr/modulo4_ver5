import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.route('/')
.get(usersController.getUsers)
.post(usersController.createUser);

/*router
.route('/:id')
.get(authenticateToken, usersController.getUser)
.put(authenticateToken, usersController.updateUser)
.delete(authenticateToken, usersController.deleteUser)
.patch(authenticateToken, usersController.activeInactive);
*/

router
.route('/:id')
.get(usersController.getUser)
.put(usersController.updateUser)
.delete(usersController.deleteUser)
.patch(usersController.activeInactive);

router.get('/:id/tasks', /*authenticateToken,*/ usersController.getTasks);

export default router;