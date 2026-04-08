<script setup lang="ts">
import { ref, computed } from 'vue';

const gameCount = ref(0);
const bigCount = ref(0)
const regCount = ref(0)
const bigRatio = ref(0)
const regRatio = ref(0)
const totalRatio = ref(0);
const isValid = computed(() => gameCount.value !== 0);

const onUpdate = () => {
  const calc = (n: number) => {
    if (n <= 0) { return 0; }
    return Math.floor(gameCount.value / n * 10) / 10;
  }
  bigRatio.value = calc(bigCount.value);
  regRatio.value = calc(regCount.value);
  totalRatio.value = calc(bigCount.value + regCount.value);
};
</script>

<template>
  <main id="probCalcView">
    <h1>確率計算</h1>
    <div>
      <label>
        ゲーム数 <input type="number" v-model="gameCount" @change="onUpdate" min="0" />
        BIG回数 <input type="number" v-model="bigCount" @change="onUpdate" min="0" />
        REG回数 <input type="number" v-model="regCount" @change="onUpdate" min="0" />
      </label>
    </div>
    <div v-if="isValid">
      BIG確率: 1/{{ bigRatio }}<br />
      REG確率: 1/{{ regRatio }}<br />
      合算: 1/{{ totalRatio }}<br />
    </div>
  </main>
</template>

<style lang="sass" scoped>
</style>
