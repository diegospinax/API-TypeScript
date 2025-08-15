import { UserApplication } from "../../application/UserApplication";
import { User } from "../../domain/User";
import { Request, Response } from "express";
import { nameRegexList, emailRegexList, passwordRegexList } from "./UserRegex";

export class UserController {
  private app: UserApplication;

  constructor(app: UserApplication) {
    this.app = app;
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    try {
      if (!nameRegexList.createRegex.test(name.trim())) {
        return res.status(400).json({
          message: "Nombre inválido.",
        });
      }
      if (!emailRegexList.createRegex.test(email.trim())) {
        return res.status(400).json({
          message: "Email inválido.",
        });
      }
      if (!passwordRegexList.createRegex.test(password.trim())) {
        return res.status(400).json({
          message: "Contraseña debe tener letras y por lo menos 1 número.",
        });
      }

      const user: Omit<User, "id"> = { name, email, password, status: true };
      const userId = await this.app.createUser(user);

      return res.status(201).json({
        message: "Usuario creado exitosamente",
        userId,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ha ocurrido un error", error: error });
    }
  }

  async searchUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId))
        return res.status(400).json({ message: "Error en parámetro" });

      const user = await this.app.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado",
        });
      }

      return res.status(200).json(user);

    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ha ocurrido un error", error: error });
    }
  }

  async searchByEmail(req: Request, res: Response): Promise<Response> {
    try { 
      const { email } = req.params;

      if (!emailRegexList.createRegex.test(email))
        return res.status(400).json({ message: "Email inválido" });

      const user = await this.app.findByEmail(email);

      if (!user) return res.status(404).json({message: "Usuario no encontrado."})

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ha ocurrido un error", error: error });
    }
  }

  async allUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.app.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ha ocurrido un error", error: error });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id);

      if (isNaN(userId))
        return res.status(400).json({ message: "Parámetro inválido" });

      const userExists: boolean = await this.app.existsById(userId);

      if (!userExists)
        return res.status(400).json({ message: "Usuario no encontrado." });

      const yesornot = await this.app.deleteUser(userId);
      console.log(yesornot);
      

      return res.status(204).send();
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ha ocurrido un error", error: error });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId: number = parseInt(req.params.id);

      if (isNaN(userId))
        return res.status(400).json({ message: "Parámetro inválido" });
      
      const { name, email, password } = req.body;

      if (!nameRegexList.updateRegex.test(name.trim())) {
        return res.status(400).json({
          message: "Nombre inválido.",
        });
      }
      if (!emailRegexList.updateRegex.test(email.trim())) {
        return res.status(400).json({
          message: "Email inválido.",
        });
      }
      if (!passwordRegexList.updateRegex.test(password.trim())) {
        return res.status(400).json({
          message: "Contraseña inválida.",
        });
      }

      const userUpdated: User = {
        id: userId,
        name,
        email,
        password,
        status: true
      }

      this.app.updateUser(userId, userUpdated);

      return res.status(200).json(userUpdated);

    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ha ocurrido un error", error: error });
    }
  }
}
