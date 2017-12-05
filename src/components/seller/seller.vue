<template>
    <div class="seller" ref="seller">
      <div>
        <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc">
            <star class="star" :size="36" :score="seller.score"></star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>分钟
              </div>
            </li>
          </ul>
          <div class="favorite" @click="toggleFavorite">
            <span class="icon-favorite" :class="{'active':favorite}"></span>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
        <split></split>
        <div class="bulletin">
          <div class="title">公告与活动</div>
          <div class="content-wrapper">
            <p class="content">{{seller.bulletin}}</p>
          </div>
          <ul class="supports">
            <li class="support-item" v-for="(item, index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="pics">
          <div class="title">商家实景</div>
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="pic in seller.pics">
                <img :src="pic" width="120px" height="90" alt="">
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="infos">
          <div class="title">商家信息</div>
            <ul class="info-list">
              <li class="info-item" v-for="info in seller.infos">
                <span class="info">{{info}}</span>
              </li>
            </ul>
        </div>
      </div>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .seller
    position: absolute
    top: 177px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      margin 18px 18px 0 18px
      .title
        font-size 14px
        line-height 14px
        margin-bottom 8px
        margin-left 2px
      .desc
        line-height 18px
        border-1px(rgba(7, 17, 27, .1))
        .star
          display inline-block
          margin-bottom 18px
        .text
          display inline-block
          font-size 10px
      .remark
        display: flex
        padding-top 18px
        padding-bottom 18px
        .block
          text-align: center
          flex: 1
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            font-size 10px
            color: gray
            line-height 10px
          .content
            font-size 10px
            line-height: 24px
            margin-top 4px
            color: rgb(7, 17, 27)
            .stress
              font-size 24px
      .favorite
        position absolute
        right 0
        top 0
        .icon-favorite
          display block
          text-align: center
          font-size 24px
          color: #d4d6d9
          line-height 24px
          &.active
            color: rgb(240, 21, 21)
        .text
          display block
          margin-top 4px
          font-size 10px
          color: rgb(77, 85, 93)
          line-height 10px
    .bulletin
      margin 18px 18px 0 18px
      .title
        font-size 14px
        line-height 14px
        margin-bottom 8px
      .content-wrapper
        margin-left 12px
        margin-right 12px
        padding-bottom 16px
        font-size 12px
        color red
        line-height 24px
        border-1px(rgba(7, 17, 27, .1))
      .supports
        .support-item
          margin-top 16px
          margin-left 12px
          margin-right 12px
          padding-bottom 16px
          border-1px(rgba(7, 17, 27, .1))
          &:last-child
            &:after
              display none
              padding-bottom 0
              margin-bottom 0
          .icon
            display: inline-block
            width: 16px
            height: 16px
            background-size: 16px 16px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .text
            font-size 12px
            line-height 16px
    .pics
      margin 18px 18px 18px 18px
      .title
        font-size 15px
        line-height 14px
        margin-bottom 12px
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px

    .infos
      padding 18px 18px 0 18px
      .title
        font-size 15px
        line-height 14px
        padding-bottom 12px
      .info-list
        margin-right 12px
        margin-left 12px
        padding-bottom 18px
        .info-item
          padding-top 16px
          padding-bottom 16px
          border-before-1px(rgba(7, 17, 27, .1))
          .info
            font-size 12px
            color: rgb(7, 17, 27)
</style>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import BScroll from 'better-scroll';
  export default{
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
          favorite: false
        };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    computed: {
      favoriteText() {
          return this.favorite ? '已收藏' : '未收藏';
      }
    },
    components: {
      split,
      star
    },
    mounted() {
      this.$nextTick(() => {
          this._initScroll();
          this._initPic();
      });
    },
    methods: {
      _initScroll() {
          if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.seller, {
                  click: true
              });
          } else {
              this.scroll.refresh();
          }
      },
      _initPic() {
          if (this.seller.pics) {
              let picWidth = 120;
              let margin = 6;
              let width = (picWidth + margin) * this.seller.pics.length - margin;
              this.$refs.picList.style.width = width + 'px';
              this.$nextTick(() => {
                if (!this.picScroll) {
                    this.picScroll = new BScroll(this.$refs.picWrapper, {
                        scrollX: true,
                        eventPassthrough: 'vertical'
                    });
                } else {
                    this.picScroll.refresh();
                }
              });
          }
      },
      toggleFavorite(event) {
          if (!event._constructed) {
              return;
          }
          this.favorite = !this.favorite;
      }
    }
  };
</script>
