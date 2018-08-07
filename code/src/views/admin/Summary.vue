<template>
  <div class="summary">
    <h2>汇总页</h2>
    <el-button type="primary" @click="getData">刷新</el-button>
    <el-switch
      v-model="switchValue"
      @change="changeSwitch"
      active-text="评价"
      inactive-text="分数"
      :disabled="disability">
    </el-switch>
      <!-- @cell-mouse-enter="handleMouseEnter"
      @cell-mouse-leave="handleMouseOut" -->
    <el-table
      :data="tableData.slice((staffCurrentPage-1)*staffPageSize,staffCurrentPage*staffPageSize)"
      border
      style="height: 100%;margin-left: auto; margin-right: auto;text-align: center;"
      height="595"
      :default-sort = "{prop: 'date', order: 'descending'}"
      ref="mainTable">
      <!-- <el-table-column
        prop="staffNo"
        label="员工编号"
        style="text-align: center;"
        header-align=center
        sortable
        width="110">
      </el-table-column> -->
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
          <!-- <i :style="{'background': $utils.tagColor('PL', scope.row[1][0].score)}"></i>
          {{ $utils.convertScore('PL', scope.row[1][0].score) }} -->
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
        prop="Number"
        header-align=center>
        <template slot-scope="scope">
          <el-button @click="getData" width="40px">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="staffCurrentPage"
      :page-sizes="[8, 16, 32, 64]"
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
      tableData: [],
      staffPageSize: 8,
      staffCurrentPage: 1,
      staffTotalCount: 0,
      evalTagShow: true,
      scoreTagShow: false,
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
    getData() {
      this.$http.get('summary', {
        headers: {
          Authorization: this.$store.state.token,
        },
      })
        .then((response) => {
          if (response) {
            console.log(response);
            this.pushData(response);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            this.$message.error(error.response.data.message);
          }
        });
    },
    pushData(data) {
      this.tableData.splice(0, this.tableData.length);
      this.tableData = this.$utils.manageData(data);
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
    changeSwitch(state) {
      this.disability = true;
      console.log(state);
      if (state === false) {
        this.evalTagShow = false;
        setTimeout(() => {
          this.scoreTagShow = true;
          if (this.scoreTagShow === true) {
            this.disability = false;
          }
        }, 350);
      } else {
        this.scoreTagShow = false;
        setTimeout(() => {
          this.evalTagShow = true;
          if (this.evalTagShow === true) {
            this.disability = false;
          }
        }, 350);
      }
    },
    // handleMouseEnter(val) {
    //   console.log(val);
    // },
    // handleMouseOut(val) {
    //   console.log(val);
    // },
    ...mapMutations(['setToken']),
  },
};
</script>

<style lang="less">
  // .el-table__row:hover .evalTag{
  //   display: none;
  // }
  // .scoreTag {
  //   display: none;
  // }
  // .el-table__row:hover .scoreTag {
  //   display: block;
  // }
  .el-tag {
    width: 80%;
  }
  .scoreTag {
    // float: right;
    margin: 0 auto;
    // text-align: center;
  }
</style>
