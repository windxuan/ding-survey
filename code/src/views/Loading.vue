<template>
    <div class="passPage">
        <div class="passPage-wrap">
            <div class="passPage-center">
                <span class="passPage-center-first">让数据产生灵魂</span>
                <span class="passPage-center-second">让数据服务人类</span>
            </div>
            <div class="passPage-footer"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'passPage',
};
</script>

<style scoped lang="less">
/* passPage-wrap的样式 */
    .passPage{
        width: 100%;
        height: 100vh;
    }
    .passPage-wrap{
        width: 100%;
        height: 100%;
        background-image: url("../assets/background.png");
        background-size: 100% 100%;
        position: relative;
    }
    .passPage-center{
        span{
            width: 24px;
            display: inline-block;
            font-size: 24px;
            font-family: kaiti;
            color: #fff;
        }
    }
    .passPage-center-first{
        position: fixed;
        top: 15%;
        left: 35%;
    }
    .passPage-center-second{
        position: fixed;
        top: 25%;
        left: 60%;
    }
    .passPage-footer{
        width: 90%;
        height: 50px;
        background-size: 100% 100%;
        background-image: url("../assets/change.png");
        position: absolute;
        bottom: 20px;
        left: 5%;
    }
</style>
