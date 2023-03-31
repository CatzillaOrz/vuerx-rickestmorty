<template>
  <div class="home">
    <img alt="Vue logo" v-if="image$" :src="image$" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <button v-stream:click="plus$">+</button>
    <button v-stream:click="reset$">reset</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { getCharacter } from "rickmortyapi";
import { from, Observable, Subject, interval } from "rxjs";
import { repeat, map, share, exhaustMap, delay, tap } from "rxjs/operators";
import { takeUntil } from "rxjs/operators";

export const source$ = from(getCharacter(1)).pipe(share(), delay(3000));
@Component<HomeView>({
  components: {
    // HelloWorld,
  },
  //domStreams: ["plus$"],
  subscriptions: function () {
    const image$ = source$.pipe(
      map((res) => res.data.image),
      tap((e) => console.log(e))
    );
    const tick$ = this.plus$.pipe(
      exhaustMap(() => interval(500)),
      map((i) => i++),
      tap((i) => {
        console.log(i);
      }),
      takeUntil(this.reset$),
      repeat()
    );
    return { image$, tick$ };
  },
})
export default class HomeView extends Vue {
  test = "hello world";
  plus$ = new Subject();
  reset$ = new Subject();
  mounted() {
    // this.subscriptions();
  }
}
</script>
