<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back">
            <i class="icon-arrow_lift" @click="hide"></i>
          </div>
        </div>
        <div class="content">
          <div class="title">{{food.name}}</div>
          <div class="detail">
            月售{{food.sellCount}}份,好评率{{food.rating}}%
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="food_ratings">
          <h1 class="title">商品评价</h1>
          <ratingselect @toggle="toggleContent" @select="selectRatings" :selectType="selectType"
                        :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" class="rating-item" v-for="rating in food.ratings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="ratingtext">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评论喔~</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .food
    position: fixed
    left: 0
    top: 0
    width 100%
    bottom 45px
    z-index 30
    background white
    transform translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition all .2s linear
    &.move-enter, &.move-leave-active
      transform translate3d(100%, 0, 0)
    .image-header
      position relative
      width 100%
      height 50vh
      img
        position absolute
        top: 0
        left 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 20px
        left 15px
        color white
    .content
      position: relative;
      margin-top 18px
      margin-left 18px
      .title
        font-size 14px
        font-weight 700
        color: rgb(7, 17, 27)
        line-height 14px
      .detail
        font-size 10px
        color: rgb(147, 153, 159)
        margin-top 8px
        line-height 10px
      .price
        margin-top 10px
        margin-bottom 18px
        .now
          color: red
          font-size 14px
          font-weight 700
          line-height 24px
        .old
          color: gray
          font-size 10px
          font-weight 700
          line-height 24px
          text-decoration: line-through
          padding-left 6px
      .cartcontrol-wrapper
        position: absolute
        right: 18px
        bottom -5px
      .buy
        position: absolute
        right: 18px
        bottom 3px
        color white
        border-radius 12px
        font-size 10px
        height 24px
        line-height: 24px
        box-sizing border-box
        padding-left 12px
        padding-right 12px
        text-align center
        background rgb(0, 160, 220)
        z-index 10
        opacity 1
        &.fade-enter-active, &.fade-leave-active
          transition all 0.2s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index -1
    .info
      margin 18px 18px 18px 14px
      .text
        margin-left 8px
        margin-right 12px
        font-size 12px
        font-weight 200
        color: rgb(77, 85, 93)
        line-height 21px
    .food_ratings
      position relative
      margin 18px 18px 18px 14px
      .rating-wrapper
        padding-left 6px
        .rating-item
          position relative
          padding 14px 0
          border-1px(rgba(7, 17, 27, .1))
          .user
            position absolute
            top 10
            right 10px
            .name
              display: inline-block
              color: gray
              font-size 10px
              margin-right 5px
            .avatar
              border-radius 50%
          .time
            font-size 10px
            color: gray
          .ratingtext
            line-height 16px
            font-size 12px
            margin-top 6px
            .icon-thumb_up
              color rgb(0, 160, 220)
        .no-rating
          padding-bottom 15px
          font-size 12px
          color gray
</style>

<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/data';
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/carcontrol.vue';
  import split from '../split/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import Vue from 'vue';
  const ALL = 2;
  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  export default {
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
            console.log(this.scroll);
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      addFood(target) {
        this.$emit('add', target);
      },
      selectRatings(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  };
</script>
