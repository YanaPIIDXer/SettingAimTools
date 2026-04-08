<script setup lang="ts">
import { ref, computed } from 'vue';
import { type MachineStatus } from '@/entites/MachineStatus';

const machines = ref<MachineStatus[]>([{
  machineNo: 0,
  games: 0,
  bigCount: 0,
  regCount: 0,
}]);

const totalGames = computed(() => {
  let total = 0;
  machines.value.forEach(x => {
    total += x.games;
  });
  return total;
});
const totalBigCount = computed(() => {
  let total = 0;
  machines.value.forEach(x => {
    total += x.bigCount;
  });
  return total;
});
const totalRegCount = computed(() => {
  let total = 0;
  machines.value.forEach(x => {
    total += x.regCount;
  });
  return total;
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
  const target = e.target as HTMLInputElement;
  const tr = target.closest('tr');
  if (!tr) { throw new Error('HTML構造崩壊'); }
  if (tr.querySelector('.lastItem')) {
    machines.value.push({
      machineNo: 0,
      games: 0,
      bigCount: 0,
      regCount: 0,
    });
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
          <td class="forInput"><input type="number" v-model="machine.machineNo" pattern="\d*" min=0 @keydown="onKeyDown" /></td>
          <td class="forInput"><input type="number" v-model="machine.games" pattern="\d*" min=0 @keydown="onKeyDown" /></td>
          <td class="forInput"><input type="number" v-model="machine.bigCount" pattern="\d*" min=0 @keydown="onKeyDown" /></td>
          <td class="forInput"><input type="number" v-model="machine.regCount" pattern="\d*" min=0 @keydown="onKeyDown" /></td>
          <td>1/{{ calcRatio(machine.games, machine.bigCount) }}</td>
          <td>1/{{ calcRatio(machine.games, machine.regCount) }}</td>
          <td>1/{{ calcRatio(machine.games, machine.bigCount + machine.regCount) }}</td>
          <td v-if="i === machines.length - 1" class="lastItem"></td>
        </tr>
        <tr>
          <td>合算</td>
          <td>{{ totalGames }}</td>
          <td>{{ totalBigCount }}</td>
          <td>{{ totalRegCount }}</td>
          <td>1/{{ calcRatio(totalGames, totalBigCount) }}</td>
          <td>1/{{ calcRatio(totalGames, totalRegCount) }}</td>
          <td>1/{{ calcRatio(totalGames, totalBigCount + totalRegCount) }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style lang="sass" scoped>
</style>
