<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide"><img src="@/assets/1.png" /></div>
      <div class="swiper-slide"><img src="@/assets/2.png" /></div>
      <div class="swiper-slide"><img src="@/assets/3.png" /></div>
      <div class="swiper-slide"><img src="@/assets/4.png" /></div>
    </div>
    <!-- 分頁器 -->
    <div class="swiper-pagination"></div>

    <!-- 前一個與後一個按鈕 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "@/../public/swiper.js";

export default {
  name: "Swiper",
  mounted() {
    new Swiper(".swiper-container", {
      direction: "horizontal", // 切換垂直或水平(垂直為vertical)
      loop: true, // 循環模式
      autoplay: {
        delay: 3000, // 3秒切換一次
        disableOnInteraction: false, // 用戶操作Swiper之後，是否禁止autoplay
      },

      // 分頁器(下面的圓點)
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      // 下一個與前一個的按鈕
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      slidesPerView: "auto",

      centeredSlides: true,
    });
  },
};
</script>

<style lang="scss">
@import url("../../public/swiper.css");
.swiper-container {
  width: 80%;
  height: 450px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.swiper-slide {
  display: flex;
  align-items: center;
  width: 60%;
  img {
    margin: auto;
  }
}
.swiper-slide-prev {
  opacity: 0.3;
}
.swiper-slide-next {
  @extend .swiper-slide-prev;
}
.swiper-pagination {
  padding-bottom: 20px;
}

@media (max-width: 1500px) {
  .swiper-slide img {
    width: 95%;
  }
}
@media (max-width: 1200px) {
  .swiper-container {
    width: 70%;
    height: 400px;
  }
  .swiper-slide {
    width: 75%;
  }
  .swiper-pagination {
    padding-bottom: 45px;
  }
}
@media (max-width: 900px) {
  .swiper-container {
    height: 300px;
  }
  .swiper-pagination {
    padding-bottom: 30px;
  }
}
@media (max-width: 600px) {
  .swiper-container {
    width: 90%;
    height: 150px;
  }
  .swiper-pagination {
    padding-bottom: 5px;
  }
}
@media (max-width: 300px) {
  .swiper-container {
    height: 100px;
  }
  .swiper-pagination {
    padding-bottom: 0;
  }
}
</style>
