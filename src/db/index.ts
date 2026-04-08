import { Dexie, type EntityTable } from 'dexie';
import { type MachineGroup } from '@/entites/MachineGroup';

const db = new Dexie('SettingAimTools') as Dexie & {
  machineGroups: EntityTable<
    MachineGroup,
    'id'
  >;
};

db.version(1).stores({
  machineGroups: '++id',
});

export default db;
