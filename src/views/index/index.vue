<template>
  <common-layout :navList='navList' @serachSomething="serachSomething(arguments)" :isNavUrl="true">
      <div slot="content">
          <div class="box">
              <Menu @searchList="fetchFirstList(arguments)" :checkCategoryId="checkId"></Menu> 
              <div class="content">
                <div class="sort">
                     <div effect="dark" :class="item.isChecked ? 'tag' : 'unTag'" v-for="(item, index) in sortList" :key="item.value" @click="checkSort(item, index)">{{item.name}}</div>
                </div>  
                <GoodsItem :goodsList="goodsList"></GoodsItem>
                <el-pagination v-if="goodsList.length > 0" style='text-align: center;margin-bottom: 20px;' :page-size="20" background layout="prev, pager, next" :total="total" @current-change="changCurrent"></el-pagination>
              </div> 
            <Footer></Footer>
          </div>
      </div>
  </common-layout>
</template>

<script>
import { BASELOGINURL } from '@/utils/config'
import Menu from '@/components/menu'
import { getGoodsList } from '@/api/market'
import GoodsItem from '@/components/goodsItem'
import Footer from '@/components/footer'
export default {
    components: { Menu, GoodsItem, Footer },
    data() {
        return {
            navList: [
                { name: '首页', url: BASELOGINURL+'/index.html' },
                { name: '资源超市', url: '/#' },
            ],
            sortList: [
                { name: '最新', value: 'addtime desc', isChecked: true },
                { name: '最热', value: 'salenum desc', isChecked: false },
            ],
            goodsList: [],
            searchConf: {
                orderStr: 'addtime desc',
                currentPage: 1,
                pageSize: 20,
            },
            total: 0,
            checkId: null,
        }
    },
    created() {
        this.searchConf['categorys[0].commoncategoryids'] = +this.$route.query.id || ''
        this.checkId = +this.$route.query.id || null
        this.fetchFirstGoods()
    },
    methods: {
        fetchFirstList(item) {
            this.searchConf = Object.assign(this.searchConf, item[0])
            this.fetchFirstGoods()
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
        serachSomething(item) {
            if(item[0] === '1') {
               this.searchConf.name = item[1]
               this.searchConf.storename = ''
            }else {
             this.searchConf.storename = item[1]
              this.searchConf.name = ''
            }
            this.fetchFirstGoods() 
        },
        async fetchFirstGoods() {
            this.searchConf.currentPage = 1
            this.searchConf.pageSize = 20
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
        }
    }
}
</script>

<style lang='scss' scoped>
.box {
    width: 100%;
    background-color: #f5f5f5; 
    .content {
      width: 1100px;
      margin: 0 auto;
      box-sizing: border-box;
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
            padding: 6px 15px;
            border-radius: 20px;
        }
        .unTag:hover {
            background-color: #f0eaea;
            padding: 6px 15px;
            border-radius: 20px;
            color: #999;
        }
    }
  }
}
</style>