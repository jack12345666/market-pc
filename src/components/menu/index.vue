<template>
  <div class="menu">
      <div class="menuNav">
      <div class="item">
          <div class="label">服务分类&nbsp;:</div>
          <div class="value">
                <el-tag :class="item.isChecked ? 'tag' : 'unTag'" v-for="(item, index) in serviceFirst" :key="item.id" @click="checkFirst(item, index)">{{item.name}}</el-tag>
          </div>
      </div>
       <div class="item" v-if="searchConf['categorys[0].commoncategoryids'] && showSecond">
          <div class="label"></div>
           <div class="value">
                <el-tag :class="item.isChecked ? 'tag' : 'unTag'" v-for="(item, index) in serviceSecond" :key="item.id" @click="checkSecond(item, index)">{{item.name}}</el-tag>
          </div>
      </div>
        <div class="item">
          <div class="label">服务对象&nbsp;:</div>
          <div class="value">
                <el-tag :class="item.isChecked ? 'tag' : 'unTag'" v-for="(item, index) in serviceObj" :key="item.id" @click="checkObj(item, index)">{{item.name}}</el-tag>
          </div>
      </div>
       <div class="item">
          <div class="label">机构规模&nbsp;:</div>
          <div class="value">
                <el-tag :class="item.isChecked ? 'tag' : 'unTag'" v-for="(item, index) in orgSize" :key="item.id" @click="checkOrgSize(item, index)">{{item.name}}</el-tag>
          </div>
      </div>
      <div class="item">
          <div class="label">服务类型&nbsp;:</div>
           <div class="value">
                <el-tag :class="item.isChecked ? 'tag' : 'unTag'" v-for="(item, index) in serviceType" :key="item.id" @click="checkType(item, index)">{{item.name}}</el-tag>
          </div>
      </div>
      <div class="item">
          <div class="label">收费模式&nbsp;:</div>
          <div class="value">
                <el-tag :class="item.isChecked ? 'tag' : 'unTag'" v-for="(item, index) in moneyMode" :key="item.id" @click="checkMode(item, index)">{{item.name}}</el-tag>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryList, getGoodsList } from '@/api/market'
