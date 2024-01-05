import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dokter } from "./dokter.entity";
import { Pasien } from "./pasien.entity";
import { Poli } from "./poli.entity";

@Entity()
export class JadwalPeriksa {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'int',
    name: 'id_dokter',
    nullable: true, 
  })
  id_dokter: number;

  @Column({
    type: 'int',
    name: 'id_poli',
    nullable: true,
  })
  id_poli: number;

  @Column({
    type: 'text',
    name: 'hari',
  })
  hari: string;

  @Column({
    type: 'time',
    name: 'jam_mulai',
  })
  jam_mulai: Date;

  @Column({
    type: 'time',
    name: 'jam_selesai',
  })
  jam_selesai: Date;

  @ManyToOne(() => Dokter)
  @JoinColumn({ name: 'id_dokter' })
  dokter: Dokter;

  @ManyToOne(() => Poli)
  @JoinColumn({ name: 'id_poli' })
  poli: Poli;
} 