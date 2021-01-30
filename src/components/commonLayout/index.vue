<template>
  <div class="container" >
        <div class="header">
            <Header :isShowCart="isShowCart" :navList="navList" :showNav="showNav" :isNavUrl="isNavUrl" :showSearch="showSearch" :selectDisabled="selectDisabled" @serachSomething="serachSomething(arguments)"/>
        </div>
        <div class="content">
            <slot name='content'></slot>
        </div>
        <!-- <div class="footer">
            <Footer/>
        </div> -->
  </div>
</template>

<script>
import Header from '../header'
import Footer from '../footer'
export default {
  components: { Header, Footer },
  props: {
      navList: {
        type: Array,
        default: function() {
            return []
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
  methods: {
     serachSomething(item) {
         this.$emit('serachSomething', item[0], item[1])
     } 
  }
}
</script>
<style lang='scss' scoped>
 .container{
        background: #ffffff;
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .content {
            flex: 1;
            overflow: auto;
            // margin-bottom: 132px;
        }
    }
</style>