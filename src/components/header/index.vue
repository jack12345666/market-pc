<template>
    <div class="box">
        <div class="header-box">
        <div class="header">
         <a :href="homeUrl">
            <el-image
             style="width: 400px;height: 100%"
            :src="imageUrl"
          ></el-image>
          </a>
         </div>
         <div class="headerRight">
           <div class="search" v-if="showSearch">
             <el-input placeholder="请输入搜索内容" v-model="searchKey" clearable>
              <el-select :disabled="selectDisabled" v-model="searchSelect" slot="prepend" placeholder="请选择" style="width: 90px">
               <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                 </el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
            </el-input>
           </div>
           <div class="btns">
             <el-button  icon="el-icon-shopping-cart-2" v-if="isShowCart" @click="toCart">购物车</el-button>
             <el-button type="primary"><a :href="personCenter">个人中心</a></el-button>
           </div>
         </div>
         </div>
         <div class="navMenu">
          <div class="menuList">
            <div class="menuItem"><a :href="menuObj.index">首页</a></div>
             <div class="menuItem subItem">
              <span>投资钱塘</span>
              <ul class="subUl">
                <li><a :href="menuObj.investment1">推介用地</a></li>
                <li><a :href="menuObj.investment2">区域优势</a></li>
                <li><a :href="menuObj.investment3">主导产业</a></li>
                <li><a :href="menuObj.investment">空间厂房</a></li>
                <li><a :href="menuObj.investment4">平台载体</a></li>
                <li><a :href="menuObj.investment5">生活钱塘</a></li>
              </ul>
            </div>
            <div class="menuItem"><a :href="menuObj.innovate">创新钱塘</a></div>
            <div class="menuItem"><a :href="menuObj.check">办事审批</a></div>
            <div class="menuItem subItem">
              <span>政策服务</span>
              <ul class="subUl">
                <li><a :href="menuObj.policy">政策原文</a></li>
                <li><a :href="menuObj.read">政策解读</a></li>
                <li><a :href="menuObj.pay">政策兑付</a></li>
              </ul>
            </div>
            <div class="menuItem"><a :href="menuObj.project">项目申报</a></div>
            <div class="menuItem subItem">
              <span>资源超市</span>
              <ul class="subUl">
                <li class="liText">
                  <span>涉审中介服务</span>
                  <div class="thirdItem">
                    <a :href="menuObj.out" target="_blank">杭州市投资项目审批中介网</a>
                  </div>
                </li>
                <li><a :href="menuObj.other">其他涉企服务</a></li>
                <li><a :href="menuObj.qiantang">钱塘智造</a></li>
              </ul></div>
            <div class="menuItem"><a :href="menuObj.appeal">诉求办理</a></div>

          </div>

         </div>
         <div class="nav-box" v-if="showNav">
         <div class="nav">
            <el-image
             style="width: 14.86px;height: 16px;margin-right: 5px;"
             :src="homeImg"
            ></el-image>
           <div class="title">你所在位置&nbsp;:&nbsp;</div>
           <div class="before-nav">
             <a :href="navList[0].url" v-if="isNavUrl">{{navList[0].name}}</a>
             <span class="indexHome" @click="toRoute(navList[0].url)" v-else>{{navList[0].name}}</span>
            </div>
           <div class="now">{{navList[1].name}}</div>
         </div>
        </div>
    </div>
