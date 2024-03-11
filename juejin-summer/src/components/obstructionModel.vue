<!--
 * @Author: 贺永胜
 * @Date: 2022-05-25 19:06:54
 * @公众号: 百里青山
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-05-30 17:36:51
 * @Descripttion: 
-->
<template>
  <div class="obstruction-wrap" ref="obstructionWrap">
    <!-- <div class="obs-list">
      <div class="obs-item"></div>
      <div class="obs-item"></div>
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'obstructionModel',
  props: {
    speed: {
      type: Number,
      default: 1
    },
    userStatus: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      screenWidth: document.documentElement.clientWidth,
      obsInterval: [400, 600], // 障碍物间隔
      obsMoveInterval: null
    }
  },
  mounted () {

  },
  methods: {
    init () {
      // 移除所有障碍物
      this.$refs.obstructionWrap.innerHTML = ''
      this.createObstruction()
      this.obsMove()
    },
    // 生成障碍物
    createObstruction () {
      let obsList = document.createElement('div')
      // 让障碍物随机在上方或者下方
      let state = Math.random() > 0.5 ? 'top' : 'bottom'
      obsList.className = 'obs-list-' + state
      obsList.state = state
      let random = Math.ceil(Math.random() * (this.speed - 2))
      random = Math.max(random, 1)
      for (let index = 0; index < random; index++) {
        let obsItem = document.createElement('div')
        obsItem.className = 'obs-item'
        obsList.appendChild(obsItem)
      }
      obsList.style.left = this.screenWidth + 'px'
      // obsList.createNext = false // 是否已创建下一个障碍物
      obsList.nextSpace = Math.random() * (this.obsInterval[1] - this.obsInterval[0]) + this.obsInterval[0] // 下一个障碍物间隔

      this.$refs.obstructionWrap.appendChild(obsList)
    },
    // 整体障碍物移动
    obsMove () {
      // 获取所有障碍物
      let obsDoms = this.$refs.obstructionWrap.children
      let obsList = Array.from(obsDoms)

      let nextItem = null

      // 给每个障碍物添加移动
      for (let index = 0; index < obsList.length; index++) {
        let item = obsList[index]
        if (item.offsetLeft < -item.offsetWidth) {
          this.$refs.obstructionWrap.removeChild(item)
        } else {
          item.style.left = item.offsetLeft - this.speed * 3 + 'px'
        }

        // 由于只需要找到第一个符合条件的障碍物即可，所以这里需要进行判断
        if (!nextItem) {
          // 找到人物右侧最近的障碍物，进行碰撞检测
          // 需要进行检测的障碍物需满足条件：距离屏幕左侧距离>人物距离左侧距离+自身宽度
          // 人物宽度为120，人物距离左侧距离为屏幕的一半减去自身的一半
          if (item.offsetLeft > (this.screenWidth / 2 - 60 - item.offsetWidth)) {
            nextItem = item
          }
        }
      }

      // 碰撞检测
      // 当距离最近的障碍物处于检测区时，进行碰撞检测
      if (nextItem.offsetLeft < (this.screenWidth / 2 + 60)) {
        if (nextItem.state === 'top') {
          if (this.userStatus !== 'slide') {
            this.$emit('gameOver')
            // 游戏结束
            // alert('游戏结束')
            // this.gameOver()
            return
          }
        } else {
          if (this.userStatus !== 'jump') {
            // 游戏结束
            this.$emit('gameOver')
            //  alert('游戏结束')
            //  this.gameOver()
            return
          }
        }
      }

      // 找到最后一个障碍物，创建下一个障碍物
      let lastChild = obsList[obsList.length - 1]
      // console.log(lastChild.nextSpace);
      if (lastChild.offsetLeft < (this.screenWidth - lastChild.offsetWidth - lastChild.nextSpace)) {
        this.createObstruction()
      }
      this.obsMoveInterval = requestAnimationFrame(this.obsMove)
    },
    // 游戏结束
    gameOver () {
      cancelAnimationFrame(this.obsMoveInterval)
    }
  }
}
</script>
<style>
.obstruction-wrap {
  width: 100%;
  height: 210px;
  position: absolute;
  bottom: 0;
  bottom: -25px;
  overflow: hidden;
}
.obs-list-top {
  position: absolute;
  display: flex;
}

.obs-list-bottom {
  position: absolute;
  display: flex;
  bottom: 0;
}
.obs-item {
  width: 50px;
  height: 50px;
  background: url('../assets/images/obs.png') no-repeat;
  background-size: 100%;
}
</style>