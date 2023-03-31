<template>
  <div class="home">
    <img alt="Vue logo" v-if="image$" :src="image$" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { Character, getCharacter } from "rickmortyapi";
import { from, Observable } from "rxjs";
import { map, share, exhaustMap, delay, tap } from "rxjs/operators";

export const source$ = from(getCharacter(1)).pipe(share(), delay(3000));
@Component({
  components: {
    // HelloWorld,
  },
  subscriptions: function () {
    const image$ = source$.pipe(
      map((res) => res.data.image),
      tap((e) => console.log(e))
    );
    return { image$ };
  },
})
export default class HomeView extends Vue {
  mounted() {
    // this.subscriptions();
  }
}
</script>
