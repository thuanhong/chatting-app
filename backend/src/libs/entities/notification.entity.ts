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
@Entity('notification', { schema: 'chatting' })
export class Notification {
  @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id_notify' })
  idNotify: number;

  @Column('varchar', { name: 'user_id', length: 255 })
  userId: string;

  @Column('varchar', { name: 'notify_type', length: 255 })
  notifyType: string;

  @Column('varchar', { name: 'notify_desc', length: 255 })
  notifyDesc: string;

  @Column('tinyint', { name: 'status', nullable: true, width: 1 })
  status: boolean | null;

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

  @ManyToOne(() => Users, (users) => users.notifications, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
