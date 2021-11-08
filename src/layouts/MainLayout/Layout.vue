<template>
  <div class="main-content">
    <router-view v-slot="{ Component }" >
      <transition
        appear
        class="slideDuration"
        :enter-active-class="transitionEnter"
        :leave-active-class="transitionLeave"
        >
          <component :is="Component" :key="$route.fullPath" />
      </transition>
    </router-view>
  </div>

  <g-footer>
    <transition
      appear
      class="slideDuration"
      enter-active-class="slideInLeft"
      leave-active-class="slideOutLeft"   
      mode="out-in"
    >




      <q-toolbar key="sub-footer" v-if="showMainFooter">
        <q-btn flat icon="navigate_before" @click="$router.go(-1)" />
        <q-separator vertical />
        <q-space />
      </q-toolbar>



      <q-toolbar key="main-footer" v-else>
        <dot-menu/>
        
        <q-space />
        <q-tabs align="justify">
          <q-route-tab :to="{ name: 'workouts' }" icon="fitness_center" />
          <q-route-tab :to="{ name: 'overview' }" icon="preview" />
          <q-route-tab :to="{ name: 'diary' }" icon="event_note" />
        </q-tabs>
      </q-toolbar>




    </transition>
  </g-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { navigationDirection } from 'src/types'
import DotMenu from 'components/DotMenu'

interface transitionClassObj {
  upTrans:string
  downTrans:string
  stayTrans:string
}

export default defineComponent({
  name: 'MainLayout',
  components: {
    DotMenu
  },
  methods: {
    animationClassFromAction(action:transitionClassObj): string {
      const direction = this.$route.meta
        ?.navigationDirection as navigationDirection
      const animatitionClass =
        'animated ' +
        (
          (direction.up && action.upTrans) ||
          (direction.down && action.downTrans) ||
          (direction.same && action.stayTrans)
        ).toString()
      console.log(animatitionClass)
      return animatitionClass
    },
  },
  computed: {
    currentPanel() {
      return this.$route.matched[1]?.path === '/sub/' ? 'sub' : 'tab'
    },
    showMainFooter() {
      return this.$route.matched[1]?.path === '/sub/'
    },
    transitionEnter(): string {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return this.animationClassFromAction({
        upTrans: 'slide-in-right top-layer',
        downTrans: 'nudge-in-left bottom-layer',
        stayTrans: 'fadeIn',
      }) as string
    },
    transitionLeave(): string {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return this.animationClassFromAction({
        upTrans: 'nudge-out-left bottom-layer',
        downTrans: 'slide-out-right top-layer',
        stayTrans: 'fadeOut',
      }) as string
    },
  },
})
</script>
<style lang="scss" scoped>
/* .fade-out {
  animation-name: fade;
  animation-direction: reverse;
}
.fade-in {
  animation-name: fade;
} */
.slideDuration {
  animation-duration: 300ms;
}
.top-layer {
  z-index: 2000;
  //animation-timing-function: ease-in;
}
.bottom-layer {
  z-index: 3000;
  //animation-timing-function: ease-in-out;
}
.slide-out-right {
  animation-name: slide-right;
  animation-timing-function: ease-out;
  
}
.slide-in-right {
  animation-name: slide-right;
  animation-timing-function: ease-in;
  animation-direction: reverse;
  z-index: 2000;
}
.nudge-out-left {
  animation-name:nudge-left;
  animation-timing-function: ease-out;
  z-index: 1000;
}
.nudge-in-left {
  animation-name: nudge-left;
  animation-timing-function: ease-in;
  animation-direction: reverse;
  z-index: 1000;
}
/* @keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
 */
@keyframes slide-right {
  0% {
    transform: translate(0%);
    box-shadow: 0px 0px 0px 5000px rgba(0,0,0,0.2), 0px 0px 20px 10px rgba(0,0,0,0.3);
  }
  100% {
    transform: translate(100%);
    box-shadow: 0px 0px 0px 5000px rgba(0,0,0,0), 0px 0px 20px 10px rgba(0,0,0,0.3);
  }
}

@keyframes nudge-left {
  0% {
    transform: translate(0%);
   
    filter: blur(0px);
    //box-shadow: inset 500px 0px 15px 500px rgba(0,0,0,0);
  }
  100% {
    transform: translate(-40%);
 
    filter: blur(1px);
    //box-shadow: inset 500px 0px 15px 500px rgba(0,0,0,0.5);
  }
}
</style>
