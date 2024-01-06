import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pasien } from "./pasien.entity";
import { JadwalPeriksa } from "./jadwal_periksa.entity";
import { DetailPeriksa } from "./detail_periksa.entity";

@Entity()
export class Periksa {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id",
        unsigned: true
    })
    id: number;

    @Column({
        type: "int",
        name: "id_pasien",
        unsigned: true,
        nullable: true, 
    })
    id_pasien: number;

    @Column({
        type: "int",
        name: "id_jadwal_periksa",
        unsigned: true,
        nullable: true, 
    })
    id_jadwal_periksa: number;

    @Column({
        type: "int",
        name: "no_antrian",
        unsigned: true,
    })
    no_antrian: number;

    @Column({
        type: 'date',
        name: 'tgl_periksa',
      })
      tgl_periksa: Date;

    @Column({
        type: "text",
        name: "keluhan",
    })
    keluhan: string;

    @ManyToOne(() => Pasien)
    @JoinColumn({ name: 'id_pasien' })
    pasien: Pasien;

    @ManyToOne(() => JadwalPeriksa)
    @JoinColumn({ name: 'id_jadwal_periksa' })
    jadwalPeriksa: JadwalPeriksa;

    @OneToOne(() => DetailPeriksa, detailPeriksa => detailPeriksa.periksa)
    detailPeriksa: DetailPeriksa;

}