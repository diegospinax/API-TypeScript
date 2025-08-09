import { User } from "./User";

export interface UserPort {
  createUser(user: Omit<User, "id">): Promise<number>;
  updateUser(id: number, user: Partial<User>): Promise<boolean>;
  deleteUser(id: number): Promise<boolean>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
