<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" alt="" width="64" height="64">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
          </div>
          <div v-if="seller.supports" class="supports">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div v-if="seller.supports" class="support-count">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bullentin-wrapper"></div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

    .header
      color: #fff
      background blueviolet
      .content-wrapper
        padding: 24px 12px 18px 24px
        position relative
        font-size: 0
        .avatar
          display: inline-block
          vertical-align top
          border-radius 2px
        .content
          margin-top 2px
          display: inline-block
          font-size 15px
          margin-left:16px
         .title
           margin-bottom 8px
          .brand
            display inline-block
            vertical-align top
            width: 30px
            height 20px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            font-weight bold
            line-height 18px
         .description
            font-size: 12px
            line-height 12px
            margin-bottom 10px
         .support
            font-size: 12px
           .icon
             display inline-block
             vertical-align top
             width: 13px
             height: 13px
             margin-right: 2px
             background-size: 13px 13px
             background-repeat no-repeat
             &.decrease
               bg-image('decrease_1')
             &.discount
               bg-image('discount_1')
             &.guarantee
               bg-image('guarantee_1')
             &.invoice
               bg-image('invoice_1')
             &.special
               bg-image('special_1')
           .text
              line-height: 12px
              font-size: 10px

        .support-count
          position absolute
          right: 12px
          bottom: 14px
          padding: 0 8px
          height: 24px
          line-height 24px
          border-radius 14px
          background: rgba(0, 0, 0, 0.2)
          text-align center
          .count
            font-size: 10px
          .icon-keyboard_arrow_right
            font-size: 10px
            margin-left: 2px
            line-height: 2
</style>

<script type="text/ecmascript-6">
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        }
    };
</script>
