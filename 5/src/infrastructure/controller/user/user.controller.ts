import { Request, Response } from "express";
import { UserApplication } from "../../../application/UserApplication";
import { User } from "../../../domain/User";
import { CreateUserDto } from "./dto/create-user.dto";
import { handleControllerError, handleError } from "../../helpers/error/handle-error";
import {
  emailRegexList
} from "../../helpers/regex/user.regex";
import {
  userCreationValidation,
  userUpdateValidation,
} from "../../helpers/validations/user.validations";

export class UserController {
  private app: UserApplication;

  constructor(app: UserApplication) {
    this.app = app;
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password }: CreateUserDto = req.body;
    try {
      const validationError = userCreationValidation(
        { name, email, password },
        res
      );

      if (validationError) return validationError;

      const user: Omit<User, "id"> = { name, email, password, status: true };
      const userId = await this.app.createUser(user);

      return res.status(201).json({
        message: "Usuario creado exitosamente",
        userId,
      });
    } catch (error) {
      return handleControllerError(res, error as Error);
    }
  }

  async searchUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id);

      if (isNaN(userId)) return handleError("Error en parámetro", res);

      const user = await this.app.findById(userId);

      if (!user) return handleError("Usuario no encontrado.", res);

      return res.status(200).json(user);
    } catch (error) {
      return handleControllerError(res, error as Error);
    }
  }

  async searchByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.params;

      if (!emailRegexList.createRegex.test(email))
        return handleError("Email inválido", res);

      const user = await this.app.findByEmail(email);

      if (!user) return handleError("Usuario no encontrado.", res);

      return res.status(200).json(user);
    } catch (error) {
      return handleControllerError(res, error as Error);
    }
  }

  async allUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.app.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return handleControllerError(res, error as Error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id);

      if (isNaN(userId))
        return handleError("Parámetro inválido", res);

      const userExists: boolean = await this.app.existsById(userId);

      if (!userExists)
        return handleError("Usuario no encontrado.", res)

      await this.app.deleteUser(userId);

      return res.status(204).send();
    } catch (error) {
      return handleControllerError(res, error as Error);
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId: number = parseInt(req.params.id);

      if (isNaN(userId)) return handleError("Parámetro inválido", res);

      const { name, email, password }: CreateUserDto = req.body;

      const validationError = userUpdateValidation(
        { name, email, password },
        res
      );

      const userUpdated: User = {
        id: userId,
        name,
        email,
        password,
        status: true,
      };

      this.app.updateUser(userId, userUpdated);

      return res.status(200).json(userUpdated);
    } catch (error) {
      return handleControllerError(res, error as Error);
    }
  }
}
