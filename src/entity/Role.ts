import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsValidRole } from '../validation/custum.validation';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 30 })
  @IsValidRole()
  name!: string;
}
