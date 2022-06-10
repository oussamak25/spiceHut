<template>
  <div class="loader">
    <div class="ball" />
    <div class="ball" />
    <div class="ball" />
    <span>Loading...</span>
  </div>
</template>

<script>
/* preloader para el inicio de la app */
export default {

};
</script>

<style lang="scss" scoped>
.loader{
    width: 120px;
    height: 75px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
}

.loader span{
    font-size: 22px;
    text-transform: uppercase;
    margin: auto;
    font-weight: 500;
    color: #FF4B3A;
}

.ball{
    color: #FF4B3A;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #FF4B3A;
    animation: bounce .5s alternate infinite;
}

.ball:nth-child(2){
    animation-delay: .16s;
}
.ball:nth-child(3){
    animation-delay: .32s;
}

@keyframes bounce {
    from{
        transform: scaleX(1.25);
    }
    to{
        transform: translateY(-50px) scaleX(1);
    }
}
</style>
