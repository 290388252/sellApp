<template>
    <div class="cartcontrol">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart"></div>
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
      font-size 24px
      line-height 24px
      padding 6px
      color rgb(0, 160, 220)
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
              console.log('a-click!');
              if (!this.food.count) {
                  Vue.set(this.food, 'count', 1);
              } else {
                  this.food.count++;
              }
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
