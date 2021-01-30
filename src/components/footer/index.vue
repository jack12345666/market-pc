<template>
  <div class="footerBox">
      <div class="footer-box">
          <div class="footer-left">
              <div>
              <div class="call-we">联系我们</div>
              <div class="phone">
                   <el-image
                    style="width: 14.86px;height: 16px;margin-right: 5px;"
                    :src="phoneImg"
                    ></el-image>
                  联系电话: 0517-82987316</div>
              <div class="address">
                   <el-image
                    style="width: 14.86px;height: 16px;margin-right: 5px;"
                    :src="addressImg"
                    ></el-image>
                  杭州钱塘新区行政服务中心（江东大道3899号）</div>
          </div>
          </div>
          <div class="footer-right">
              <div>
              <div class="show">网站公示</div>
              <div class="beian"><a href="http://beian.miit.gov.cn/">浙ICP备20002178号-1</a></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneImg: require('@/assets/phone.png'),
      addressImg: require('@/assets/address.png')
    };
  }
};
</script>

<style lang='scss' scoped>
.footerBox {
    width: 100%;
    background-color:#383d61;
    height: 132px;
    // position: absolute;
    // bottom: 0;
    .footer-box {
        margin: 0 auto;
        // width: 1170px;
        height: 132px;
        display: flex;
        justify-content: center;
        align-content: center;
        .footer-left {
            padding-top: 10px;
            width: 555px;
            display: flex;
            flex-direction: column;
            align-items: center;
           .call-we {
               color: #fff;
               font-size: 17px;
               font-weight: 700;
               line-height: 44px;
           }
           .phone {
               color: #fff;
               font-size: 15px;
               line-height: 30px;
           }
           .address {
               color: #fff;
               font-size: 15px;
               line-height: 30px;
           }
        }
        .footer-right {
            padding-top: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
             width: 555px;
            .show {
               color: #fff;
               font-size: 17px;
               font-weight: 700;
               line-height: 44px;
            }
            .beian {
               color: #fff;
               font-size: 15px;
               line-height: 25px;
               a {
                   color:#fff;
               }
            }
        }
    }
}
</style>
