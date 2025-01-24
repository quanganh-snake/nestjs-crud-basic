import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({
    type: 'boolean',
    default: true,
    nullable: true,
  })
  isDraft: boolean;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  isPublic: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}