export default {
    props: {
        firstCategoryId: {
            type: Number,
            default: null,
        },
        firstCategoryName: {
            type: String,
            default: ''
        },
        checkCategoryId: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            serviceFirst: [],
            serviceSecond: [],
            serviceObj: [],
            orgSize: [],
            serviceType: [],
            moneyMode: [],
            serviceList: [],
            showSecond: true,
            searchConf: {},
        }
    },
    created() {
      this.fetchCategoryList()
    },
    methods: {
     async fetchCategoryList() {
         let rsp = await getCategoryList()
         if(rsp && rsp.code === 0) {
             if(rsp.data.data.length > 0) {
                this.serviceList = rsp.data.data.filter(item => item.category === '0151')
                this.serviceObj = rsp.data.data.filter(item => item.category === '0152')
                this.serviceObj.unshift({id: '', name: '全部', isChecked: true})
                this.orgSize = rsp.data.data.filter(item => item.category === '0153')
                this.orgSize.unshift({id: '', name: '全部', isChecked: true})
                this.serviceType = rsp.data.data.filter(item => item.category === '0154')
                this.serviceType.unshift({id: '', name: '全部', isChecked: true})
                this.moneyMode = rsp.data.data.filter(item => item.category === '0155')
                this.moneyMode.unshift({id: '', name: '全部', isChecked: true})
              
                 if(!this.firstCategoryId) {
                    this.serviceFirst = rsp.data.data.filter(item => item.category === '0151')
                    this.serviceFirst.unshift({id: '', name: '全部', isChecked: true}) 
                 }else {
                    this.searchConf['categorys[0].commoncategoryids'] = this.firstCategoryId
                    this.serviceSecond = [{id: '', name: '全部', isChecked: true}],
                    this.serviceFirst.push({id: this.firstCategoryId, name: this.firstCategoryName, isChecked: true}) 
                    let arr = this.serviceList.filter(i => i.id === this.firstCategoryId)
                    this.showSecond = arr[0].items.length > 0 ? true : false
                    this.serviceSecond = this.serviceSecond.concat(arr[0].items)  
                 } 
                 if(this.checkCategoryId) {
                  this.serviceFirst =  this.serviceList.map(item => {
                        if(item.id === this.checkCategoryId) {
                            item.isChecked = true
                        }
                        return item
                    })
                    this.searchConf['categorys[0].commoncategoryids'] = this.checkCategoryId
                    if(this.searchConf['categorys[0].commoncategoryids']) { 
                        this.serviceSecond = [{id: '', name: '全部', isChecked: true}]
                        let arr = this.serviceList.filter(i => i.id === this.checkCategoryId)
                        this.showSecond = arr[0].items.length > 0 ? true : false
                        this.serviceSecond = this.serviceSecond.concat(arr[0].items) 
                       
                    }else {
                        this.searchConf['categorys[1].commoncategoryids'] = ''
                    }
                  this.serviceFirst.unshift({id: '', name: '全部', isChecked: false})  
                }
             }
         }
     },
     checkFirst(item, index) {
          item.isChecked = true
          let arr = []
          this.serviceFirst.forEach(i => {
              arr.push({
                  id: i.id,
                  name: i.name,
                  isChecked: false,
              })
          })
          this.serviceFirst = arr
          this.serviceFirst[index] = item 
          this.serviceSecond = [{id: '', name: '全部', isChecked: true}]
          this.searchConf['categorys[0].commoncategoryids'] = item.id
          if(this.searchConf['categorys[0].commoncategoryids']) {
              let arr = this.serviceList.filter(i => i.id === item.id)
              this.showSecond = arr[0].items.length > 0 ? true : false
              this.serviceSecond = this.serviceSecond.concat(arr[0].items) 
              this.serviceSecond.map(function(item) {
                  item.isChecked = false
                  return item
              })
               this.searchConf['categorys[1].commoncategoryids'] = ''
               this.serviceSecond[0].isChecked = true
          }else {
               this.searchConf['categorys[1].commoncategoryids'] = ''
               this.serviceSecond[0].isChecked = true
          } 
        
          this.$emit('searchList', this.searchConf)
     },
     checkSecond(item, index) {
          item.isChecked = true
          let arr = []
          this.serviceSecond.forEach(i => {
              arr.push({
                  id: i.id,
                  name: i.name,
                  isChecked: false
              })
          })
          this.serviceSecond = arr
          this.serviceSecond[index] = item 
          this.searchConf['categorys[1].commoncategoryids'] = item.id
          this.$emit('searchList', this.searchConf)
     },
      checkObj(item, index) {
          item.isChecked = true
          let arr = []
          this.serviceObj.forEach(i => {
              arr.push({
                  id: i.id,
                  name: i.name,
                  isChecked: false
              })
          })
          this.serviceObj = arr
          this.serviceObj[index] = item 
          this.searchConf['categorys[2].commoncategoryids'] = item.id
          this.$emit('searchList', this.searchConf)
     },
      checkOrgSize(item, index) {
          item.isChecked = true
          let arr = []
          this.orgSize.forEach(i => {
              arr.push({
                  id: i.id,
                  name: i.name,
                  isChecked: false
              })
          })
          this.orgSize = arr
          this.orgSize[index] = item 
          this.searchConf['categorys[3].commoncategoryids'] = item.id
          this.$emit('searchList', this.searchConf)
     },
      checkType(item, index) {
          item.isChecked = true
          let arr = []
          this.serviceType.forEach(i => {
              arr.push({
                  id: i.id,
                  name: i.name,
                  isChecked: false
              })
          })
          this.serviceType = arr
          this.serviceType[index] = item 
          if(item.id) {
              if(item.name === '公共服务') {
                   this.searchConf.isGgfw = 1
                   this.searchConf.isZyfw = ''
              }else if(item.name === '专业服务') {
                   this.searchConf.isZyfw = 1
                   this.searchConf.isGgfw = ''
              }
          }else {
             this.searchConf.isGgfw = ''
             this.searchConf.isZyfw = ''
          }
          this.$emit('searchList', this.searchConf)
     },
      checkMode(item, index) {
          item.isChecked = true
          let arr = []
          this.moneyMode.forEach(i => {
              arr.push({
                  id: i.id,
                  name: i.name,
                  isChecked: false
              })
          })
          this.moneyMode = arr
          this.moneyMode[index] = item 
          this.searchConf['categorys[4].commoncategoryids'] = item.id
          this.$emit('searchList', this.searchConf)
     },
  }
}
</script>

<style lang='scss' scoped>
.menu {
    background-color: #fff !important; 
    width: 100%;
    .menuNav {
        width: 1100px;
        margin: 0 auto;
        padding: 5px 5px 1px 0;
    .item:last-child {
        border: none;
    }
    .item {
        display: flex;
        align-items: center;
        margin: 15px 0;
        padding: 0 0 10px 0;
        border-bottom: 1px solid #edf1f2;
        .label {
            color: #666;
            width: 100px;
        }
        .value {
            flex: 1;
            white-space: wrap;
            .tag {
                margin-right: 10px;
                cursor: pointer;
                font-size: 15px;
            }
            .unTag {
                margin-right: 10px;
                cursor: pointer;
                font-size: 15px; 
                border: none;
                background-color: #fff;
                color: #555;
            }
        }
      }
   }
}
</style>