import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pasien {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'text',
    name: 'nama',
  })
  nama: string;

  @Column({
    type: 'text',
    name: 'alamat',
  })
  alamat: string;

  @Column({
    type: 'text',
    name: 'no_ktp',
  })
  no_ktp: string;

  @Column({
    type: 'text',
    name: 'no_hp',
  })
  no_hp: string;

  @Column({
    type: 'text',
    name: 'no_rm',
  })
  no_rm: string;
}
