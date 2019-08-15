<template>
  <div class="page">
    <div class="banner">
      <div class="header-img">
        <img src="../assets/image/profile.png" alt="">
      </div>
      <div class="info">
        <span>下午好，杨洋</span>
        <span>2018.08.15 星期三</span>
      </div>
    </div>
    <div class="data">
      <div>
        <span>待审核总报告</span>
        <p><strong>20 </strong> &nbsp;&nbsp;个</p>
      </div>
      <div style="margin: 0 40px;background-color:#2453A7">
        <span>待审核总报告</span>
        <p><strong>20 </strong> &nbsp;&nbsp;个</p>
      </div>
      <div style="background-color:#003366">
        <span>待审核总报告</span>
        <p><strong>20 </strong> &nbsp;&nbsp;个</p>
      </div>
    </div>
    <div class="informations">
      <div class="behalfThings">
        <div class="title">
          <img src="../assets/image/profile.png" alt="">
          <strong>代办事宜</strong>
        </div>
        <ul class="detail">
          <li>
            <a href="">北京市属医院患者满意度报告管理系统--项目管理员使用手册下载</a>
          </li>
          <li>
            <a href="">北京市属医院患者满意度报告管理系统--项目管理员使用手册下载</a>
          </li>
          <li>
            <a href="">北京市属医院患者满意度报告管理系统--项目管理员使用手册下载</a>
          </li>
          <li>
            <a href="">北京市属医院患者满意度报告管理系统--项目管理员使用手册下载</a>
          </li>
          <li>
            <a href="">北京市属医院患者满意度报告管理系统--项目管理员使用手册下载</a>
          </li>
        </ul>
      </div>
      <div class="useDirection">
        <div class="title">
          <img src="../assets/image/profile.png" alt="">
          <strong>使用指导</strong>
        </div>
        <ul class="detail">
          <li>
            <a href="">北京市属医院患者满意度报告管理系统--项目管理员使用手册下载</a>
          </li>
          <li>
            <a href="">北京市属医院患者满意度报告管理系统--项目管理员使用手册下载</a>
          </li>
          <li>
            <a href="">北京市属医院患者满意度报告管理系统--项目管理员使用手册下载</a>
          </li>
          <li>
            <a href="">北京市属医院患者满意度报告管理系统--项目管理员使用手册下载</a>
          </li>
          <li>
            <a href="">北京市属医院患者满意度报告管理系统--项目管理员使用手册下载</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <img height="75%" style="margin-left:1%;margin-right:0.5%" src="../assets/image/footer_icon.png" alt="">
      <span>南京嘉量信息科技有限公司</span>
    </div>
  </div>
</template>

<script>
import BgTitle from '$base-c/BgTitle';

export default {
  name: 'Index',
  components: {
    BgTitle,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.page{
  font-size: 12px;
  position: absolute;
  width: 100%;
  height: 100%;
  .banner{
    display: flex;
    align-items: center;
    height: 18%;
    background-image: url('../assets/image/banner.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .header-img{
      margin-left: 3%;
      margin-right: 1.5%;
    }
    .info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      span{
        padding: 5px 0;
      }
      span:nth-of-type(1){
        font-size: 18px;
        font-weight: bolder;
      }
    }
  }
  .data{
    display: flex;
    padding: 3%;
    height: 22%;
    color: white;
    div{
      flex: 1;
      background-color: #4576CE;
      padding-left: 2%;
      min-height: 130px;
      span:nth-of-type(1){
        display: block;
        font-size: 20px;
        margin-top: 4%;
      }
      p{
        margin-top: 10%;
        font-size: 20px;
        strong{
          font-size: 3rem;
        }
      }
    }
  }
  .informations{
    display: flex;
    margin: 0 3%;
    height: 45%;
    .behalfThings, .useDirection{
      flex: 1;
      background-color: white;
      margin-bottom: 45px;
      display: flex;
      flex-direction: column;
      .title{
        display: flex;
        align-items: center;
        border:1px solid #eee;
        font-size: 16px;
        img{
          width: 4%;
          margin: 8px;
          margin-left: 20px;
        }
      }
      .detail{
        list-style: none;
        padding-left: 7%;
        li{
          padding: 2% 0;
          a{
            text-decoration: none;
            color:black;
            font-size: 14px;
          }
        }
    }
    }
    .behalfThings{
      margin-right:5%;
    }

  }
  .footer{
    display: flex;
    align-items: center;
    height: 4%;
    background-color: #EBEBEB;
  }
}

</style>
