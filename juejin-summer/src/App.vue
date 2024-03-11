<!--
 * @Author: 贺永胜
 * @Date: 2022-05-22 14:21:10
 * @公众号: 百里青山
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-05-30 18:37:41
 * @Descripttion: 
-->
<template>
  <div id="app" tabindex="0" @keydown="keyupHandle">
    <!-- 游戏菜单页 -->
    <menu-module v-if="gameStatus === 'menu'" @start="gameStart"></menu-module>
    <!-- 天空 -->
    <div class="sky-wrap">
      <!-- 距离 -->
      <div class="total" v-show="gameStatus === 'start'">{{Math.floor(total)}}</div>
      <!-- 云朵 -->
      <cloud-model></cloud-model>
      <!-- 障碍物 -->
      <obstruction-model :speed="speed" :userStatus="userStatus" @gameOver="gameOver" ref="obsModule"></obstruction-model>
      <user-model :speed="speed" :status="userStatus" class="user-model"></user-model>
    </div>
    <!-- 地面 -->
    <div class="ground-wrap"></div>

    <!-- 游戏结束页 -->
    <game-over :total="total" v-show="gameStatus === 'over'" @restart="gameStart" @goHome="gameStatus = 'menu'"></game-over>
  </div>
</template>

<script>
import menuModule from '@/components/menuModule'
import userModel from '@/components/userModel.vue'
import cloudModel from '@/components/cloudModel.vue'
import obstructionModel from '@/components/obstructionModel.vue'
import gameOver from '@/components/gameOver'

export default {
  name: 'App',
  data() {
    return {
      gameStatus: 'menu',
      speed: 2,
      userStatus: '',
      canOperate: false,
      groundMoveInterval: null,
      total: 0,
    }
  },
  components: {
    userModel,
    cloudModel,
    obstructionModel,
    menuModule,
    gameOver
  },
  mounted() {
  },
  methods: {
    // 开始游戏
    gameStart() {
      this.gameStatus = 'start'
      this.userStatus = 'run'
      this.total = 0
      this.speed = 2
      this.canOperate = true
      this.groundScroll()
      this.$refs.obsModule.init()
    },
    // 地面背景横向滚动
    groundScroll() {
      let ground = document.querySelector('.ground-wrap');
      let _left = 0
      
      ground.style.backgroundPositionX = _left +'px';
      let cityMove = () => {
        if (_left <= -600) {
          _left = 0
        }
        _left -= this.speed * 3
        this.total += (this.speed / 10)
        if (this.total >= 100000) {
          this.speed = 6
        } else if (this.total >= 8000) {
          this.speed = 5.5
        } else if (this.total >= 6000) {
          this.speed = 5
        } else if (this.total >= 4000) {
          this.speed = 4.5
        } else if (this.total >= 2000) {
          this.speed = 4
        } else if (this.total >= 1000) {
          this.speed = 3.5
        } else if (this.total >= 500) {
          this.speed = 3
        } else if (this.total >= 200) {
          this.speed = 2.5
        }
        ground.style.backgroundPositionX = _left +'px';
        this.groundMoveInterval = requestAnimationFrame(cityMove)
      }
      cityMove()
    },
    keyupHandle(e) {
      if (!this.canOperate) {
        return
      }
      this.canOperate = false
      if (e.keyCode === 87 || e.keyCode === 38) {
        this.userStatus = 'jump'
        setTimeout(() => {
          this.canOperate = true
          this.userStatus = 'run'
        }, Math.max(900 - this.speed * 100, 400))
      }else if (e.keyCode === 83 || e.keyCode === 40) {
        this.userStatus = 'slide'
        setTimeout(() => {
          this.canOperate = true
          this.userStatus = 'run'
        }, Math.max(900 - this.speed * 100, 400))
      } else {
        this.canOperate = true
      }
    },
    gameOver() {
      cancelAnimationFrame(this.groundMoveInterval)
      this.userStatus = ''
      this.canOperate = false
      this.gameStatus = 'over'
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  user-select: none;
  font-family: 'Microsoft YaHei';
}
a {
  color: #0092ff;
  text-decoration: none;
}
#app {
  min-width: 1200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
/* 菜单 */

/* 天空 */
.sky-wrap {
  flex: 1;
  position: relative;
  background: linear-gradient(to bottom, #0094ff 0%, #ddeaff 100%);
}
.total {
  position: absolute;
  font-size: 76px;
  color: #fff;
  text-align: center;
  left: 50%;
  transform: translate(-50%);
  top: 50px;
}
.user-model {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translate(-50%, 0);
}
.ground-wrap {
  height: 150px;
  box-sizing: border-box;
  background: url('./assets/images/ground.png') #685166;
  background-repeat: repeat-x;
  background-size: 50px;
}

.login-wrap {
  position: absolute;
  right: 20px;
}
</style>
