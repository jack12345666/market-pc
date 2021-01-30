<template>
  <div class="activeList">
      <div class="item" v-for="(item, index) in activityList" :key="index" @click="toActiveDetail(item, index)">
          <div class="img">
            <el-image style="width: 100%;overFlow: hidden;height: 150px;" :src="item.poster | imgFormat" lazy>
             <div slot="error" class="errorImg">
                   <img  style="width: 100%;overFlow: hidden;height: 150px;" :src="require('@/assets/nothing.png')"/>
                </div>
           </el-image>
          </div>
          <div class="info">
              <div class="name">{{item.name}}</div>
              <div class="time"><i class="el-icon-date" style="margin-right: 10px"></i>{{item.begindate | timeFormat}} - {{item.enddate | timeFormat}}</div>
              <div class="store">
                  <div class="storeName"><i class="el-icon-location-outline" style="padding-right: 5px"></i>{{item.sponsor}}</div>
                  <!-- <div class="btn">
                     <el-button type="primary" style="padding: 8px 15px;" round>报名参加</el-button> 
                  </div> -->
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    props: {
        activityList: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
        return {
            
        }
    },
    filters: {
    'timeFormat': function(value) {
        return moment(value).format('MM-DD HH:mm')
    }
    },
    methods: {
        toActiveDetail(item, index) {
            this.$store.commit('activity/changeActivityDetail', item)
            this.$router.push(`/activityDetail/${item.id}`)
        }
    }
}
</script>

<style lang='scss' scoped>
.activeList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .item {
        &:hover {
           box-shadow: 0 2px 12px 0 #0000002a;
        }
        box-sizing: border-box;
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
            height: 140px;
            padding: 10px;
           .name {
                margin: 10px 0;
                color: #000;
                font-size: 18px;
                font-weight: 700;
            }
            .time {
                margin: 10px 0;
                color: #666;
                flex: 1;
                font-size: 14px;
            }
            .store {
                margin: 10px 0;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .storeName {
                    flex: 1; 
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
                .btn {
                    flex-wrap: nowrap;
                    margin-left: 10px;
                }
 
            } 
        } 
    } 
}
</style>