import { Column, Entity, OneToMany } from 'typeorm';
import { Frienship } from './frienship.entity';
import { Message } from './message.entity';
import { Notification } from './notification.entity';
import { UserGroup } from './user-group.entity';

@Entity('users', { schema: 'chatting' })
export class Users {
  @Column('varchar', { primary: true, name: 'id', length: 255 })
  id: string;

  @Column('varchar', { name: 'email', length: 255 })
  email: string;

  @Column('varchar', { name: 'first_name', length: 255 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 255 })
  lastName: string;

  @Column('varchar', { name: 'middle_name', length: 255 })
  middleName: string;

  @Column('tinyint', { name: 'is_online', nullable: true, width: 1 })
  isOnline: boolean | null;

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

  @OneToMany(() => Frienship, (frienship) => frienship.user)
  frienships: Frienship[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => UserGroup, (userGroup) => userGroup.user)
  userGroups: UserGroup[];
}
