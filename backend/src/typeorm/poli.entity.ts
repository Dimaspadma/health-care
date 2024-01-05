import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Poli {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'text',
    name: 'nama_poli',
  })
  nama_poli: string;

  @Column({
    type: 'text',
    name: 'keterangan',
  })
  keterangan: string;
}