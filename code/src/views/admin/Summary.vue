<template>
  <!-- 外层套一个summary为防止vue组件间的样式调整时的页面污染问题 -->
  <div class="summary">
    <!-- pic-logo -->
    <div class="management">
      <img src="../../assets/management.png" width="100%" height="100px" alt="">
    </div>
    <!-- 操作效果部分：1-一键切换/2-模糊查询 + 多条件查询/3-退出登录/4-刷新页面 -->
    <div class="realize">
    <!-- 一键切换 -->
      <el-switch
        v-model="switchValue"
        @change="changeSwitch"
        active-text="评价"
        inactive-text="分数"
        :disabled="disability">
      </el-switch>
        <!-- 查询框 -->
      <el-input placeholder="请输入内容" v-model="search.value" class="input-with-select">
        <el-select
          v-model="search.select"
          slot="prepend">
          <el-option
            v-for="item in search.option"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
      </el-input>
      <el-popover
        placement="top"
        v-model="logoutVisible">
        <p>确定退出？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="logoutVisible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="logout">确定</el-button>
        </div>
        <el-button class="logout" type="danger" size="small" slot="reference">退出</el-button>
      </el-popover>
      <el-button class="refresh" type="primary" size="small" @click="refresh" :loading="refreshLoading">刷新</el-button>
      <!-- @cell-mouse-enter="handleMouseEnter"
      @cell-mouse-leave="handleMouseOut" -->
    </div>
    <el-table
      :data="tableData.slice((staffCurrentPage-1)*staffPageSize,staffCurrentPage*staffPageSize)"
      v-loading="tableLoading"
      border
      style="height: 100%;margin-left: auto; margin-right: auto;text-align: center;"
      height="525"
      :default-sort = "{prop: 'date', order: 'descending'}"
      ref="mainTable">
      <el-table-column
        label="序号"
        prop="Number"
        header-align=center
        sortable>
      </el-table-column>
      <el-table-column
        prop="staffName"
        label="姓名"
        header-align=center
        width="90">
      </el-table-column>
      <el-table-column
        prop="scorePL"
        label="智多星(PL)"
        header-align=center>
        <template slot-scope="scope">
         <el-tag class="evalTag" :type="getType(scope.row.PL)" v-show="evalTagShow">
            {{getEval(scope.row.PL)}}
          </el-tag>
          <el-tag class="scoreTag" :type="getType(scope.row.PL)" v-show="scoreTagShow">
            {{scope.row.scorePL}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="外联者(RI)"
        header-align=center>
        <template slot-scope="scope">
          <el-tag class="evalTag" :type="getType(scope.row.RI)" v-show="evalTagShow">
            {{getEval(scope.row.RI)}}
          </el-tag>
          <el-tag class="scoreTag" :type="getType(scope.row.RI)" v-show="scoreTagShow">
            {{scope.row.scoreRI}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="协调者(CO)"
        header-align=center>
        <template slot-scope="scope">
          <el-tag class="evalTag" :type="getType(scope.row.CO)" v-show="evalTagShow">
            {{getEval(scope.row.CO)}}
          </el-tag>
          <el-tag class="scoreTag" :type="getType(scope.row.CO)" v-show="scoreTagShow">
            {{scope.row.scoreCO}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="鞭策者(SH)"
        header-align=center>
        <template slot-scope="scope">
          <el-tag class="evalTag" :type="getType(scope.row.SH)" v-show="evalTagShow">
            {{getEval(scope.row.SH)}}
          </el-tag>
          <el-tag class="scoreTag" :type="getType(scope.row.SH)" v-show="scoreTagShow">
            {{scope.row.scoreSH}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="监督者(ME)"
        header-align=center>
        <template slot-scope="scope">
          <el-tag class="evalTag" :type="getType(scope.row.ME)" v-show="evalTagShow">
            {{getEval(scope.row.ME)}}
          </el-tag>
          <el-tag class="scoreTag" :type="getType(scope.row.ME)" v-show="scoreTagShow">
            {{scope.row.scoreME}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="凝聚者(TW)"
        header-align=center>
        <template slot-scope="scope">
          <el-tag class="evalTag" :type="getType(scope.row.TW)" v-show="evalTagShow">
            {{getEval(scope.row.TW)}}
          </el-tag>
          <el-tag class="scoreTag" :type="getType(scope.row.TW)" v-show="scoreTagShow">
            {{scope.row.scoreTW}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="实干者(IM)"
        header-align=center>
        <template slot-scope="scope">
          <el-tag class="evalTag" :type="getType(scope.row.IM)" v-show="evalTagShow">
            {{getEval(scope.row.IM)}}
          </el-tag>
          <el-tag class="scoreTag" :type="getType(scope.row.IM)" v-show="scoreTagShow">
            {{scope.row.scoreIM}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="善始善终者(CF)"
        header-align=center>
        <template slot-scope="scope">
          <el-tag class="evalTag" :type="getType(scope.row.CF)" v-show="evalTagShow">
            {{getEval(scope.row.CF)}}
          </el-tag>
          <el-tag class="scoreTag" :type="getType(scope.row.CF)" v-show="scoreTagShow">
            {{scope.row.scoreCF}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="专家(SP)"
        header-align=center>
        <template slot-scope="scope">
          <el-tag class="evalTag" :type="getType(scope.row.SP)" v-show="evalTagShow">
            {{getEval(scope.row.SP)}}
          </el-tag>
          <el-tag class="scoreTag" :type="getType(scope.row.SP)" v-show="scoreTagShow">
            {{scope.row.scoreSP}}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 答题时间 -->
      <el-table-column
        label="答题时间"
        prop="createTime"
        header-align=center
        sortable>
        <template slot-scope="scope">
          <span class="nowrap">{{ $utils.goodTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <!-- 详情按钮 -->
      <el-table-column
        label="详情"
        header-align=center>
        <template slot-scope="scope">
          <el-button @click="getDetails(scope.row.Number)" width="40px">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 详情弹窗 -->
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="30%">
      <span>员工编号：{{staffData.staffNo}}</span><br>
      <span>手机号：{{staffData.mobile}}</span><br>
      <span>总评：</span>
      <el-tag v-for="tag in staffData.tags" v-bind:key="tag" style="width: 75px;text-align: center;">
        {{tag}}
      </el-tag><br>
      <span>问卷名：{{staffData.surveyName}}</span><br>
      <span>测试能力：{{staffData.surveyShow}}</span><br>
      <span>测试类型：{{staffData.surveyType}}</span><br>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="staffCurrentPage"
      :page-sizes="[7 , 16, 32, staffTotalCount]"
      :page-size="staffPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="staffTotalCount">
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Summary',
  data() {
    return {
      switchValue: true,
      disability: false, // 一键切换按钮
      tableData: [],
      tableLoading: true,
      staffPageSize: 7,
      staffCurrentPage: 1,
      staffTotalCount: 0,
      evalTagShow: true, // 标签显示状态
      scoreTagShow: false, // 分数显示状态
      refreshLoading: false,
      index: 1,
      dialogVisible: false,
      logoutVisible: false,
      staffData: [],
      // 查询条件
      search: {
        option: [
          {
            value: '1',
            label: '姓名',
          },
          {
            value: '2',
            label: '标签',
          },
        ],
        select: '1', // 默认为 '1'
        value: '',
      },
      // 源数据
      tempData: [],
      // 存放满足查询条件的数据
      result: [],
    };
  },
  computed: {
    ...mapState(['token']),
  },
  created() {
    this.getData();
    // console.log(this.token);
    const token = this.$utils.getCache('token');
    if (token) {
      this.setToken(token);
    }
  },
  methods: {
    refresh() {
      this.refreshLoading = true;
      this.getData();
      this.staffCurrentPage = 1;
    },
    getData() {
      this.tableLoading = true;
      this.$http.get('summary', {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
        .then((response) => {
          if (response) {
            console.log(response);
            this.pushData(response);
            this.tableLoading = false;
            this.refreshLoading = false;
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.message) {
            this.$message.error(error.response.data.message);
          } else {
            this.$message.error('服务器连接错误！');
            this.refreshLoading = false;
          }
        });
    },
    pushData(data) {
      this.tableData.splice(0, this.tableData.length);
      this.tableData = this.$utils.manageData(data);
      this.tempData = this.tableData;
      console.log(this.tableData);
      this.staffTotalCount = data.length;
    },
    handleSizeChange(val) { // 改变每页显示条数
      this.staffPageSize = val;
    },
    handleCurrentChange(val) { // 改变当前页码
      this.staffCurrentPage = val;
    },
    getEval(level) {
      if (level === 3) {
        return '优秀';
      }
      if (level === 2) {
        return '自然';
      }
      if (level === 1) {
        return '避免';
      }
      if (level === 0) {
        return '严重';
      }
      return '暂无';
    },
    getType(level) {
      if (level === 3) { // 优秀
        return 'primary';
      }
      if (level === 2) { // 自然
        return 'success';
      }
      if (level === 1) { // 次要
        return 'warning';
      }
      if (level === 0) { // 避免
        return 'danger';
      }
      return 'info';
    },
    changeSwitch(state) { // 一键切换
      this.disability = true; // 点击时由false == true ： 转换状态
      console.log(state);
      if (state === false) { // 注意 ： 在任何对比之时，都要使用 === 而不是 ==
        this.evalTagShow = false;
        setTimeout(() => { // 加上setTimeout方法，解决一键切换时默认样式卡顿问题
          this.scoreTagShow = true;
          if (this.scoreTagShow === true) {
            this.disability = false;
          }
        }, 390);
      } else {
        this.scoreTagShow = false;
        setTimeout(() => { // 加上setTimeout方法，解决一键切换时默认样式卡顿问题
          this.evalTagShow = true;
          if (this.evalTagShow === true) {
            this.disability = false;
          }
        }, 390);
      }
    },
    getDetails(index) {
      console.log(index);
      this.dialogVisible = true; // 显示弹框
      this.index = index - 1;
      this.staffData = this.tempData[this.index];
    },
    // 查询功能
    searchData() {
      this.staffCurrentPage = 1; // 当前页
      this.staffPageSize = 7; // 每页有多少数据 比如此处默认：1页/7条
      console.log(this.tempData); // 总数据
      console.log(this.search.value); // 查询条件：为一个数组
      this.result = []; // 存放满足查询条件的数据
      if (this.search.select === '1') {
        console.log(this.search.select); // 查看此时用什么类型在查询
        this.tempData.forEach((element, index) => {
          if (element.staffName.indexOf(this.search.value) >= 0) { // 将查询框内输入的名字与数据中的名字进行对比，有相同的字段则提取这条数据
            this.result.push(this.tempData[index]); // 将tempData中符合条件的数据依次存入result数组中
          }
        });
      } else if (this.search.select === '2') {
        console.log(this.search.select); // 如果查询条件改变：此时为标签查询
        this.tempData.forEach((element, index) => { // 一样的：首先遍历源数据
          element.tags.forEach((elem) => { // 由于一个人会有多条标签：则需要将标签遍历————拆成一个一个的单个标签
            if (elem.indexOf(this.search.value) >= 0) { // elem为单条标签：与输入框中所有的数据标签逐一进行比对
              this.result.push(this.tempData[index]); // 若满足条件，将符合条件的数据依次存入result数组中
            }
          });
        });
      } else { // 若没有查询条件：则不变
        this.result = this.tempData;
      }
      console.log(this.result); // 看一下在按照条件排列之后result中数据的呈现
      this.tableData = this.result; // 将排列后的数据放入到总数据tableData当中，使每一列的数据呈现都发生了改变
      this.staffTotalCount = this.tableData.length; // 分页栏最前方的总数据数：即,一共有多少条数据？
    },
    // 用户登出
    logout() {
      this.logoutVisible = false; // 是否登出： 给一个状态
      const token = '';
      // console.log(this.$store.state.token);
      this.setToken(token);
      this.$store.commit('setToken', token);
      // console.log(this.$store.state.token);
      if (!this.$store.state.token) {
        this.$router.push({
          name: 'login',
        });
        this.$message({
          message: '退出成功！',
          type: 'success',
          duration: 1500,
        });
      } else {
        this.$message.error('错误！');
      }
    },
    ...mapMutations(['setToken']),
  },
};
</script>

<style lang="less">
  .management {
    width: 100%;
    height: 105px;
    // border: 1px solid #000;
    // max-height: 100%;
    // position:absolute;
    // z-index:20000;
    // left:0;
    // top:0;
    // background-image: url(../../assets/management.png);
    // background-repeat:no-repeat;
    // background-position: center 0;
    // background-attachment: fixed;
  }
  .refresh {
    // border: 1px solid #000;
    float: right;
    margin-right: 20px;
    margin-top: 5px;
  }
  .logout {
    float: right;
    margin-right: 10px;
    margin-top: 5px;
  }
  .el-table td.iscenter, .el-table th.is-center {
    background: #74cfd5;
    color: #191a1b;
  }
  .el-switch {
    // border: 1px solid #000;
    height: 40px;
    margin-left: 15px;
  }
  .el-pagination button, .el-pagination span:not([class*=suffix]) {
    color: #fff;
  }
  .el-input-group {
    margin-bottom: 5px;
    margin-left: 20px;
  }
  .el-dialog__body {
    line-height: 25px;
  }
  .el-tag {
    width: 80%;
  }
  .scoreTag {
    margin: 0 auto;
  }
  .el-pagination {
    margin-top: 20px;
    // border: 1px solid #000;
    line-height: 32px;
    white-space: nowrap;
    padding: 3px 5px;
    color: #303133;
    font-weight: 700;
    text-align: center;
    background: #88dbe0;
  }
  .el-select .el-input {
    width: 100px;
  }
  .input-with-select {
    width: 400px;
  }
</style>
