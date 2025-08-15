import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { UserEntity } from "../entities/UserEntity";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [UserEntity]
})

export const connection = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Connected to database");
    } catch (error) {
        console.log(`Cannot connect to database`, error);
        process.exit(1);
    }
}