<template>
  <common-layout :navList="navList" :showNav="true" :showSearch="false" :isShowCart="false">
    <div slot="content">
       <div class="box">
        <div class="content">
          <el-card class="detail">
              <div class="top">
              <el-image style="width: 500px;height: 280px" :src="activityDetail.poster | imgFormat">
              <div slot="error" class="errorImg">
                   <img style="width: 500px;height: 280px" :src="require('@/assets/nothing.png')"/>
               </div>
           </el-image>
           <div class="activeInfo">
               <div class="name"><el-tag size="small" color="#1e9fff"  effect="dark" style="margin-right: 10px;">{{activityDetail.categoryStr}}</el-tag>{{activityDetail.name}}</div>
               <div class="item">
                    <div class="label">活动时间:</div>
                    <div class="value">{{activityDetail.begindate | timeFormat}} 至 {{activityDetail.enddate | timeFormat}}</div>
                </div>
                <div class="item"><div class="label">主办方:</div>
                <div class="value">{{activityDetail.sponsor}}</div>
                </div>
                <div class="item">
                    <div class="label">活动说明:</div>
                    <div class="value">{{activityDetail.comment}}</div>
                    </div>
                <div class="item">
                    <div class="label">人数上限:</div>
                    <div class="value">{{activityDetail.amount === -1 ? '无上限' : activityDetail.amount}}</div>
                </div>
               <div class="btn">
                   <el-button type="primary" @click="toEnroll" :disabled="isEnroll">{{isEnroll ? '活动已过期' : "立即报名"}}</el-button>
               </div>
           </div>
           </div>
          </el-card>
          <el-card class="activityDetail">
                  <div class="title">{{activityDetail.name}}</div>
                  <div class="bottomInfo">
                      <div class="root">联系人：{{activityDetail.contact}}</div>
                      <div class="root">联系电话：{{activityDetail.tel}}</div>
                  </div>
              <div class="detailContent" v-html="activityDetail.content"></div>
          </el-card>
          </div>

          <!-- 报名弹框 -->
          <el-dialog :title="activityDetail.amount === -1 ? '报名信息填写' : `报名信息填写(当前报名人数: ${activityDetail.curJoinAmount}, 剩余名额: ${activityDetail.amount - activityDetail.curJoinAmount})`" :visible.sync="showDialog" @close="closeBox" style="width: 1300px" :close-on-click-modal="false" :destroy-on-close="true">
             <div class="title" style="font-size: 16px;margin-bottom: 10px;font-weight: bold">申请信息:</div>
              <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                  <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="姓名" prop="userName">
                          <el-input style="width: 100%" v-model="form.userName" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话" prop="userPhone">
                           <el-input style="width: 100%" v-model.number="form.userPhone"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="9">
                        <el-form-item label="所属公司" prop="userCompanyName">
                            <el-select :disabled="!isInputCompany" v-model="form.userCompanyName" placeholder="请选择所属公司" style="width: 100%">
                              <el-option
                                v-for="item in companyList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                              </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                 </el-row>
                <el-form-item label="备注" prop="userDesc">
                    <el-input type="textarea" v-model="form.userDesc"></el-input>
                </el-form-item>
                <div class="title" style="font-size: 16px;margin: 15px 0;font-weight: bold">参加人员信息：</div>
                <el-row :gutter="20">
                 <!-- <el-col :span="12">
                    <div class="formItem">
                        <div class="label">是否填写具体人员</div>
                        <el-radio-group v-model="isInputMember" @change="checkInput" :disabled="isInputDisabled">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </div>
                  </el-col> -->
                  <el-col :span="12">
                    <el-form-item label="报名人数" prop="enrollNum">
                        <el-input :disabled="isInputMember === 0 ? false : true" v-model="form.enrollNum" ></el-input>
                    </el-form-item>
                 </el-col>
                </el-row>
                <div v-if="isInputMember === 1">
                 <el-row :gutter="20" v-for="(item, index) in form.memberList" :key="index">
                    <el-col :span="6">
                        <el-form-item label="姓名" :prop="'memberList.' + index + '.userName'" :rules="{required: true, message: '请填写姓名', trigger: 'blur'}">
                          <el-input v-model="item.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="联系电话" :prop="'memberList.' + index + '.userPhone'"  :rules="rules.memberPhone">
                           <el-input v-model="item.userPhone" type="number" :maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="7">
                        <el-form-item label="其他信息" :prop="'memberList.' + index + '.userExtra'">
                           <el-input v-model="item.userExtra" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <div style="margin-top: 4px;">
                           <el-button type="danger" size="small" plain v-if="form.memberList.length > 1" @click.prevent="removeMember(item)">删除</el-button>
                           <el-button type="primary" size="small" v-if="index === form.memberList.length - 1" plain @click.prevent="addMember">新增</el-button>
                        </div>
                    </el-col>
                 </el-row>
                 </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="closeBox">取 消</el-button>
                    <el-button size="small" type="primary" @click="submitEnroll('form')">确 定</el-button>
                </div>
            </el-dialog>
       </div>
      <Footer></Footer>
    </div>
  </common-layout>
