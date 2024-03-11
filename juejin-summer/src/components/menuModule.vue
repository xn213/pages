<!--
 * @Author: 贺永胜
 * @Date: 2022-05-29 15:28:56
 * @公众号: 百里青山
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-05-31 08:53:37
 * @Descripttion: 菜单页
-->
<template>
  <div class="menu-wrap">
    <div class="title">奔跑吧，程序员</div>
    <!-- 总距离 -->
    <div class="menu-total">
      <div class="total-desc">全员已累计奔跑</div>
      <!-- <div class="total-menu">{{ totalLoading ? '加载中' : (total/1000).toFixed(2) +'km' }}</div> -->
      <div class="total-menu">{{ totalLoading ? '加载中' : total+'m' }}</div>
    </div>
    <div class="menu-box">
      <div class="menu-item" @click="$emit('start')">开始游戏</div>
      <div class="menu-item" @click="showRanking = true">排行榜</div>
      <div class="menu-item" @click="showRule = true">游戏规则</div>
      <a href="https://juejin.cn/post/7103423600660578341/" target="_blank" class="menu-item">点赞作者</a>
    </div>

    <!-- 规则弹窗 -->
    <div class="log-mask" @click="showRule = false" v-show="showRule">
      <div class="log-wrap" @click.stop>
        <p class="rule-item">
          游戏背景：<br />
          夏天到了，又到了露肉的季节，你是否还随身携带着游泳圈？快来和大家一起跑步吧！
        </p>
        <p class="rule-item">
          游戏规则：<br />
          游戏开始后，游戏人物会主动向前奔跑，玩家需控制人物跳跃或者下滑躲避障碍物，随着游戏的进行，障碍物的数量和游戏人物的速度都会随之改变，当游戏人物碰到障碍物时，游戏结束
        </p>
        <p class="rule-item">
          操作说明：<br />
          按键 w 或 ↑ 控制人物跳跃<br />
          按键 s 或 ↓ 控制人物下滑<br />
        </p>
        <p class="rule-item">
          个人成绩上传：<br />
          游戏结束后玩家可上传本轮游戏的成绩，排行榜和总里程均依照此处成绩生成，上传成绩时需要填写本人掘金id，从而获取掘金用户名，一名用户可多次上传成绩，但是同样的成绩不可重复上传，游戏未设置防作弊机制，娱乐而已，希望大家不要作弊
        </p>
        <p class="rule-item">
          总里程：<br />
          游戏首页会显示所有用户的每一次上传成绩总和
        </p>
        <p class="rule-item">
          排行榜：<br />
          排行榜会取所有用户成绩前10名，单名玩家可重复上榜
        </p>
        <p class="rule-item">
          声明：<br />
          以上三项功能均需服务器支撑，由于服务器配置较低，也未设置防范机制，请大家不要恶意攻击，如有变故以上三项功能取消
        </p>
        <p class="rule-item">
          支持作者：<br />
          文章地址：<a href="https://juejin.cn/post/7103423600660578341/"
            >https://juejin.cn/post/7103423600660578341/</a
          ><br />
          游戏完全开源，如果对你有所帮助或者你觉得这个小游戏还可以，希望可以点击文章链接给个赞和评论<br />
          源码地址：<br />
        </p>
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="log-mask" @click="showRanking = false" v-show="showRanking">
      <div class="log-wrap" @click.stop>
        <div class="rank-list" v-if="rankingList && rankingList.length > 0">
          <div
            class="rank-item"
            v-for="(item,key) in rankingList"
            :key="item._id"
          >
            <div>
              {{key+1}}、<a class="rank-username" :href="'https://juejin.cn/user/'+item.uid" target="_blank">{{item.username}}</a>
            </div>
            <div class="rank-value">{{item.value}}</div>
          </div>
          <p class="rank-tips">*由于未设置防作弊机制，排行榜仅供参考</p>
        </div>
        <div class="rank-empty" v-else>暂无排行榜数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'menuModule',
  data () {
    return {
      showRule: false,
      showRanking: false,
      total: 0,
      totalLoading: true,
      rankingList: [],
      rankLoading: true
    }
  },
  mounted () {
    axios.get('http://summer.node.pkec.net/api/getTotal').then(res => {
      this.total = res.data.data || 0
      this.totalLoading = false
    })
    axios.get('http://summer.node.pkec.net/api/getRankingList').then(res => {
      this.rankingList = res.data.data
      this.rankLoading = false
    })

  }
}
</script>
<style scoped>
.menu-wrap {
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  z-index: 10;
  align-items: center;
}
.title {
  font-size: 60px;
  font-weight: bold;
  margin-top: 10vh;
  color: #fff;
}
.menu-total {
  text-align: center;
  color: #fff;
  margin-top: 10vh;
}

.total-desc {
  font-size: 26px;
}

.total-menu {
  font-size: 72px;
}
.menu-box {
  width: 500px;
  display: flex;
  justify-content: space-between;
  margin-top: 10vh;
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
.tips {
  text-align: center;
  line-height: 2;
  color: #005699;
  cursor: pointer;
}

/* 规则弹窗 */
.log-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.log-wrap {
  width: 500px;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  padding: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(10px);
  border-radius: 10px;
}
.rule-item {
  margin-bottom: 20px;
  color: #fff;
}

.rank-item {
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  color: #fff;
  padding: 10px 0;
  /* border-bottom: 1px solid #fff; */
}

.rank-username {
  color: #fff;
  text-decoration: underline;
}
.rank-tips {
  margin-top: 10px;
  color: #fff;
}
</style>