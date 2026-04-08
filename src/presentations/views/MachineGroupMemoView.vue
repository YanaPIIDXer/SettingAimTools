<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import type { MachineGroup } from '@/entites/MachineGroup';
import db from '@/db';

const groups = ref<MachineGroup[]>([]);
const inputGroupName = ref('');
const currentGroup = ref<MachineGroup | null>(null);
const machineNumbers = computed(() => currentGroup?.value?.machineNumbers ?? []);

/**
 * グループ追加
 */
const onAddGroup = () => {
  const newValue: MachineGroup = {
    groupName: inputGroupName.value,
    machineNumbers: new Array(100).fill(0),
  };
  groups.value.push(JSON.parse(JSON.stringify(newValue)));
  currentGroup.value = JSON.parse(JSON.stringify(currentGroup.value));
  if (!currentGroup.value) {
    currentGroup.value = newValue;
  }
  db.machineGroups.put(JSON.parse(JSON.stringify(newValue)));
  inputGroupName.value = '';
};

/**
 * グループが変更された
 */
const onGroupChange = (e: Event) => {
  const selectElement = e.target as HTMLSelectElement;
  const index = Number(selectElement.value);
  currentGroup.value = groups.value[index];
};

/**
 * 値の更新
 */
const onUpdateValue = async (e: Event) => {
  if (!currentGroup.value) { return; }
  
  const index = groups.value.findIndex(x => x.groupName === currentGroup.value?.groupName);
  if (index === -1) {
    groups.value.push(JSON.parse(JSON.stringify(currentGroup.value)));
  } else {
    groups.value[index].machineNumbers.splice(0);
    groups.value[index].machineNumbers.push(...currentGroup.value.machineNumbers);
  }
  
  await db.machineGroups.clear();
  await db.machineGroups.bulkAdd(JSON.parse(JSON.stringify(groups.value)));
};

/**
 * クリア
 */
const clear = () => {
  if (!confirm('クリアしますか？')) { return; }
  db.machineGroups.clear();
  currentGroup.value = null;
};

onMounted(async () => {
  groups.value = await db.machineGroups.toArray();
  groups.value = JSON.parse(JSON.stringify((groups.value)));
  currentGroup.value = groups.value[0] ?? null;
  currentGroup.value = JSON.parse(JSON.stringify(currentGroup.value));
});
</script>

<template>
  <main id="machineGroupMemoView">
    <form @submit="e => { e.preventDefault(); onAddGroup(); }">
      <input type="text" v-model="inputGroupName" placeholder="追加するグループ名" />
      <input type="submit" value="追加" />
    </form>
    <div>
      <button @click="clear">クリア</button>
    </div>
    <select @change="onGroupChange">
      <option v-for="(g, i) in groups" :key="i" :value="i">{{ g.groupName }}</option>
    </select>
    <div v-if="currentGroup">
      <table>
        <caption>{{ currentGroup.groupName }}</caption>
        <tbody>
          <tr v-for="(_, i) in machineNumbers" :key="i">
            <td>
              <input type="number" pattern="\d*" v-model="machineNumbers[i]" @keydown="onUpdateValue" :style="{ opacity: machineNumbers[i] === 0 ? 0.2 : 1 }" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style lang="sass" scoped>
#machineGroupMemoView
  .nextInput
    opacity: 0.7
</style>
