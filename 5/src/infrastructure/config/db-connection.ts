import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import environments from "./environment-vars";
'../config/environment-vars'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: environments.DB_HOST,
    port: Number(environments.DB_PORT),
    username: environments.DB_USER,
    password: environments.DB_PASSWORD,
    database: environments.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [UserEntity],
    schema: environments.DB_SCHEMA
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