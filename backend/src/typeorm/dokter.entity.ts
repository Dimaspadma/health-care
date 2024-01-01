import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dokter {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'text',
    name: 'nip',
  })
  nip: string;

  @Column({
    type: 'text',
    name: 'nama',
  })
  nama: string;

  @Column({
    type: 'text',
    name: 'password',
  })
  password: string;

  @Column({
    type: 'text',
    name: 'alamat',
  })
  alamat: string;

  @Column({
    type: 'text',
    name: 'no_hp',
  })
  no_hp: string;
}
