import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;
  
  @Column({
    type: 'text',
    name: 'username',
  })
  username: string;

  @Column({
    type: 'text',
    name: 'password',
  })
  password: string;
}