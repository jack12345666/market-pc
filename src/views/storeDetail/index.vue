<template>
  <common-layout :navList="navList" @serachSomething="serachSomething(arguments)" :selectDisabled="true">
      <div slot="content">
        <div class="box" v-if="storeDetail"> 
         <div class="banner" :style='backgroundDiv'> 
             <!-- <div class="storeName">{{storeDetail.name}}</div> -->
         </div>  
         <div class="content">
            <el-tabs v-model="activeName" stretch @tab-click="handleClick">
                <el-tab-pane label="卖家介绍" name="introduce">
                    <div v-if="storeDetail.description" class="text" v-html="storeDetail.description"></div>
                    <div v-else class="text">{{storeDetail.introduce}}</div>
                </el-tab-pane>
                <el-tab-pane label="服务产品" name="product">
                    <Menu v-if="firstCategoryId" :firstCategoryId="firstCategoryId" :firstCategoryName="firstCategoryName" @searchList="fetchFirstList(arguments)"></Menu> 
                    <div class="sort">
                     <div effect="dark" :class="item.isChecked ? 'tag' : 'unTag'" v-for="(item, index) in sortList" :key="item.value" @click="checkSort(item, index)">{{item.name}}</div>
                  </div>  
                    <GoodsItem :goodsList="goodsList"></GoodsItem>
                    <el-pagination v-if="goodsList.length > 0" style='text-align: center;margin-bottom: 20px;' :page-size="20" background layout="prev, pager, next" :total="total" @current-change="changCurrent"></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="卖家资质" name="qualification">
                    <div class="text" v-html="storeDetail.qualifications"></div>
                </el-tab-pane>
            </el-tabs> 
         </div>
        <Footer></Footer>
        </div>
      </div>
  </common-layout>
</template>

<script>
import { getStoreDetail, getGoodsList } from '@/api/market'
import Footer from '@/components/footer'
import Menu from '@/components/menu'
import { BASEURL } from '@/utils/config'
import GoodsItem from '@/components/goodsItem'
export default {
    components: { Footer, Menu, GoodsItem },
    data() {
        return {
            navList: [
                { name: '资源超市', url: '' },
                { name: '店铺详情', url: '' },
            ],
            activeName: 'introduce',
            storeId: null,
            storeDetail: null,
            firstCategoryId: null,
            firstCategoryName: '',
            goodsList: [],
            searchConf: {
                orderStr: 'addtime desc',
                currentPage: 1,
                pageSize: 20,
                storeid: null,
            },
            total: 0,
            showProduct: false,
            sortList: [
                { name: '最新', value: 'addtime desc', isChecked: true },
                { name: '最热', value: 'salenum desc', isChecked: false },
            ],
            backgroundDiv: {
             backgroundImage:"url(" + require('@/assets/350.jpg') + ")",
             backgroundRepeat:'no-repeat',
             backgroundSize:'100% 100%'
         }
       }
    },
    created() {
        this.storeId = this.$route.params.id
        this.searchConf.storeid = this.storeId 
        if(this.storeId) {
           this.fetchStoreDetail()
        }  
    },
    methods: { 
        handleClick(tab) {
           if(tab.name === 'product'){
               this.fetchFirstGoods()
           }
        },
        checkSort(item, index) {
          item.isChecked = true
          let arr = []
          this.sortList.forEach(i => {
              arr.push({
                  value: i.value,
                  name: i.name,
                  isChecked: false
              })
          })
          this.sortList = arr
          this.sortList[index] = item 
          this.searchConf.orderStr = item.value
          this.fetchFirstGoods()
        },
        async fetchStoreDetail() {
            let rsp = await getStoreDetail(this.storeId)
            if(rsp && rsp.code === 0) {
                this.storeDetail = rsp.data.data
                this.firstCategoryId = this.storeDetail.categorys[0].commoncategoryid
                this.firstCategoryName = this.storeDetail.categorys[0].commoncategoryname
                if(this.storeDetail.banner) {
                    this.backgroundDiv.backgroundImage = "url(" + BASEURL + this.storeDetail.banner + ")"
                }
                this.navList[1].name = this.storeDetail.name
                document.title = '钱塘新区投资之家 - '+ this.storeDetail.name
            }
        },
        serachSomething(item) {
            this.searchConf.name = item[1]
            this.searchConf.storeid = this.storeId
            this.activeName = 'product'
            this.fetchFirstGoods() 
        },
        fetchFirstList(item) {
            this.searchConf = Object.assign(this.searchConf, item[0])
            this.fetchFirstGoods()
        },
        async fetchFirstGoods() {
            this.searchConf.currentPage = 1
            this.searchConf.pageSize = 20
            this.searchConf['categorys[0].commoncategoryids'] = this.firstCategoryId
            let rsp = await getGoodsList(this.searchConf)
            if(rsp && rsp.code === 0) {
                this.goodsList = rsp.data.data.items
                this.total = rsp.data.data.totalNum
            }
        },
        async changCurrent(value) {
           this.searchConf.currentPage = value
            let rsp = await getGoodsList(this.searchConf)
            if(rsp && rsp.code === 0) {
                this.goodsList = rsp.data.data.items
                this.total = rsp.data.data.totalNum
            }
        },
    }
}
</script>

<style lang='scss' scoped>
.box {
   width: 100%;
  .banner {
        position: relative;
        width: 100%;
        height: 200px;
        .storeName {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: #555;
            font-size: 40px;
            font-weight: 700;
            letter-spacing: 5px;
        }
   }
  .content {
    width: 1100px;
    margin: 20px auto;
    box-sizing: border-box;
    min-height: calc(100vh - 598px); 
    .text {
        color: #666 !important;
        text-indent: 20px;
    }
     .sort {
        display: flex;
        align-items: center;
        .tag {
          border: none;
          margin: 15px 20px 15px 0;
          cursor: pointer; 
          background-color: #409eff;
          color: #fff; 
          padding: 6px 15px;
          font-size: 15px;
          border-radius: 20px;
        }
        .unTag {
            background-color: #f5f5f5;
            color: #555;
            border: none;
            margin: 15px 20px 15px 0;
            cursor: pointer;
            font-size: 15px;
            border-radius: 20px;
            padding: 6px 15px
        }
        .unTag:hover {
            background-color: #f0eaea;
            padding: 6px 15px;
            border-radius: 20px;
            color: #999;
        }
    }
    .text {
       img {
            width: 100% !important;
        }
    }
    .list {
        margin-bottom: 15px;
    }
  }
}
</style>