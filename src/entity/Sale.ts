import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './Product';
import { User } from './User';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  products_id!: string;

  @Column('integer')
  qty!: number;

  @Column({ type: 'text', default: () => 'CURRENT_TIMESTAMP' })
  sale_at!: Date;

  @Column('uuid')
  users_id!: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'products_id' })
  product!: Product;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'users_id' })
  user!: User;
}
