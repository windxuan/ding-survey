<template>
  <div class="summary">
    <div class="management">
      <img src="../../assets/management.png" width="100%" height="100px" alt="">
    </div>
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
      <el-input
        placeholder="请输入内容"
        v-model="search.value"
        class="input-with-select"
        @keyup.enter.native="searchData"
        clearable>
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
        header-align=center>
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
      <el-table-column
        label="答题时间"
        prop="createTime"
        header-align=center
        sortable>
        <template slot-scope="scope">
          <span class="nowrap">{{ $utils.goodTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="详情"
        header-align=center>
        <template slot-scope="scope">
          <el-button @click="getDetails(scope.row.Number)" width="40px">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="28%">
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="员工编号">
          {{staffData.staffNo}}
        </el-form-item>
        <el-form-item label="手机号">
          {{staffData.mobile}}
        </el-form-item>
        <el-form-item label="总评">
          <el-tag v-for="tag in staffData.tags" v-bind:key="tag" style="width: 75px;text-align: center;">
          {{tag}}
          </el-tag>
        </el-form-item>
        <el-form-item label="问卷名">
          《{{staffData.surveyName}}》
        </el-form-item>
        <el-form-item label="测试能力">
          {{staffData.surveyShow}}
        </el-form-item>
        <el-form-item label="测试类型">
          {{staffData.surveyType}}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      disability: false,
      tableData: [],      //列表渲染数据
      tableLoading: true,
      staffPageSize: 7,   //每页多少调数据
      staffCurrentPage: 1,  //默认数据从第一页开始
      staffTotalCount: 0, 
      evalTagShow: true,  //一键切换中的标签展示
      scoreTagShow: false,  //一键切换中的分值展示
      refreshLoading: false,
      index: 1,
      dialogVisible: false, //详细按钮：弹出框
      logoutVisible: false, //是否登出
      staffData: [],
      labelPosition: 'left',
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
        select: '1',
        value: '',
      },
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
    refresh() { // 刷新函数
      this.refreshLoading = true;
      this.getData();
      this.staffCurrentPage = 1;
    },
    getData() { // 数据获取函数
      this.tableLoading = true;
      this.$http.get('summary', {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
        .then((response) => {
          if (response) {
            // console.log(response);
            this.pushData(response);
            this.tableLoading = false;
            this.refreshLoading = false;
          }
        })
        .catch((error) => {
          // console.log(error);
          if (error.response.data.message) {
            this.$message.error(error.response.data.message);
          } else {
            this.$message.error('服务器连接错误！');
            this.refreshLoading = false;
          }
        });
    },
    pushData(data) { // 数据渲染函数
      this.tableData.splice(0, this.tableData.length);
      this.tableData = this.$utils.manageData(data);
      this.tempData = this.tableData;
      // console.log(this.tableData);
      this.staffTotalCount = data.length;
    },
    handleSizeChange(val) { // 改变每页显示条数
      this.staffPageSize = val;
    },
    handleCurrentChange(val) { // 改变当前页码
      this.staffCurrentPage = val;
    },
    getEval(level) { // 获取评价
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
    getType(level) { // 获取标签类型
      if (level === 3) {
        return 'primary';
      }
      if (level === 2) {
        return 'success';
      }
      if (level === 1) {
        return 'warning';
      }
      if (level === 0) {
        return 'danger';
      }
      return 'info';
    },
    changeSwitch(state) { // 切换显示分数或评价
      this.disability = true;
      // console.log(state);
      if (state === false) {
        this.evalTagShow = false;
        setTimeout(() => {    //添加setTimeout使时间延长，解决一键切换数据时，速度过快的样式冲突问题
          this.scoreTagShow = true;
          if (this.scoreTagShow === true) {
            this.disability = false;
          }
        }, 390);
      } else {
        this.scoreTagShow = false;
        setTimeout(() => {
          this.evalTagShow = true;
          if (this.evalTagShow === true) {
            this.disability = false;
          }
        }, 390);
      }
    },
    getDetails(index) { // 详情函数
      // console.log(index);
      this.dialogVisible = true;
      this.index = index - 1;
      this.staffData = this.tempData[this.index];
    },
    searchData() { // 搜索函数
      this.staffCurrentPage = 1;  //搜索的第几页
      this.staffPageSize = 7;     //每一页有多少条数据、默认为7条 //初始样式为7条
      // console.log(this.tempData);
      // console.log(this.search.value);
      this.result = [];           //利用一个空数组，用来存放筛选后的数据
      if (this.search.select === '1') {   //当搜索条件为第一个时
        // console.log(this.search.select);
        this.tempData.forEach((element, index) => {   //forEach遍历源数据tempData:然后开始按条件进行筛选，将筛选条件满足的数据放入 result
          if (element.staffName.indexOf(this.search.value) >= 0) {  //if 判断进入筛选条件 indexOf(匹配所有只要有一个为相同的元素)
            this.result.push(this.tempData[index]);     //将对应源数据里的数据按下标 index 传回来 放入空数组 result 之中
          }
        });
      } else if (this.search.select === '2') {  //当搜索条件为第二个时
        // console.log(this.search.select);
        this.tempData.forEach((element, index) => {  //遍历源数据项
          element.tags.forEach((elem) => {           //由于按标签的数据有多项，因此需要将标签分为一个一个的，来进行条件查询
            if (elem.indexOf(this.search.value) >= 0) { //如果标签有一项相同
              this.result.push(this.tempData[index]);   //则将对应源数据里的数据按下标 index 放入空数组之中
            }
          });
        });
      } else {
        this.result = this.tempData;    //如若没有进行条件查询 则将数据直接原封不动的报出去
      }
      // console.log(this.result);  //在控制台里查看数据项
      this.tableData = this.result; //根据条件查询数据重新排列好之后，改变每一行每一项的具体数据
      this.staffTotalCount = this.tableData.length; //分页栏里的数据数据：一共有多少调数据
    },
    logout() { // 退出函数
      this.logoutVisible = false;  //只要是涉及到登陆与退出的: 都需要给一个状态，true表示成功 false表示失败
      this.$http.delete('logout', { 
        headers: {
          Authorization: this.$store.state.token,
        },
      })
        .then((response) => {
          if (response) {
            this.$message({
              message: response.data.message,
              type: 'success',
              duration: 1500,
            });
            const token = '';
            localStorage.TOKEN = token;
            this.setToken(token);
            this.$store.commit('setToken', token);
            this.$router.push({
              name: 'login',
            });
          }
        })
        .catch((error) => {
          // console.log(error);
          if (error.response.data.message) {
            this.$message.error(error.response.data.message);
          } else {
            this.$message.error('服务器连接错误！');
            this.refreshLoading = false;
          }
        });
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
    background: #f0fbff;
    color: #636262;
  }
  .el-switch {
    // border: 1px solid #000;
    height: 40px;
    margin-left: 80px;
  }
  // .el-pagination button, .el-pagination span:not([class*=suffix]) {
  //   color: #fff;
  // }
  .el-input-group {
    margin-bottom: 5px;
    margin-left: 35px;
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
    // margin-top: 20px;
    // border: 1px solid #000;
    line-height: 32px;
    white-space: nowrap;
    padding: 3px 5px;
    color: #303133;
    font-weight: 700;
    text-align: center;
    background: #a3eaee;
  }
  .el-select .el-input {
    width: 100px;
  }
  .input-with-select {
    width: 400px;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
</style>
