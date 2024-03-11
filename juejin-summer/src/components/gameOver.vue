<!--
 * @Author: 贺永胜
 * @Date: 2022-05-29 16:39:25
 * @公众号: 百里青山
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-05-30 15:13:11
 * @Descripttion: 游戏结束页
-->
<template>
  <div class='gameover-wrap'>
    <div class="title">游戏结束!</div>
    <!-- 总距离 -->
    <div class="menu-total">
      <div class="total-desc">您的成绩为</div>
      <div class="total-menu">{{Math.floor(total)}}m</div>
    </div>
    <div class="menu-box">
      <div class="menu-item" @click="$emit('restart')">再来一次</div>
      <!-- <div class="menu-item" @click="uploadScore">上传成绩</div> -->
      <div class="menu-item" @click="$emit('goHome')">返回首页</div>
      <a href="https://juejin.cn/post/7103423600660578341/" target="_blank" class="menu-item">点赞作者</a>
    </div>
    <div class="upload-wrap">
      <input v-model="uid" type="text" class="upload-input" placeholder="请输入您的掘金ID">
      <div class="upload-btn" @click="uploadScore">上传成绩</div>
    </div>
    <p class="tips">掘金id为您的个人主页链接juejin.cn/user/后面的数字</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'gameOver',
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      uid: ''
    }
  },
  methods: {
    // 上传成绩
    uploadScore() {
      if (!this.uid) {
        alert('请输入您的掘金UID')
        return
      }
      axios.post('http://summer.node.pkec.net/api/upload', {
        uid: this.uid,
        value: Math.floor(this.total)
      }).then(res => {
        if (res.data.code === 0) {
          alert(res.data.message)
        } else {
          alert(res.data.message)
        }
      })
    }
  }
}
</script>
<style scoped>
.gameover-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  margin-top: 8vh;
  font-size: 60px;
  font-weight: bold;
  color: #fff;
}

.menu-total {
  text-align: center;
  color: #fff;
  margin-top: 8vh;
}

.total-desc {
  font-size: 26px;
}

.total-menu {
  font-size: 72px;
}
.menu-box {
  width: 500px;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
}

.menu-item {
  display: inline-block;
  color: #fff;
  background: #45aaff;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.upload-wrap {
  width: 300px;
  display: flex;
  margin-top: 20px;
  border-radius: 5px;
  /* border: 1px solid #aaa; */
  overflow: hidden;
}
.upload-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0 10px;
}
.upload-btn {
  color: #fff;
  background: #45aaff;
  padding: 10px 20px;
  cursor: pointer;
}
.tips {
  font-size: 12px;
  color: #fff;
  margin-top: 10px;
}
</style>