</template>

<script>
import { CENTERURL } from '@/utils/config';
import Footer from '@/components/footer';
import { getActivityDetail, enrollActivity, getMyInfo, getEnrollDetail, getEnrollMemberInfo, getMyCompanys } from '@/api/activity';
import moment from 'moment';
export default {
  components: { Footer },
  data() {
    const checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8|9][0-9]{9}$/;
      if (!value) {
        return callback(new Error('联系电话不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error('联系电话格式不正确'));
          }
        }
      }, 100);
    };
    return {
      navList: [
        { name: '活动安排', url: 'activity' },
        { name: '活动详情', url: '' }
      ],
      activeId: null,
      activityDetail: {},
      showDialog: false,
      form: {
        userName: '',
        userPhone: '',
        enrollNum: null,
        userDesc: '',
        userCompanyName: '杭州创我网络技术有限公司',
        memberList: [
          { userName: '', userPhone: '', userExtra: '' }
        ]
      },
      isInputCompany: true,
      companyList: [],
      isInputMember: 1,
      isEnroll: false,
      enrollId: null,
      enrollDetail: null,
      isInputDisabled: false,
      rules: {
        userName: [
          { required: true, trigger: 'blur' }
        ],
        userPhone: [
          { required: true, trigger: 'blur', validator: checkPhone }
        ],
        memberPhone: [
          { required: true, trigger: 'blur', validator: checkPhone }
        ],
        userCompanyName: [
          { required: true, trigger: 'blur', message: '请选择所属公司' }
        ]
      }
    };
  },
  filters: {
    'timeFormat': function (value) {
      return moment(value).format('YYYY-MM-DD HH:mm');
    }
  },
  created() {
    this.activeId = this.$route.params.id;
    this.fetchActivityDetail();
    this.fetchMyInfo();
    this.fetchMyCompanys();
  },
  methods: {
    async fetchActivityDetail() {
      let rsp = await getActivityDetail(this.activeId);
      if (rsp && rsp.code === 0) {
        this.activityDetail = rsp.data.data;
        if (Date.parse(this.activityDetail.begindate) > new Date().getTime()) {
          this.isEnroll = false;
        } else {
          this.isEnroll = true;
        }
      }
    },
    async fetchMyInfo() {
      let rsp = await getMyInfo();
      if (rsp) {
        this.form.userName = rsp.userInfo ? rsp.userInfo.name : '';
      }
    },
    async fetchMyCompanys() {
      let data = {
        type: 3,
        pageIndex: 1,
        pageSize: 100
      };
      let rsp = await getMyCompanys(data);
      if (rsp.code === '0') {
        if (rsp.datas.length === 0 || rsp.datas.length === 1) {
          this.isInputCompany = false;
        } else {
          this.isInputCompany = true;
          this.companyList = rsp.datas;
        }
      }
    },
    async fetchEnrollDetail() {
      let data = {
        currentPage: 1,
        pageSize: 1000,
        activityId: this.activeId
      };
      let rsp = await getEnrollDetail(data);
      if (rsp && rsp.code === 0) {
        if (rsp.data.data.items.length > 0) {
          this.isInputDisabled = true;
          this.enrollDetail = rsp.data.data.items[0];
          this.form.userCompanyName = this.enrollDetail.userCompanyName;
          this.enrollId = this.enrollDetail.id;
          this.fetchMember();
        } else {
          this.showDialog = true;
          this.isInputDisabled = false;
        }
      }
    },
    async fetchMember() {
      let rsp = await getEnrollMemberInfo(this.enrollId);
      if (rsp && rsp.code === 0) {
        this.isInputMember = rsp.data.data.details.length > 0 ? 1 : 0;
        let arr = [];
        if (rsp.data.data.details.length > 0) {
          this.form.memberList = [];
          rsp.data.data.details.forEach(item => {
            arr.push({
              userName: item.userName,
              userPhone: item.userPhone,
              userExtra: item.userExtra
            });
          });
          this.form = {
            memberList: arr,
            userName: this.enrollDetail.userName,
            userPhone: this.enrollDetail.userPhone,
            enrollNum: this.enrollDetail.enrollNum,
            userDesc: this.enrollDetail.userDesc,
            userCompanyName: this.enrollDetail.userCompanyName
          };
        } else {
          this.form = {
            memberList: [{ userName: '', userPhone: '', userExtra: '' }],
            userName: this.enrollDetail.userName,
            userPhone: this.enrollDetail.userPhone,
            enrollNum: this.enrollDetail.enrollNum,
            userDesc: this.enrollDetail.userDesc,
            userCompanyName: this.enrollDetail.userCompanyName
          };
        }
      }
      this.showDialog = true;
    },
    toEnroll() {
      this.fetchEnrollDetail();
    },
    submitEnroll(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.toSubmit();
        } else {
          return false;
        }
      });
    },
    async toSubmit() {
      let data = {
        orderId: this.enrollId || '',
        id: +this.activeId,
        userPhone: this.form.userPhone,
        userDesc: this.form.userDesc,
        userEmail: this.form.userEmail,
        userCompanyName: this.form.userCompanyName,
        details: this.isInputMember === 0 ? null : this.form.memberList,
        enrollNum: this.isInputMember === 0 ? +this.form.enrollNum : this.form.memberList.length
      };
      if (!Number.isInteger(data.enrollNum)) {
        this.$message.error('报名人数为数字值');
        return;
      }
      if (data.enrollNum <= 0) {
        this.$message.error('报名人数至少一人');
        return;
      }
      if (this.activityDetail.amount !== -1 && (this.activityDetail.amount - this.activityDetail.curJoinAmount) < data.enrollNum) {
        this.$message.error(`活动报名名额已超出上限`);
        return;
      }
      let rsp = await enrollActivity(data);
      if (rsp && rsp.code === 0) {
        this.showDialog = false;
        let tips = this.activityDetail.needAllow === 0 ? '报名成功！' : '报名成功！等待审核';
        this.$confirm(tips, '提示', {
          confirmButtonText: '查看报名信息',
          cancelButtonText: '继续看看',
          type: 'success',
          center: true
        })
          .then(() => {
            location.href = CENTERURL;
          })
          .catch(() => {
            this.$router.push('/activity');
          });
      }
    },
    checkInput(value) {
      if (value === 1) {
        this.form.enrollNum = null;
      }
    },
    closeBox() {
      this.showDialog = false;
      this.form = {
        userName: this.form.userName,
        userPhone: '',
        enrollNum: null,
        userDesc: '',
        memberList: [
          { userName: '', userPhone: '', userExtra: '' }
        ]
      };
    },
    removeMember(item) {
      let index = this.form.memberList.indexOf(item);
      if (index !== -1) {
        this.form.memberList.splice(index, 1);
      }
    },
    addMember() {
      if (this.activityDetail.amount !== -1 && (this.activityDetail.amount - this.activityDetail.curJoinAmount) <= this.form.memberList.length) {
        this.$message.error('活动报名名额已超出上限');
      } else {
        this.form.memberList.push({ userName: '', userPhone: '', userExtra: '' });
      }
    }
  },
  watch: {
    'form.enrollNum': function (val) {
      if (this.isInputMember === 0 && val <= 0 && this.showDialog === true) {
        this.$message.error('报名人数至少一人');
      }
      if (!Number.isInteger(+val)) {
        this.$message.error('报名人数为数字值');
      }
      if (this.activityDetail.amount !== -1 && (this.activityDetail.amount - this.activityDetail.curJoinAmount) < val) {
        this.$message.error('活动报名名额已超出上限');
      }
    }
  }
};
</script>
<style>
.el-dialog {
  width: 70%;
}
</style>
<style lang='scss' scoped>
.box {
  width: 100%;
  .content {
    width: 1100px;
    margin: 0 auto;
    min-height: calc(100vh - 350px);
    margin-bottom: 50px;
     .detail {
      box-sizing: border-box;
      width: 100%;
      margin: 20px 0;
      .top {
       display: flex;
      .activeInfo {
        flex: 1;
        color: #666;
        font-size: 15px;
        margin: 15px 0 0 15px;
        .name {
            font-size: 20px;
            color: #000;
            margin-bottom: 20px;
        }
        .item {
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                .label {
                    width: 80px;
                }
           }
        .btn {
            display: flex;
            flex-direction: row-reverse;
            margin-top: 30px;
        }
       }
      }
    }
    .activityDetail {
        .title {
            font-size: 20px;
        }
        .bottomInfo {
            display: flex;
            align-items: center;
            margin-top: 15px;
            border-bottom: 1px solid #ececec;
            padding-bottom: 10px;
            .root {
                color: #666;
                font-size: 15px;
                margin-right: 25px;
            }
            .time {
                color: #999;
                font-size: 15px;
                margin-left: 10px;
            }
        }
        .detailContent {
            padding: 10px;
            min-height: 360px;
            img {
               width: 100% !important;
            }
        }
    }
  }
  .formItem {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .label {
          width: 150px;
      }
  }
}
</style>
