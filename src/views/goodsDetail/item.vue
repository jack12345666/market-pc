<template>
  <div class="goodsList">
      <div class="goodsItem" v-for="item in goodsList" :key="item.id" @click="toGoodsDetail(item.id)">
            <el-image :src="item.image | imgFormat" class="img">
                <div slot="error" class="errorImg">
                   <img  style="width: 80px;height: 70px;" :src="require('@/assets/nothing.png')"/>
                </div>
                </el-image>  
            <div class="name">{{item.name}}</div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        goodsList: {
            type: Array,
            default: function() {
                return []
            }
        } 
    },
    methods: {
       toGoodsDetail(id) {
           this.$router.push({path: `/redirect/goodsDetail/${id}`})
       } 
    }
}
</script>

<style lang='scss' scoped>
.goodsItem:hover {
    background-color: #f5f5f5;
    cursor: pointer;
}
.goodsItem {
    display: flex;
    padding: 10px;
    .img {
        width: 80px;
        height: 60px;
    }
    .name {
        margin-left: 15px;
        color:#666;
        flex: 1;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        height: 55px;
    }
}
</style>