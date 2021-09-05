import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Group } from './group.entity';

@Index('sender_id', ['senderId'], {})
@Index('group_id', ['groupId'], {})
@Entity('message', { schema: 'chatting' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'content', length: 255 })
  content: string;

  @Column('varchar', { name: 'sender_id', length: 255 })
  senderId: string;

  @Column('varchar', { name: 'group_id', length: 255 })
  groupId: string;

  @Column('tinyint', { name: 'is_event', nullable: true, width: 1 })
  isEvent: boolean | null;

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

  @ManyToOne(() => Users, (users) => users.messages, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'sender_id', referencedColumnName: 'id' }])
  sender: Users;

  @ManyToOne(() => Group, (group) => group.messages, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  group: Group;
}
