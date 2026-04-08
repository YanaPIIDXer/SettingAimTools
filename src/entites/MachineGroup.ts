import { type MachineStatus } from "./MachineStatus";

export interface MachineGroup {
  id: number;
  groupName: string;
  machines: MachineStatus[];
}
