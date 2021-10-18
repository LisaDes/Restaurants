<template>
  <div id="hello">
    <h1 style="text-align:center">{{msg}}</h1>
    <h2 style="margin-left:20px">TOP 5 des restaurants du moment</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #hello{
    text-align: left;
  }
</style>
