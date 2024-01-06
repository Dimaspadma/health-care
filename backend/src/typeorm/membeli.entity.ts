import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Obat } from "./obat.entity";
import { Periksa } from "./periksa.entity";

@Entity()
export class Membeli {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'int',
    name: 'id_obat',
    nullable: true,
  })
  id_obat: number;

  @Column({
    type: 'int',
    name: 'id_periksa',
    nullable: true,
  })
  id_periksa: number;

  @Column({
    type: 'int',
    name: 'jumlah',
  })
  jumlah: number;

  @ManyToOne(() => Obat)
  @JoinColumn({ name: 'id_obat' })
  obat: Obat;

  @ManyToOne(() => Periksa)
  @JoinColumn({ name: 'id_periksa' })
  periksa: Periksa;
}