</template>
<script>
import { BASELOGINURL, MENUURL } from '@/utils/config';
export default {
  props: {
    navList: {
      type: Array,
      default: function () {
        return [];
      }
    },
    showNav: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    selectDisabled: {
      type: Boolean,
      default: false
    },
    isNavUrl: {
      type: Boolean,
      default: false
    },
    isShowCart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imageUrl: '',
      homeUrl: '',
      homeImg: require('@/assets/home.png'),
      menuObj: {},
      searchSelect: '1',
      searchKey: '',
      personCenter: '',
      options: [
        { value: '1', label: '找资源' },
        { value: '2', label: '找店铺' }
      ]
    };
  },
  created() {
    this.imageUrl = BASELOGINURL + '/assets/images/logo.jpg';
    this.homeUrl = BASELOGINURL + '/index.html';
    this.personCenter = BASELOGINURL + '/user/mcenter.html';
    this.menuObj = {
      index: BASELOGINURL + '/index.html',
      invest: BASELOGINURL + '/invest-service.html',
      innovate: BASELOGINURL + '/innovate-qiantang.html',
      check: BASELOGINURL + '/check.html',
      policy: BASELOGINURL + '/policy-service.html',
      investment1: BASELOGINURL + '/invest-service-1.html',
      investment2: BASELOGINURL + '/invest-service-2.html',
      investment3: BASELOGINURL + '/invest-service-3.html',
      investment: BASELOGINURL + '/investment/index.html',
      investment4: BASELOGINURL + '/invest-service-4.html',
      investment5: BASELOGINURL + '/invest-service-5.html',
      read: BASELOGINURL + '/news-list.html?type=18&bread=政策解读',
      pay: BASELOGINURL + '/policypayment-service.html',
      project: BASELOGINURL + '/project-service.html',
      out: 'http://www.sszjfw.org.cn/was/ais/portal/hz/index.jsp',
      other: MENUURL + '/index.html#/?id=210',
      qiantang: MENUURL + '/index.html#/?id=211',
      appeal: BASELOGINURL + '/appeal-transact.html'
    };
  },
  methods: {
    toCart() {
      this.$router.push('/cart');
    },
    toSearch() {
      this.$emit('serachSomething', this.searchSelect, this.searchKey);
    },
    toRoute(url) {
      this.$router.push(`/${url}`);
    }
  }
};
</script>
<style lang='scss' scoped>
a {
  text-decoration: none;
  color: #fff;
}
.box {
    width: 100%;
    .header-box {
       margin: 0 auto;
       width: 1170px;
       border-bottom: 1px solid #e9e9e9;
       display: flex;
       align-items: center;
       justify-content: space-between;
    .header {
        padding: 10px 0;
        a {
            text-decoration: none;
            color: #000;
        }
    }
    .headerRight {
      display: flex;
      align-items: center;
      .search {
        margin-right: 30px;
      }
    }
  }
    .nav-box {
        width: 100%;
        background-color: #fafafa;
       .nav {
        display: flex;
        height: 54px;
        align-items: center;
        width: 1100px;
        margin: 0 auto;
        .indexHome {
          color: #999;
          &:hover {
            cursor: pointer;

          }
        }
        .before-nav {
            margin: 0 5px;
            font-size: 16px;
            a {
                text-decoration: none;
                color: #999999;
            }
        }
        .now {
            color:#999999;
            font-size: 16px;
        }
        .now:before {
            content: "\00bb\00a0";
            padding: 0 8px;
            color: #ccc;
        }
     }
    }
    .navMenu {
      ul, li{
        list-style: none;
        padding:0;
        margin:0;
      }
      width:100%;
      margin: 0 auto;
      background-color: #1e9fff;
      color: #fff;
      height: 56px;
      line-height: 56px;
      .menuList {
        display: flex;
        justify-content: center;
        align-items: center;
        .menuItem {
          width: 160px;
          text-align: center;
          &:hover {
            background-color: #117ecf;
          }
        }
        .subItem {
          position: relative;
          .subUl {
            z-index: 10000;
            box-shadow: 0 3px 3px 3px #f5f5f5;
            width: 160px;
            position: absolute;
            text-align: center;
            top: 56px;
            left: 0;
            display: none;
            background-color: #fff;
            a {
              color: #000;
              &:hover {
                color: #1e9fff;
              }
            }
            li {
              border-bottom: 1px solid #eeebeb;
              &:last-child {
                border-bottom: none;
              }
            }

            .liText {
              color: #000;
              position: relative;
              &:hover {
                color: #1e9fff;
              }
              &:hover  .thirdItem{
                display: block;
              }
              .thirdItem {
                 z-index: 10000;
                background-color: #fff;
                display: none;
                position: absolute;
                left: 160px;
                top: 0;
                width: 200px;
                padding: 0 5px;
                box-shadow: 0 3px 3px 3px #f5f5f5;
              }
            }
          }
          &:hover .subUl{
            display: block;
          }
        }
      }
      // .menu {
      // display: flex;
      // justify-content: center;
      //  .el-menu-item {
      //      margin: 0 2.5%;
      //   }
      // }
    }
}
</style>
