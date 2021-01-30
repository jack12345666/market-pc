<template>
  <common-layout :navList='navList' :showSearch="false" :isNavUrl="true" :isShowCart="false">
      <div slot="content">
          <div class="box">
              <div class="content">
                <div class="select">
                <div class="sort">
                     <div effect="dark" :class="item.isChecked ? 'tag' : 'unTag'" v-for="(item, index) in sortList" :key="item.value" @click="checkSort(item, index)">{{item.name}}</div>
                </div> 
                <div class="search">
                 <el-input placeholder="请输入活动名称" v-model="searchValue" clearable><template slot="append"><el-button type="primary" icon="el-icon-search" @click="searchActive"></el-button></template></el-input>
                </div>
                </div>
                <active-item :activityList="activityList"></active-item>
                <el-pagination v-if="activityList.length > 0" style='text-align: center;margin-bottom: 20px;' :page-size="8" background layout="prev, pager, next" :total="total" @current-change="changCurrent"></el-pagination>
                <div class="nothing"  v-if="activityList.length === 0">
                    <el-image :src="require('@/assets/empty.png')"></el-image>
                    <div class="tips">暂无相关活动</div>
                </div>
              </div> 
            <Footer></Footer>
          </div>
      </div>
  </common-layout>
</template>

<script>
import { BASELOGINURL } from '@/utils/config'
import { getActivityList } from '@/api/activity'
import Footer from '@/components/footer'
import ActiveItem from './item'
export default {
    components: { Footer, ActiveItem },
    data() {
        return {
            navList: [
                { name: '首页', url: BASELOGINURL+'/index.html' },
                { name: '活动安排', url: '/#' },
            ],
            sortList: [
                { name: '全部', value: '', isChecked: true },
                { name: '线上', value: 1, isChecked: false },
                { name: '线下', value: 2, isChecked: false },
            ],
            searchValue: '',
            activityList: [],
            searchConf: {
                currentPage: 1,
                pageSize: 8,
            },
            total: 0,
        }
    },
    created() {
      this.fetchActivityList()
    },
    methods: {
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
          this.searchConf.category = item.value
          this.fetchActivityList()
        },
        searchActive() {
         this.searchConf.name = this.searchValue
         this.fetchActivityList()
        },
        async fetchActivityList() {
            this.searchConf.currentPage = 1
            this.searchConf.pageSize = 8
            let rsp = await getActivityList(this.searchConf)
            if(rsp && rsp.code === 0) {
                this.activityList = rsp.data.data.items
                this.total = rsp.data.data.totalNum
            }
        },
      async changCurrent(value) {
           this.searchConf.currentPage = value
            let rsp = await getActivityList(this.searchConf)
            if(rsp && rsp.code === 0) {
                this.activityList = rsp.data.data.items
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
      min-height: calc(100vh - 350px);
       .nothing {
        text-align: center;
        margin-top: 20px;
        .tips {
            color: #666;
            margin: 15px 0;
        }
    }
    .select {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
     .search {
         display: flex;
         align-items: center;
         .send {
             margin-left: 50px;
         }
     }
   }
 }
}
</style>