<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const startGames = ref(0);
const currentGames = ref(0);
const startBigCount = ref(0);
const startRegCount = ref(0);
const bigCount = ref(0);
const regCount = ref(0);
const grapeCount = ref(0);
const { bigRatio, regRatio, totalRatio, grapeRatio } = (function () {
  const fl = (v: number): number => Math.floor(v * 10) / 10;
  const rt = (v1: number, v2: number): string => v2 > 0 ? `1 / ${fl(v1 / v2)}` : '0';
  const bigRatio = computed(() => rt(currentGames.value, bigCount.value + startBigCount.value));
  const regRatio = computed(() => rt(currentGames.value, regCount.value + startRegCount.value));
  const totalRatio = computed(() => rt(currentGames.value, bigCount.value + startBigCount.value + regCount.value + startRegCount.value));
  const grapeRatio = computed(() => rt(currentGames.value - startGames.value, grapeCount.value));
  return {
    bigRatio,
    regRatio,
    totalRatio,
    grapeRatio,
  };
})();

watch(startGames, () => {
  if (currentGames.value < startGames.value) {
    currentGames.value = startGames.value;
  }
});
</script>

<template>
  <main id="jugglerCounterView">
    <div>
      <div>
        <label>開始ゲーム数: <input type="number" v-model="startGames" min="0" /></label>
      </div>
      <div>
        <label>開始BIG数: <input type="number" v-model="startBigCount" min="0" /></label>
      </div>
      <div>
        <label>開始REG数: <input type="number" v-model="startRegCount" min="0" /></label>
      </div>
    </div>
    <div>
      <div>
        <label>現在ゲーム数: <input type="number" v-model="currentGames" :min="startGames" /></label>
      </div>
      <div>
        <label>
          <button class="countButton" @click="grapeCount++">ブドウ</button> <input type="number" v-model="grapeCount" />
        </label>
      </div>
      <div>
        <label>
          <button class="countButton" @click="bigCount++">BIG</button> <input type="number" v-model="bigCount" /> + {{ startBigCount }}
        </label>
      </div>
      <div>
        <label>
          <button class="countButton" @click="regCount++">REG</button> <input type="number" v-model="regCount" /> + {{ startRegCount }}
        </label>
      </div>
    </div>
    <div>
      <div>BIG確率: {{ bigRatio }}</div>
      <div>REG確率: {{ regRatio }}</div>
      <div>合算: {{ totalRatio }}</div>
      <div>ブドウ確率: {{ grapeRatio }}</div>
    </div>
  </main>
</template>

<style lang="sass" scoped>
#jugglerCounterView
  font-size: 24px

  .countButton
    display: block
    font-size: 32px
</style>
