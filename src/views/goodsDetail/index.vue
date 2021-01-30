<template>
  <common-layout :navList="navList" :showNav="true" :showSearch="false">
    <div slot="content">
      <div class="box">
        <div class="content">
          <el-card class="detail">
            <div class="goodsDetail">
              <div class="img">
                <el-image :src="goodsDetail.image | imgFormat" class="mainImg" @click="toSeeMainImg">
                  <div slot="error" class="errorImg">
                    <img class="mainImg" :src="require('@/assets/nothing.png')" />
                  </div>
                </el-image>
                <div class="images" v-if="goodsDetail.images.length > 0">
                  <el-image
                    v-for="item in goodsDetail.images"
                    :key="item.id"
                    :src="item.url | imgFormat"
                    class="imgBanner"
                    :preview-src-list="previewImgList"
                  >
                    <div slot="error" class="errorImg">
                      <img class="imgBanner" :src="require('@/assets/nothing.png')" />
                    </div>
                  </el-image>
                </div>
              </div>
              <div class="info">
                <div class="name">{{goodsDetail.name}}</div>
                <div class="price">
                  <span class="priceLabel">价格</span>
                  {{goodsDetail.price | priceFormat}}
                </div>
                <div class="intro">
                  <div class="label">服务简介&nbsp;:</div>
                   <el-tooltip v-if="goodsDetail.advword" class="item" :content="goodsDetail.advword" placement="top-start">
                         <div class="value">{{goodsDetail.advword}} </div>
                    </el-tooltip>
                    <div class="value" style="color: #999" v-else>暂未填写</div>
                </div>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <div class="cell">
                      <div class="label">联&nbsp; 系 人&nbsp;:</div>
                      <div class="value">{{goodsDetail.contact}}</div>
                    </div>
                  </el-col>
                   <el-col :span="10">
                    <div class="cell">
                      <div class="label">服务时间&nbsp;:</div>
                      <div class="value">{{goodsDetail.workingtime}}</div>
                    </div>
                  </el-col>
                  <!-- <el-col :span="10">
                    <div class="cell">
                      <div class="label">联系手机&nbsp;:</div>
                      <div class="value">{{goodsDetail.phone}}</div>
                    </div>
                  </el-col> -->
                </el-row>
                 <!-- <el-row :gutter="20">
                 <el-col :span="10">
                    <div class="cell">
                      <div class="label">服务时间&nbsp;:</div>
                      <div class="value">{{goodsDetail.workingtime}}</div>
                    </div>
                  </el-col> 
                   <el-col :span="10">
                    <div class="cell">
                      <div class="label">联系电话&nbsp;:</div>
                      <el-tooltip v-if="goodsDetail.tel" class="item" :content="goodsDetail.tel" placement="top-start">
                         <div class="value">{{goodsDetail.tel}} </div>
                      </el-tooltip>
                      <div class="value" style="color: #999" v-else>暂未填写</div>
                    </div>
                  </el-col>
                </el-row> -->
                <div class="cell">
                  <div class="label">电子邮箱&nbsp;:</div>
                  <div class="value" v-if="goodsDetail.email">{{goodsDetail.email}}</div>
                  <div class="value" style="color: #999" v-else>暂未填写</div>
                </div>
                <div class="btns">
                  <el-button type="primary" icon="el-icon-shopping-cart-2" @click="toAddCart">加入购物车</el-button>
                  <el-button style="margin:0 20px;" @click="toApply">立即申请</el-button>
                </div>
              </div>
              <div class="storeDetail">
                <div class="logo">
                  <el-image :src="goodsDetail.mallstore.logo | imgFormat" class="avatar">
                    <div slot="error" class="errorImg">
                      <img class="avatar" :src="require('@/assets/nothing.png')" />
                    </div>
                  </el-image>
                </div>
                <div class="name">{{goodsDetail.mallstore.name}}</div>
                <div class="star">
                  <div class="label">信誉</div>
                  <el-rate v-model="goodsDetail.mallstore.credit" disabled text-color="#ff9900"></el-rate>
                </div>
                <div class="address">通讯地址:&nbsp;{{goodsDetail.mallstore.companyaddress}}</div>
                <el-popover
                  placement="top-start"
                  title="店铺简介"
                  width="360"
                  trigger="hover"
                  :content="goodsDetail.mallstore.introduce"
                >
                  <p>{{goodsDetail.mallstore.introduce}}</p>
                  <div class="introduce" slot="reference">{{goodsDetail.mallstore.introduce}}</div>
                </el-popover>
                <div class="go">
                  <el-button type="primary" plain @click="toStore" v-if="goodsDetail.mallstore.state === 1">进入店铺</el-button>
                  <el-button type="primary" disabled plain v-if="goodsDetail.mallstore.state === 0">店铺已关闭</el-button>
                  <el-button type="primary" disabled plain v-if="goodsDetail.mallstore.state === 2">店铺申请中</el-button>
                  <el-button type="primary" disabled plain v-if="goodsDetail.mallstore.state === 3">店铺审核不通过</el-button>
                </div>
              </div>
            </div>
          </el-card>

          <!-- 服务推荐 服务详情  -->
          <div class="bottom">
            <div class="recommend">
              <div class="title">资源推荐</div>
              <goods-item :goodsList="goodsList"></goods-item>
            </div>
            <div class="serviceDetail">
              <div class="top">
                <div class="title">资源详情</div>
                <div class="titleRight"></div>
              </div>
              <div class="detailContent" v-html="goodsDetail.description"></div>
            </div>
          </div>

        <!-- 预览主图 -->
         <el-dialog title="" :visible.sync="showBigImg" modal  style="text-align: center;">
           <el-image :src="goodsDetail.image | imgFormat"></el-image>
         </el-dialog>

        </div>
        <!-- 底部 -->
        <Footer></Footer>
      </div>
    </div>
  </common-layout>
