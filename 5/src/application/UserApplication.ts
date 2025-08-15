import { User } from "../domain/User";
import { UserPort } from "../domain/UserPort";

export class UserApplication {
  private port: UserPort;

  constructor(port: UserPort) {
    this.port = port;
  }

  async createUser(user: Omit<User, "id">): Promise<number> {
    const existingUser = await this.existsByEmail(user.email);
    if (!existingUser) return await this.port.createUser(user);

    throw new Error("User already exists!");
  }

  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    const existingUser = await this.existsById(id);
    if (!existingUser) throw new Error("User already exists!");

    if (user.email) {
      const userWithEmail = await this.port.findByEmail(user.email);

      if (userWithEmail && userWithEmail.id !== id)
        throw new Error("User already exists!");
    }

    return await this.port.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const exists: boolean = await this.existsById(id);

    if (!exists) throw new Error();

    return await this.port.deleteUser(id);
  }

  async findAll(): Promise<User[]> {
    return await this.port.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return await this.port.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.port.findByEmail(email);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const existingUser = await this.port.findByEmail(email);
    return existingUser ? true : false;
  }

  async existsById(id: number): Promise<boolean> {
    const existingUser = await this.port.findById(id);
    return existingUser ? true : false;
  }
}
