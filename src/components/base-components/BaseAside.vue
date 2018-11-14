<template>
    <div class="BaseAside">
        <el-menu ref="menu" :default-active="active" class="el-menu-vertical-demo" background-color="#222B42" text-color="#fff" active-text-color="#ffd04b">
            <!-- <el-menu-item index="/commonFile" @click="linkTo('/commonFile')">
                <span slot="title">公共文件</span>
            </el-menu-item> -->

            <el-menu-item v-show="!changeBoolean(item.meta.disable)"  v-for="(item,Cindex) in getMenu[0].children" :key="Cindex" :index="`/${item.path}`" @click="linkTo(item.path)">
                <!-- <i class="el-icon-location"></i> -->
                <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
            <el-menu-item index="/setting" @click="linkTo('/setting')">
                <!-- <i class="el-icon-location"></i> -->
                <span slot="title">个人设置</span>
            </el-menu-item>

            <!-- <el-submenu :index="`${index}`" v-for="(item,index) in getMenu" :key="index+1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item.mainText}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-show="!changeBoolean(childItem.meta.disable)" @click="linkTo(childItem.path)" :index="`/${childItem.path}`"
                        v-for="(childItem,childIndex) in item.children" :key="childIndex">{{childItem.meta.title}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->
            <!-- <el-menu-item @click="linkTo('/personalInfo')" :index="String(getMenu.length+2)">
                <i class="el-icon-setting"></i>
                <span slot="title">个人设置</span>
            </el-menu-item> -->
        </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  name: 'BaseAside',
  computed: {
    ...mapGetters([
      'getMenu',
    ]),
  },
  data() {
    return {
      role: '',
      active: '/commonFile',
    };
  },
  mounted() {
    this.role = this.$store.getters.getRole;
    this.$nextTick(() => {
      this.active = this.$route.path;
    });
  },
  watch: {

    $route(routeMeta) {
      this.$nextTick(() => {
        if (routeMeta.path === '/fileList') {
          this.active = '/fileList';
          this.$forceUpdate();
        }
      });
    },
  },

  methods: {
    changeBoolean(str) {
      return str === 'true';
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    linkTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
    .BaseAside{
        height: calc(100% - 140px);
        .el-menu{
            height: 100%;
        }
    }
</style>

