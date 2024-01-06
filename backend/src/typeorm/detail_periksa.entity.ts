import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Periksa } from "./periksa.entity";

@Entity()
export class DetailPeriksa {
  
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'int',
    name: 'id_periksa',
    unsigned: true,
  })
  id_periksa: number;

  @Column({
    type: 'text',
    name: 'catatan',
    nullable: true,
  })
  catatan: string;

  @Column({
    type: 'int',
    name: 'biaya_periksa',
  })
  biaya_periksa: number;

  @OneToOne(() => Periksa, periksa => periksa.detailPeriksa, {eager: false})
  @JoinColumn({ name: 'id_periksa' })
  periksa: Periksa;
}