import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Index('user_id', ['userId'], {})
@Entity('contact', { schema: 'chatting' })
export class Contact {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', { name: 'user_id', length: 255 })
  userId: string;

  @Column('varchar', { name: 'contact_id', length: 255 })
  contactId: string;

  @Column('varchar', { name: 'type', nullable: true, length: 255 })
  type: string | null;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'modified_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @ManyToOne(() => Users, (users) => users.contacts, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
