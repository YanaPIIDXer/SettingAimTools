<script setup lang="ts">
import { ref, reactive } from 'vue';

interface MachineStatus {
  machineNo: number;
  games: number;
  bigCount: number;
  regCount: number;
}

const machines = ref<MachineStatus[]>([]);
const nextMachine = reactive<MachineStatus>({
  machineNo: 0,
  games: 0,
  bigCount: 0,
  regCount: 0,
});

/**
 * 確率計算
 */
const calcRatio = (games: number, count: number) => {
  if (games <= 0 || count <= 0) { return -1; }
  return Math.floor(games / count * 10) / 10;
};

/**
 * キーダウンイベント
 */
const onKeyDown = (e: KeyboardEvent) => {
  if (e.key.toLowerCase() !== 'enter') { return; }

  const target = e.target as HTMLInputElement;
  const tr = target.closest('tr');
  if (!tr) { throw new Error('HTML構造崩壊'); }
  const inputs = tr.querySelectorAll('.forInput > input') ?? [];

  const findNext = (list: NodeListOf<Element>, findTarget: Element): number => {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === findTarget) { return i + 1; }
    }
    return -1;
  }
  
  let index = findNext(inputs, target);
  if (index === -1) {
    alert('Invalid Index');
    return;
  }

  if (index < inputs.length) {
    const input = inputs[index];
    if (input) {
      (input as HTMLInputElement).focus();
    }
  } else {
    if (tr.classList.contains('forNext')) {
      machines.value.push(JSON.parse(JSON.stringify(nextMachine)) as MachineStatus)
      nextMachine.machineNo = 0;
      nextMachine.games = 0;
      nextMachine.bigCount = 0;
      nextMachine.regCount = 0;
      const input = tr.querySelectorAll('.forInput > input')[0];
      if (input) {
        (input as HTMLInputElement).focus();
      }
    } else {
      const tbody = tr.closest('tbody');
      if (!tbody) { return; }
      const trList = tbody.querySelectorAll('tr') || [];
      const nextIndex = findNext(trList, tr);
      if (nextIndex === -1) { throw new Error('何かの間違い'); }
      if (trList[nextIndex]) {
        const input = trList[nextIndex].querySelectorAll('input')[0] ?? null;
        if (inputs) {
          (input as HTMLInputElement).focus();
        }
      }
    }
  }
};
</script>

<template>
  <main id="totalCalcView">
    <table>
      <thead>
        <tr>
          <th>台番号</th>
          <th>ゲーム数</th>
          <th>BIG回数</th>
          <th>REG回数</th>
          <th>BIG確率</th>
          <th>REG確率</th>
          <th>合算</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(machine, i) in machines" :key="i">
          <td class="forInput"><input type="number" v-model="machine.machineNo" min=0 @keydown="onKeyDown" /></td>
          <td class="forInput"><input type="number" v-model="machine.games" min=0 @keydown="onKeyDown" /></td>
          <td class="forInput"><input type="number" v-model="machine.bigCount" min=0 @keydown="onKeyDown" /></td>
          <td class="forInput"><input type="number" v-model="machine.regCount" min=0 @keydown="onKeyDown" /></td>
          <td>{{ calcRatio(machine.games, machine.bigCount) }}</td>
          <td>{{ calcRatio(machine.games, machine.regCount) }}</td>
          <td>{{ calcRatio(machine.games, machine.bigCount + machine.regCount) }}</td>
        </tr>
        <tr class="forNext">
          <td class="forInput"><input type="number" v-model="nextMachine.machineNo" min=0 @keydown="onKeyDown" /></td>
          <td class="forInput"><input type="number" v-model="nextMachine.games" min=0  @keydown="onKeyDown" /></td>
          <td class="forInput"><input type="number" v-model="nextMachine.bigCount" min=0 @keydown="onKeyDown" /></td>
          <td class="forInput"><input type="number" v-model="nextMachine.regCount" min=0 @keydown="onKeyDown" /></td>
          <td>1 / {{ calcRatio(nextMachine.games, nextMachine.bigCount) }}</td>
          <td>1 / {{ calcRatio(nextMachine.games, nextMachine.regCount) }}</td>
          <td>1 / {{ calcRatio(nextMachine.games, nextMachine.bigCount + nextMachine.regCount) }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style lang="sass" scoped>
</style>