</template>

<script>
import { BASEURL, BASELOGINURL, MARKETURL } from "@/utils/config";
import { getGoodsDetail, getGoodsList, addCart, toOrderGoods } from "@/api/market";
import { imgFormat, getArrayProps } from '@/utils/utils'
import GoodsItem from "./item";
import Footer from "@/components/footer";
export default {
  components: { GoodsItem, Footer },
  data() {
    return {
      navList: [
        { name: "资源超市", url: '' },
        { name: "服务详情", url: "" }
      ],
      goodsId: null,
      goodsDetail: null,
      searchConf: {
        currentPage: 1,
        pageSize: 10,
        verify: 1
      },
      goodsList: [],
      showDialog: false,
      previewImgList: [],
      showBigImg: false,
    };
  },
  created() {
    this.goodsId = this.$route.params.id;
    if (this.goodsId) {
      this.fetchGoodsDetail();
    }
    this.fetchRecommendList();
  },
  methods: {
    toSeeMainImg() {
      this.showBigImg = true
    },
    async fetchGoodsDetail() {
      let rsp = await getGoodsDetail(this.goodsId);
      if (rsp && rsp.code === 0) {
        this.goodsDetail = rsp.data.data;
        let arr = getArrayProps(this.goodsDetail.images, 'url');
        let imgArr = []
        arr.forEach(item => {
          if(item.startsWith('http')) {
            imgArr.push(item) 
          }else {
            imgArr.push(BASEURL + item)
          }
        })
        this.previewImgList = imgArr
      }
    },
    async fetchRecommendList() {
      let rsp = await getGoodsList(this.searchConf);
      if (rsp && rsp.code === 0) {
        this.goodsList = rsp.data.data.items;
      }
    },
    async toAddCart() {
      let data = {
        goodsId: this.goodsId,
        goodsNum: 1
      };
      let rsp = await addCart(data);
      if (rsp && rsp.code === 0) {
        this.$confirm("成功加入购物车!", "提示", {
          confirmButtonText: "前往购物车",
          cancelButtonText: "继续逛逛",
          type: "success",
          center: true
        })
          .then(() => {
            this.$router.push("/cart");
          })
          .catch(() => {
            this.$router.push("/");
          });
      }
    },
    async toApply() {
      let data = {
        goodsId: this.goodsId,
        goodsNum: 1
      };
      let rsp = await toOrderGoods(data);
      if (rsp && rsp.code === 0) {
       this.$confirm("申请成功！", "提示", {
          confirmButtonText: "查看订单",
          cancelButtonText: "继续逛逛",
          type: "success",
          center: true
        })
        .then(() => {
         location.href = MARKETURL
        })
        .catch(() => {
          this.$router.push("/")
        })
      }
    },
    toStore() {
       this.$router.push({path: `/storeDetail/${this.goodsDetail.storeid}`})
    }
  },
  watch: {
    $route: {
      handler(route) {
        if (route.name === "goodsDetail") {
          location.reload();
        }
      },
      deep: true
    }
  }
}
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  .content {
    width: 1100px;
    margin: 0 auto;
    min-height: calc(100vh - 395px);
    .detail {
      box-sizing: border-box;
      width: 100%;
      margin: 20px 0;
      padding: 10px;
      .goodsDetail {
        display: flex;
        justify-content: space-between;
        .img {
          .mainImg {
            width: 286px;
            height: 264px;
            cursor: pointer;
          }
          .images {
            display: flex;
            align-content: center;
            flex-wrap: wrap;
            .imgBanner {
              width: 66px;
              height: 48px;
              margin: 10px 10px 0 0;
              cursor: pointer;
            }
          }
        }
        .info {
          flex: 1;
          margin-left: 20px;
          .name {
            font-weight: 700;
            font-size: 20px;
          }
          .price {
            margin: 15px 0;
            width: 80%;
            padding: 10px;
            background-color: #e2e8f0;
            color: #409eff;
            font-size: 18px;
            font-weight: 700;
            border-radius: 5px;
            .priceLabel {
              font-size: 15px;
              color: #666;
              font-weight: 500;
              margin-right: 20px;
            }
          }
          .intro {
            display: flex;
            align-content: center;
            font-size: 15px;
            .label {
              width: 80px;
              color: #999;
            }
            .value {
              flex: 1;
              color: #666;
              display: -webkit-box;
              overflow: hidden;
              white-space: normal;
              text-overflow: ellipsis;
              word-wrap: break-word;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
          .cell {
            display: flex;
            align-content: center;
            font-size: 15px;
            margin-top: 10px;
            .label {
              width: 80px;
              color: #999;
            }
            .value {
              flex: 1;
              color: #666;
              display: -webkit-box;
              overflow: hidden;
              white-space: normal;
              text-overflow: ellipsis;
              word-wrap: break-word;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical; 
            }
          }
          .btns {
            display: flex;
            flex-direction: row-reverse;
            margin: 60px 80px 30px 30px;
          }
        }
        .storeDetail {
          width: 240px;
          border: 1px solid #e2e8f0;
          text-align: center;
          padding: 10px;
          font-size: 15px;
          color: #666;
          .logo {
            .avatar {
              width: 100px;
              height: 100px;
            }
          }
          .name {
            margin: 10px 0;
          }
          .star {
            margin: 10px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            .label {
              margin-right: 10px;
              padding-top: 3px;
            }
          }
          .intro {
            width: 300px !important;
          }
          .introduce {
            margin: 10px 0;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .go {
            padding-top: 10px;
          }
        }
      }
    }
    .bottom {
      display: flex;
      margin-bottom: 50px;
      box-shadow: 0 2px 12px 0 #0000001a;
      border: 1px solid #ebeef5;
      .recommend {
        width: 256px;
        border-right: 1px solid #cfcfcf;
        .title {
          border-top-left-radius: 8px;
          background-color: #4299e1;
          color: #fff;
          padding: 10px 20px;
        }
      }
      .serviceDetail {
        flex: 1;
        .top {
          display: flex;
          .title {
            padding: 10px 20px;
            color: #4299e1;
            border-top: 2px solid #4299e1;
          }
          .titleRight {
            flex: 1;
            background-color: #f5f5f5;
          }
        }
        .detailContent {
            padding: 10px;
            img {
               width: 100% !important;
            }
        }
      }
    }
  }
}
</style>