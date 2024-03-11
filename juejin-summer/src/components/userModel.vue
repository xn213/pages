<!--
 * @Author: 贺永胜
 * @Date: 2022-05-22 16:32:47
 * @公众号: 百里青山
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-05-29 00:37:26
 * @Descripttion: 人物模型
-->
<template>
  <div class='wrap'>
    <img class="user-img" ref="userImg" :src="userPic">
  </div>
</template>

<script>

export default {
  name: 'userModel',
  props: {
    speed: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      userRunList: [],
      slideList: [],
      userPic: '',
      standPic: require('@/assets/images/user/stand.png'),
      userJumpPic: require('@/assets/images/user/run/Run_000.png'),
      userSlidePic: require('@/assets/images/user/slide/Sliding_000.png'),
      runInterval: null, // 跑步定时器
      // 最后一次运动时间
      lastRunTime: 0,
    }
  },
  watch : {
    status: {
      handler(newVal) {
        cancelAnimationFrame(this.runInterval)
        this.$refs.userImg && this.$refs.userImg.classList.remove('slide', 'jump')
        if (newVal === 'run') {
          this.run()
        } else if (newVal === 'slide') {
          this.$refs.userImg.classList.add('slide')
          this.slide()
        } else if (newVal === 'jump') {
          this.$refs.userImg.classList.add('jump')
          this.jump()
        } else {
          this.userPic = this.standPic
        }
      },
      immediate: true
    }
  },
  mounted() {
    for (let index = 0; index < 10; index++) {
      let img = require('@/assets/images/user/run/Run_00'+index+'.png')
      this.userRunList.push(img)
    }
    // this.run()
  },
  methods: {
    // 动画
    run() {
      let _this = this
      let _index = 0

      let _run = () => {
        let now = new Date().getTime()
        if (now - this.lastRunTime > 120 - (this.speed * 20)) {
          if (_index > (this.userRunList.length - 1) ) {
            _index = 0
          }
          _this.userPic = this.userRunList[_index]
          _index++
          this.lastRunTime = now
        }
        this.runInterval = requestAnimationFrame(_run)
      }
      _run()
    },
    slide () {
      this.userPic = this.userSlidePic
    },
    jump () {
      this.userPic = this.userJumpPic
    }
    
  }
}
</script>
<style scoped>
.wrap {
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-img {
  width: 120px;
  height: 208px;
}
.user-img.slide {
  width: 133.4px;
  height: 163px;
}
.user-img.jump {
  margin-bottom: 80px;
}
</style>