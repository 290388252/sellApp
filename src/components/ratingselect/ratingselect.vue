<template>
    <div class="ratingselect">
      <div class="rating-type">
        <span @click="select(2, $event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
        <span @click="select(0, $event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
        <span @click="select(1, $event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
      </div>
      <div class="switch" @click="toggleContent">
        <span class="icon-check_circle" :class="{'on':onlyContent}"></span>
        <span class="texts">只看有内容的评价</span>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .rating-type
    padding 18px 0
    border-1px(rgba(7, 17, 27, .1))
    .block
      padding: 8px 12px
      border-radius 2px
      display inline-block
      font-size 13px
      &.positive
        background rgba(0, 160, 220, .2)
        &.active
          color: #fff
          background rgb(0, 160, 220)
      &.negative
        background rgba(77, 85, 93, .2)
        &.active
          color: #fff
          background rgb(77, 85, 93)
      .count
        margin-left 8px
  .switch
    margin 12px 0 0 0
    padding-bottom 12px
    border-1px(rgba(7, 17, 27, .1))
    .icon-check_circle
      font-size 24px
      color: gray
      line-height 24px
      &.on
        color: #56b330
    .texts
      font-size 12px
      color: gray
      line-height 24px
</style>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
    export default {
      props: {
        ratings: {
          type: Array,
          default () {
            return [];
          }
        },
        selectType: {
          type: Number,
          default: ALL
        },
        onlyContent: {
          type: Boolean,
          default: true
        },
        desc: {
          type: Object,
          default() {
            return {
              all: '全部',
              positive: '满意',
              negative: '不满意'
            };
          }
        }
      },
      computed: {
        positive() {
          return this.ratings.filter((rating) => {
            return rating.rateType === POSITIVE;
          });
        },
        negative() {
          return this.ratings.filter((rating) => {
            return rating.rateType === NEGATIVE;
          });
        }
      },
      methods: {
        select(type, event) {
          if (!event._constructed) {
            return;
          }
          this.$emit('select', type);
        },
        toggleContent(event) {
          if (!event._constructed) {
            return;
          }
          this.$emit('toggle');
        }
      }
    };
</script>
