<!--
 * @Author: 贺永胜
 * @Date: 2022-05-22 19:26:58
 * @公众号: 百里青山
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-05-30 13:51:36
 * @Descripttion: 
-->
<template>
  <div class="cloud-wrap" ref="cloudWrap">
  </div>
</template>

<script>

export default {
  name: 'cloud-model',
  data () {
    return {
      screenWidth: document.documentElement.clientWidth,
      lastCreateTime: 0,
      cloudFrequency: 10,
      cloudSpeed: 1
    }
  },
  mounted () {
    this.createCloud()
  },
  methods: {
    // 生成云朵
    createCloud() {
      let now = new Date().getTime()
      if (now - this.lastCreateTime > 3000) {
        // 创建云朵
        let cloudItem = document.createElement('div')
        cloudItem.className = 'cloud-item'
        // 设置云朵变化系数
        cloudItem.cloudScale = Math.random()
        // 设置云朵大小
        cloudItem.style.transform = 'scale('+cloudItem.cloudScale+')'
        // 设置云朵透明度
        cloudItem.style.opacity = cloudItem.cloudScale
        // 设置云朵位置
        let _left = this.screenWidth
        cloudItem.style.left = _left + 'px'
        let _top = Math.random() * 400
        cloudItem.style.top = _top + 'px'

        this.$refs.cloudWrap.appendChild(cloudItem)
        // 云朵移动
        let cloudMove = () => {
          // 云朵越大，移动速度越快
          let moveX = this.cloudSpeed * cloudItem.cloudScale
          let _left = +cloudItem.style.left.slice(0, -2)
          cloudItem.style.left = _left - moveX + 'px'

          // 如果云朵距离屏幕顶部距离大于等于屏幕高度，则移除此云朵
          if (cloudItem.offsetLeft < (-cloudItem.offsetWidth)) {
            this.$refs.cloudWrap.removeChild(cloudItem)
          } else {
            requestAnimationFrame(cloudMove)
          }
        }
        cloudMove()
        cloudMove()
        this.lastCreateTime = now
      }
      requestAnimationFrame(this.createCloud)
    },
  }
}
</script>
<style>
.cloud-wrap {
  width: 100vw;
  height: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.cloud-item {
  position: absolute;
  width: 175px;
  height: 55px;
  margin: 50px;
  border-radius: 100px;
  background: #fff;
}
.cloud-item::before, .cloud-item::after {
  content: '';
  display: block;
  background: #fff;
  position: absolute;
}
.cloud-item::before {
  content: '';
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  top: -90%;
  right: 10%;
}
.cloud-item::after {
  content: '';
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  top: -54%;
  left: 14%;
  transform: rotate(-25deg);
}
</style>