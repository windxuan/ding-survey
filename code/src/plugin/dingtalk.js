import dd from 'dingtalk-jsapi';

const config = {
  // 企业 ID
  corpId: 'ding1376adf5aafa039935c2f4657eb6378f',
};

const ding = {

  /**
   * 钉钉版本
   */
  version: dd.version,

  /**
   * 震动
   * @param {number} time 震动时长
   */
  vibration: (time = 100) => dd.version && dd.device.notification.vibrate({
    duration: time,
  }),

  /**
   * 获取临时授权码
   * @param {function} resolve 成功回调(code)
   * @param {function} reject 失败回调
   */
  getAuthCode: (resolve, reject) => dd.version && dd.runtime.permission.requestAuthCode({
    corpId: config.corpId,
    onSuccess: result => resolve && resolve(result.code),
    onFail: error => reject && reject(error),
  }),

  /**
   * 设置导航栏标题
   * @param {string} title 导航栏标题
   * @param {function} callback 点击后回调
   */
  setTitle: (title, callback) => dd.version && dd.biz.navigation.setTitle({
    title,
    onSuccess: () => callback && callback(),
  }),

  /**
   * 设置左侧导航按钮
   * @param {string} text 导航显示文本
   * @param {function} callback 点击后回调
   */
  setLeft: (title, callback) => dd.version && dd.biz.navigation.setLeft({
    title,
    control: true, // 若为true，则onSuccess将在发生按钮点击事件被回调
    onSuccess: () => callback && callback(),
  }),

  /**
   * 设置右侧导航按钮
   * @param {string} text 导航显示文本
   * @param {function} callback 点击后回调
   */
  setRight: (text, callback) => dd.version && dd.biz.navigation.setRight({
    control: true,
    show: !!text,
    text,
    onSuccess: () => callback && callback(),
  }),

  /**
   * 弹窗 alert
   * @param {object} config 配置信息
   * @param {function} callback 确认后回调
   */
  alert: (config, callback) => dd.version && dd.device.notification.alert({
    title: config.title || '',
    message: config.message,
    buttonName: config.buttonName || '确定',
    onSuccess: () => callback && callback(),
  }),

  /**
   * 选择框 confirm
   * @param {object} config 配置信息
   * @param {function} callback 确认后回调(按钮索引)
   */
  confirm: (config, callback) => dd.version && dd.device.notification.confirm({
    title: config.title || '',
    message: config.message,
    buttonLabels: config.buttonLabels || ['取消', '确定'],
    onSuccess: result => callback && callback(result.buttonIndex),
  }),

  /**
   * 输入框 prompt
   * @param {object} config 配置信息
   * @param {function} callback 确认后回调(按钮索引, 输入值)
   */
  prompt: (config, callback) => dd.version && dd.device.notification.prompt({
    title: config.title || '',
    message: config.message,
    buttonLabels: config.buttonLabels || ['确定', '取消'],
    onSuccess: result => callback && callback(result.buttonIndex, result.value),
  }),
};

dd.ready(() => ding);

export default ding;
