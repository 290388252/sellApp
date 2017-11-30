<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
        opacity: 1;
        transform translate3D(0, 0, 0)
      .inner
        display inline-block
        font-size 24px
        line-height 24px
        color rgb(0, 160, 220)
        transition:all 0.4s linear
        transform rotate(0)
      &.move-enter, &.move-leave-active
        opacity: 0;
        transform translate3D(24px, 0, 0)
        .inner
          transform rotate(180deg)
    .cart-count
      display inline-block
      font-size 12px
      margin-top 10px
      color gray
    .cart-add
      display inline-block
      font-size 24px
      line-height 24px
      padding 6px
      color rgb(0, 160, 220)
</style>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default{
    props: {
      food: {
        type: Object
      }
    },
    created() {
      console.log(this.food);
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('add', event.target);
        console.log('add-click!');
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        console.log('d-click!');
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>
