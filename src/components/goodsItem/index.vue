<template>
<div>
  <div class="goodsList">
    <div class="item" v-for="item in goodsList" :key="item.id" @click="toGoodsDetail(item.id)">
        <el-image style="width: 100%;overFlow: hidden;height: 210px; border-top-left-radius: 6px;border-top-right-radius: 6px;" :src="item.image | imgFormat" lazy>
             <div slot="error" class="errorImg">
                   <img  style="width: 100%;overFlow: hidden;height: 210px; border-top-left-radius: 6px;border-top-right-radius: 6px;" :src="require('@/assets/nothing.png')"/>
                </div>
        </el-image>
        <div class="info">
            <div class="price">{{item.price | priceFormat}}</div>
            <div class="name">{{item.name}}</div>
            <div class="store"><i class="el-icon-s-shop" style="color: #666;"></i> {{item.storename}}</div>
        </div>
    </div> 
  </div>
  <div class="nothing" v-if="goodsList.length === 0">
      <el-image :src="require('@/assets/nothing.png')"></el-image>
      <div class="text">暂无相关服务</div>
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
            this.$router.push({path: `/goodsDetail/${id}`})
        }
    }
}
</script>
<style lang='scss' scoped>
.goodsList {
    display: flex;
    flex-wrap: wrap;
    .item {
        &:hover {
           box-shadow: 0 2px 12px 0 #0000002a;
        }
        box-sizing: border-box;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: #ffffff;
        margin-bottom: 20px;
        margin-right: 15px;
        width: 260px;
        border: 1px solid #f5f5f5;
        cursor: pointer;
        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 130px;
            padding: 10px;
           .price {
                margin: 10px 0;
                color: #409eff;
                font-size: 18px;
                font-weight: 700;
            }
            .name {
                margin: 10px 0;
                display: -webkit-box;
                overflow: hidden;
                white-space: normal;
                text-overflow: ellipsis;
                word-wrap: break-word;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                flex: 1;
                font-size: 15px;
            }
            .store {
                margin: 10px 0;
                display: -webkit-box;
                overflow: hidden;
                white-space: normal;
                text-overflow: ellipsis;
                word-wrap: break-word;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                color: #666;
                font-size: 14px;
            } 
        } 
    } 
}
.nothing {
     margin: 40px 0;
     text-align: center;
    .text {
        color: #666;
        margin-top: 20px;
    }
}
</style>