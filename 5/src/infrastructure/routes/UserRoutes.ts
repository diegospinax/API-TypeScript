import { Router, Request, Response } from "express";
import { UserController } from "../controller/user.controller";
import { UserApplication } from "../../application/UserApplication";
import { UserAdapter } from "../adapter/UserAdapter";

const router = Router();

const BASE_URL = "/users";

const userAdapter = new UserAdapter();
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);

router.post(`${BASE_URL}`, async (req: Request, res: Response) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {
    console.error("ENDPOINT error", error);
    res
      .status(400)
      .json({ message: "Something went wrong while creating user." });
  }
});

router.get(`${BASE_URL}`, async (req, res) => {
  try {
    await userController.allUsers(req, res);
  } catch (error) {
    console.error("ENDPOINT error", error);
    res
      .status(400)
      .json({ message: "Something went wrong while fetching users." });
  }
});

router.get(`${BASE_URL}/:id`, async (req, res) => {
  try {
    await userController.searchUserById(req, res);
  } catch (error) {
    console.error("ENDPOINT error", error);
    res
      .status(400)
      .json({ message: "Something went wrong while fetching user." });
  }
});

router.get(`${BASE_URL}/email/:email`, async (req, res) => {
  try {
    await userController.searchByEmail(req, res);
  } catch (error) {
    console.error("ENDPOINT error", error);
    res
      .status(400)
      .json({ message: "Something went wrong while fetching user." });
  }
});

router.put(`${BASE_URL}/:id`, async (req, res) => {
  try {
    await userController.updateUser(req, res);
  } catch (error) {
    console.error("ENDPOINT error", error);
    res
      .status(400)
      .json({ message: "Something went wrong while updating user." });
  }
});

router.delete(`${BASE_URL}/:id`, async (req, res) => {
  try {
    await userController.deleteUser(req, res);
  } catch (error) {
    console.error("ENDPOINT error", error);
    res
      .status(400)
      .json({ message: "Something went wrong while updating user." });
  }
});




export default router;
