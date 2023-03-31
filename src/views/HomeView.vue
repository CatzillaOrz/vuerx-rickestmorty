<template>
  <div class="home">
    <img alt="Vue logo" v-if="image$" :src="image$" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <button v-stream:click="plus$">+</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { getCharacter } from "rickmortyapi";
import { from, Observable, Subject } from "rxjs";
import { map, share, exhaustMap, delay, tap } from "rxjs/operators";

export const source$ = from(getCharacter(1)).pipe(share(), delay(3000));
@Component<HomeView>({
  components: {
    // HelloWorld,
  },
  subscriptions: function () {
    const image$ = source$.pipe(
      map((res) => res.data.image),
      tap((e) => console.log(e))
    );
    console.log(this.plus$);
    return { image$ };
  },
})
export default class HomeView extends Vue {
  test = "hello world";
  plus$ = new Subject();
  mounted() {
    // this.subscriptions();
  }
}
</script>
