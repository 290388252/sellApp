<template>
    <div>
        I am ratings
    </div>
</template>

<style>
</style>

<script type="text/ecmascript-6">
    const ERR_OK = 0;
    export default{
      props: {
        seller: {
          type: Object
        }
      },
      created () {
        this.$http.get('api/ratings').then((response) => {
          response = response.body;
          if (response.errno === ERR_OK) {
            this.ratings = response.data;
            console.log(response.data);
          }
        });
      }
    };
</script>
