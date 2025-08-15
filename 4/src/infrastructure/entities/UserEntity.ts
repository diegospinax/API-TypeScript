import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id_user?: number;
    @Column({type: "varchar", length: 255})
    name_user: string;
    @Column({type: "varchar", length: 255, unique: true})
    email_user: string;
    @Column({type: "varchar", length: 255})
    password_user: string;
    @Column({type: "boolean"})
    status_user: boolean;

    constructor(name_user: string, email_user: string, 
        password_user: string) {
        this.name_user = name_user;
        this.email_user = email_user;
        this.password_user = password_user;
        this.status_user = true;
    }
}