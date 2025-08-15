import { Repository } from "typeorm";
import { User } from "../../domain/User";
import { UserPort } from "../../domain/UserPort";
import { UserEntity } from "../entities/UserEntity";
import { AppDataSource } from "../config/db-connection";
import e from "express";

export class UserAdapter implements UserPort {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  async createUser(user: Omit<User, "id">): Promise<number> {
    try {
      const newUser = this.toEntity(user);
      const savedUser = await this.userRepository.save(newUser);
      return savedUser.id_user!;
    } catch (error) {
      console.error("Error while creating user", error);
      throw new Error("Error creating user.");
    }
  }

  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    try {
        const existingUser = await this.userRepository.findOne({where: {id_user: id}});
        if (!existingUser)
            throw new Error("User does not exists!");

        const updatedUser: UserEntity = {
            id_user: existingUser.id_user,
            name_user: user.name ?? existingUser.name_user,
            email_user: user.email ?? existingUser.email_user,
            password_user: user.password ?? existingUser.password_user,
            status_user: true
        }

        await this.userRepository.save(updatedUser);
        return true;
    } catch (error) {
      console.error("Error while updating user", error);
      throw new Error("Error updating user.");
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
        const user = await this.userRepository.findOne({where: {id_user: id}});
        if (!user)
            throw new Error("User does not exists!");

        const deletedUser: UserEntity = {
            ...user,
            status_user: false
        }

        await this.userRepository.save(deletedUser);
        return true;
    } catch (error) {
      console.error("Error while deleting user", error);
      throw new Error("Error deleting user.");
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users.map((user) => this.toDomain(user));
    } catch (error) {
      console.error("Error while finding all users", error);
      throw new Error("Error finding all users.");
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
        const user = await this.userRepository.findOne({where: {id_user: id}});
        return user ? this.toDomain(user) : null;
    } catch (error) {
      console.error("Error while finding user by ID", error);
      throw new Error("Error finding user by ID.");
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
        const user = await this.userRepository.findOne({where: {email_user: email}});
        return user ? this.toDomain(user) : null;
    } catch (error) {
      console.error("Error while finding user by EMAIL", error);
      throw new Error("Error finding user by EMAIL.");
    }
  }

  private toDomain(userEntity: UserEntity): User {
    return {
      id: userEntity.id_user!,
      name: userEntity.name_user,
      email: userEntity.email_user,
      password: userEntity.password_user,
      status: userEntity.status_user,
    };
  }

  private toEntity(user: Omit<User, "id">): UserEntity {
    return {
      name_user: user.name,
      email_user: user.email,
      password_user: user.password,
      status_user: user.status,
    };
  }
}
