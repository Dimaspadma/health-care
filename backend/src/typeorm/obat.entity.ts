import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Obat {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'text',
    name: 'nama_obat',
  })
  nama_obat: string;

  @Column({
    type: 'text',
    name: 'kemasan',
  })
  kemasan: string;

  // Column harga with int
  @Column({
    type: 'int',
    name: 'harga',
    unsigned: true,
  })
  harga: number;

  // Column stok with int
  @Column({
    type: 'int',
    name: 'stok',
    unsigned: true,
  })
  stok: number;
}
