const utils = {
  /**
     * 获取缓存数
     * @param {string} fields 缓存字段
     */
  getCache(fields) {
    const cache = localStorage.getItem(fields);
    if (!cache) {
      return false;
    }
    return JSON.parse(cache);
  },

  /**
   * 检测缓存
   * @param {string} fields 缓存字段
   */
  hasCache(fields) {
    return Object.prototype.hasOwnProperty.call(localStorage, fields);
  },

  /**
     * 设置缓存
     * @param {string} fields 缓存字段
     * @param {object} data   缓存对象
     */
  setCache(fields, data) {
    const d = data;
    localStorage.setItem(fields, JSON.stringify(d));
  },

  /**
   * 获取数据类型
   * @param {all} data 检测对象
   */
  getType(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  },

  /**
   * 分值标识颜色
   * @param {number} level
   */
  tagColor(level) {
    switch (level) {
      case 1:
        return '#F56C6C';
      case 2:
        return '#67C23A';
      case 3:
        return '#409EFF';
      default:
        return '#909399';
    }
  },

  /**
     * 数值转中文大写
     * @param {number} n 阿拉伯数字
     */
  digitDX(num) {
    let n = num;
    const enums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const scale = ['', '十', '百', '千'];
    let strIns = '';
    let chnStr = '';
    let unitPos = 0;
    let zero = true;
    while (n > 0) {
      const v = n % 10;
      if (v === 0) {
        if (!zero) {
          zero = true;
          chnStr = enums[v] + chnStr;
        }
      } else {
        zero = false;
        strIns = enums[v];
        strIns += scale[unitPos];
        chnStr = strIns + chnStr;
      }
      unitPos++;
      n = Math.floor(n / 10);
    }
    return chnStr;
  },

  /**
   * 时间处理函数
   * @param {string} str
   */
  goodTime(str) {
    let result = '';
    const now = new Date().getTime();
    const oldTime = new Date(str).getTime();
    const difference = now - oldTime;
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = month * 12;
    const y = difference / year;
    const m = difference / month;
    const w = difference / (7 * day);
    const d = difference / day;
    const h = difference / hour;
    const min = difference / minute;

    if (y >= 1) {
      result = `${Math.floor(y)} 年前`;
    } else if (m >= 1) {
      result = `${Math.floor(m)} 个月前`;
    } else if (w >= 1) {
      result = `${Math.floor(w)} 周前`;
    } else if (d >= 1) {
      result = `${Math.floor(d)} 天前`;
    } else if (h >= 1) {
      result = `${Math.floor(h)} 小时前`;
    } else if (min >= 1) {
      result = `${Math.floor(min)} 分钟前`;
    } else {
      result = '刚刚';
    }
    return result;
  },

  // 数据处理函数
  manageData(data) {
    // console.log(data);
    const tableData = [];
    for (let i = 0; i < data.length; i++) {
      let PL = 0;
      let levelPL = 0;
      let RI = 0;
      let levelRI = 0;
      let CO = 0;
      let levelCO = 0;
      let SH = 0;
      let levelSH = 0;
      let ME = 0;
      let levelME = 0;
      let TW = 0;
      let levelTW = 0;
      let IM = 0;
      let levelIM = 0;
      let CF = 0;
      let levelCF = 0;
      let SP = 0;
      let levelSP = 0;
      for (let j = 0; j < data[i].grades.length; j++) {
        if (data[i].grades[j].code === 'PL') {
          PL = data[i].grades[j].score;
          levelPL = data[i].grades[j].level;
        }
        if (data[i].grades[j].code === 'RI') {
          RI = data[i].grades[j].score;
          levelRI = data[i].grades[j].level;
        }
        if (data[i].grades[j].code === 'CO') {
          CO = data[i].grades[j].score;
          levelCO = data[i].grades[j].level;
        }
        if (data[i].grades[j].code === 'SH') {
          SH = data[i].grades[j].score;
          levelSH = data[i].grades[j].level;
        }
        if (data[i].grades[j].code === 'ME') {
          ME = data[i].grades[j].score;
          levelME = data[i].grades[j].level;
        }
        if (data[i].grades[j].code === 'TW') {
          TW = data[i].grades[j].score;
          levelTW = data[i].grades[j].level;
        }
        if (data[i].grades[j].code === 'IM') {
          IM = data[i].grades[j].score;
          levelIM = data[i].grades[j].level;
        }
        if (data[i].grades[j].code === 'CF') {
          CF = data[i].grades[j].score;
          levelCF = data[i].grades[j].level;
        }
        if (data[i].grades[j].code === 'SP') {
          SP = data[i].grades[j].score;
          levelSP = data[i].grades[j].level;
        }
      }
      tableData.push({
        staffNo: data[i].staff.staffNo,
        staffName: data[i].staff.staffName,
        tags: data[i].tags,
        createTime: data[i].staff.createdTime,
        Number: i + 1,
        scorePL: PL,
        PL: levelPL,
        scoreRI: RI,
        RI: levelRI,
        scoreCO: CO,
        CO: levelCO,
        scoreSH: SH,
        SH: levelSH,
        scoreME: ME,
        ME: levelME,
        scoreTW: TW,
        TW: levelTW,
        scoreIM: IM,
        IM: levelIM,
        scoreCF: CF,
        CF: levelCF,
        scoreSP: SP,
        SP: levelSP,
      });
    }
    return tableData;
  },
};

export default utils;
