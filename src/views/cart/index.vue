<template>
  <common-layout :navList="navList" :showSearch="false">
      <div slot="content">
      <div class="box">
        <div class="content">
            <el-table v-if="cartList.length > 0" ref="multipleTable" :data="cartList" tooltip-effect="dark"  style="width: 100%"
                    @selection-change="handleSelectionChange" :header-cell-style="{background:'#eef1f6'}">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="服务名称" show-overflow-tooltip>
                 <template slot-scope="scope">{{scope.row.goodsname}}</template>
                </el-table-column>
               <el-table-column label="价格" width="80">
                 <template slot-scope="scope">{{scope.row.goodsprice | priceFormat}}</template>
                </el-table-column>
                <el-table-column prop="storename" label="店铺名称" width="230" show-overflow-tooltip></el-table-column>
                <el-table-column prop="goodsnum" label="数量" width="70" ></el-table-column>
                 <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="toApply(scope.row)" plain size="small" >申请</el-button>
                        <el-button type="danger" plain size="small" @click="toRemove(scope.row)">移除</el-button>
                    </template>
                    </el-table-column>
            </el-table>
            <div class="btn" v-if="cartList.length > 0">
                <el-button type="primary" @click="toApplyAll"  size="small" >一键申请</el-button>
                <el-button type="danger" plain @click="toRemoveAll"  size="small" >清空购物车</el-button>
            </div>
            <div class="nothing"  v-if="cartList.length === 0">
                 <el-image :src="require('@/assets/empty.png')"></el-image>
                 <div class="tips">购物车空空如也~</div>
                  <el-button type="primary" plain @click="toIndex"  size="small" >去逛逛</el-button>
            </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  </common-layout>
</template>

<script>
import { BASEURL } from '@/utils/config'
import { cartList, removeCartGoods, removeAllCart, toAddOrder } from '@/api/market'
import { getArrayProps } from '@/utils/utils'
import { Message } from  'element-ui'
import Footer from '@/components/footer'
export default {
    components: { Footer },
    data() {
        return {
             navList: [
                { name: '资源超市', url: '' },
                { name: '购物车', url: '' },
            ],
            cartList: [],
            multipleSelection: []
        }   
    },
    created() {
        this.fetchCartList()
    },
    methods: {
        async fetchCartList() {
            let rsp = await cartList()
            if(rsp && rsp.code === 0) {
               this.cartList = rsp.data.data
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
       async toApply(val) {
          let rsp = await toAddOrder(val.id)
          if(rsp && rsp.code === 0) {
            //   Message.success('申请成功')
            //   this.fetchCartList()
             this.$confirm("申请成功！", "提示", {
                confirmButtonText: "查看订单",
                cancelButtonText: "留在购物车",
                type: "success",
                center: true
                })
                .then(() => {
                location.href = `${BASELOGINURL}/pcPersonCenter/#/personCenter`
                })
                .catch(() => {
                 this.fetchCartList()
                })
            }
        },
       async toRemove(val) {
           let rsp = await removeCartGoods({goodsId: val.goodsid})
           if(rsp && rsp.code === 0) {
               Message.success('移除成功') 
               this.fetchCartList()
           }
        },
        async toRemoveAll() {
            let rsp = await removeAllCart()
            if(rsp && rsp.code === 0) {
               Message.success('购物车清空成功') 
               this.fetchCartList()
            }
        },
       async toApplyAll() {
        if(this.multipleSelection.length === 0) {
            Message.error('请选择要申请的服务')
            return
        }
         let id = getArrayProps(this.multipleSelection, 'id').join(',')
         let rsp = await toAddOrder(id)
          if(rsp && rsp.code === 0) {
              Message.success('申请成功')
              this.fetchCartList()
          }
      },
      toIndex() {
          this.$router.push('/')
      }  
   }
}
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  .content {
    width: 1100px;
    margin: 20px auto;
    min-height: calc(100vh - 390px);
    .btn {
        text-align: center;
        margin-top: 50px;
    }
    .nothing {
        text-align: center;
        margin-top: 20px;
        .tips {
            color: #666;
            margin: 15px 0;
        }
    }
  }
}
</style>