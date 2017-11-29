<template>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费 {{deliveryPrice}} 元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
              {{payDesc}}
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 45px
    .content
      display flex
      background #141d27
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -12px
          margin: 0 11px
          padding: 6px
          width: 54px
          height: 54px
          vertical-align top
          box-sizing border-box
          border-radius 50%
          background #141d27
          .num
            position: absolute
            top: 0
            right: 0
            width 24px
            height: 16px
            line-height: 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color: #fff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
          .logo
            width: 100%
            height 100%
            border-radius 50%
            background rgb(43, 52, 60)
            text-align center
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              font-size 24px
              line-height 42px
              color gray
              &.highlight
                color white
        .price
          display: inline-block
          vertical-align top
          font-size 16px
          line-height 12px
          margin-top 16px
          box-sizing border-box
          font-weight 600
          padding-right 12px
          color gray
          &.highlight
            color white
        .desc
          display: inline-block
          font-size 12px
          line-height 12px
          margin-top 16px
          color gray
      .content-right
        flex: 0 0 105px
        width 105px
        .pay
          font-size 13px
          height 46px
          line-height 46px
          text-align center
          &.not-enough
            background #2b333b
            color gray
          &.enough
            background #00b43c
            color white
</style>

<script type="text/ecmascript-6">
    export default{
        props: {
          selectFoods: {
              type: Array,
              default () {
                  return [
                    {
                      price: 20,
                      count: 1
                    }
                  ];
              }
          },
          deliveryPrice: {
              type: Number,
              default: 0
          },
          minPrice: {
              type: Number,
              default: 0
          }
        },
        computed: {
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                  count += food.count;
                });
                return count;
            },
            payDesc() {
                if (this.totalPrice === 0) {
                   return `￥${this.minPrice}元起送`;
                } else if (this.totalPrice > 0 && this.totalPrice < 20) {
                  let diff = this.minPrice - this.totalPrice;
                  return `还差￥${diff}元起送`;
                } else if (this.totalPrice >= 20) {
                  return `去结算`;
                }
            },
            payClass() {
                if (this.totalPrice < this.minPrice) {
                    return 'not-enough';
                } else {
                  return 'enough';
                }
            }
        }
    };
</script>
