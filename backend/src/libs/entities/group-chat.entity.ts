import { Column, Entity, OneToMany, ViewColumn } from 'typeorm';
import { Message } from './message.entity';
import { UserGroup } from './user-group.entity';

@Entity('groupChat', { schema: 'chatting' })
export class GroupChat {
  @Column('varchar', { primary: true, name: 'id', length: 255 })
  id: string;

  @Column('varchar', { name: 'group_name', length: 255 })
  groupName: string;

  @Column('varchar', { name: 'last_message', length: 255 })
  lastMessage: string;

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

  @OneToMany(() => Message, (message) => message.group)
  messages: Message[];

  @OneToMany(() => UserGroup, (userGroup) => userGroup.group, { cascade: true })
  userGroups: UserGroup[];
}
