import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import { Product } from './product';

@Entity('variants')
export class Variant extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column({ name: 'additional_cost', type: 'decimal', precision: 10, scale: 2, default: 0 })
  additionalCost: number;

  @Column({ name: 'stock_count' })
  stockCount: number;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, product => product.variants, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
