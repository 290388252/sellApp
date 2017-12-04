<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="ratings-overview">
        <div class="ratings-overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="ratings-overview-right">
          <div class="score-wrapper">
            <span class="score-title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="score-title">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="score-title">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
    </div>
    <split></split>
    <div class="rating-wrapper">
      <ratingselect class="ratingselect" @toggle="toggleContent" @select="selectRatings" :selectType="selectType"
                    :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>

      <ul v-show="ratings && ratings.length">
        <li v-show="needShow(rating.rateType,rating.text)" class="rating-item" v-for="rating in ratings">
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
      <div class="no-rating" v-show="!ratings || !ratings.length">暂无评论喔~</div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    position: absolute
    top 177px
    bottom: 0
    overflow hidden
    width 100%
    left 0
    .ratings-overview
      display flex
      padding 18px 0
      .ratings-overview-left
        flex 0 0 137px
        width 137px
        border-right 1px solid gray
        text-align center
        @media only screen and (max-width: 320px)
          flex 0 0 120px
          width 120px
        .score
          color rgb(255, 153, 0)
          line-height 28px
          font-size 24px
          margin-bottom 8px
        .title
          font-size 12px
          color rgb(7, 17, 27)
          line-height 12px
          margin-bottom 8px
        .rank
          font-size 10px
          color: gray
          line-height 10px
      .ratings-overview-right
        flex 1
        padding-left 24px
        @media only screen and (max-width: 320px)
          padding-left 9px
        .score-wrapper
          line-height 18px
          margin-bottom 8px
          .score-title
            display inline-block
            margin-right 8px
            font-size 12px
            @media only screen and (max-width: 320px)
              margin-right 4px
          .star
            display inline-block
            margin-right 6px
            @media only screen and (max-width: 320px)
              margin-right 3px
          .score
            display inline-block
            font-size 12px
            color rgb(255, 153, 0)
          .deliveryTime
            font-size 12px
            color gray

</style>

<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/data';
  import split from '../split/split.vue';
  import star from '../star/star.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';

  const ERR_OK = 0;
  const ALL = 2;

  export default{
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    created () {
      this.$http.get('api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          console.log(response.data);
        }
      });
    },
    components: {
      split,
      star,
      ratingselect
    },
    methods: {
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
    }
  };
</script>
