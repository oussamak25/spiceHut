<template>
  <div class="cont">
    <span class="spinner" />
  </div>
</template>

<script>
export default {

};
</script>

<style  lang="scss" scoped>
.cont{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 32vh;
    background: #F6F6F9;
}
.spinner{
    width: 3rem;
    height: 3rem;
    display: inline-block;
    border: 5px solid #FF4B3A;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: spin 1s infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0);
    }
    50%{
        transform: rotate(180deg);
        border-top-color: #fc4182;
        border-bottom-color: #80ffdb;
        border-right-color: transparent;
        border-left-color: transparent;
    }
    100%{
        transform: rotate(360deg);
    }
}

</style>
