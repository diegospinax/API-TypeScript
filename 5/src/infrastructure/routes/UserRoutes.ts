import { Request, Response, Router } from "express";
import { UserApplication } from "../../application/UserApplication";
import { UserAdapter } from "../adapter/UserAdapter";
import { UserController } from "../controller/user.controller";

const router = Router();

const BASE_URL = "/users";

const userAdapter = new UserAdapter();
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);

router.post(`${BASE_URL}`, async (req: Request, res: Response) => {
    await userController.createUser(req, res);
});

router.get(`${BASE_URL}`, async (req, res) => {
    await userController.allUsers(req, res);
});

router.get(`${BASE_URL}/:id`, async (req, res) => {
    await userController.searchUserById(req, res);
});

router.get(`${BASE_URL}/email/:email`, async (req, res) => {
    await userController.searchByEmail(req, res);
});

router.put(`${BASE_URL}/:id`, async (req, res) => {
    await userController.updateUser(req, res);
});

router.delete(`${BASE_URL}/:id`, async (req, res) => {
    await userController.deleteUser(req, res);
});


export default router;
