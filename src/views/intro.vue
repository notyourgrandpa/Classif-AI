<template>
  <div class="container">
    <div class="body">
      <div class="wrapper">
        <div class="intro">
          <h1>Is that art made by AI or Human?</h1>
        </div>
        <div class="sub_title">
          Using Classif-AI, determine whether an artwork was created by AI or by
          a human
        </div>
        <router-link to="/upload">
          <button class="intro_b">Try Our Model</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import IntroImage from "@/assets/intro_image.jpg";
import landingImg from "@/assets/LandingPageImage.png";
export default {
  components: {
    IntroImage,
    landingImg,
  },
  data() {
    return {
      IntroImage: IntroImage,
      landingImg: landingImg,
    };
  },
  methods: {
    exitIntro() {
      this.$emit("closeIntro");
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100vh;
  margin: 0;
  padding: 0;
}
.sub_title {
  font-size: 30px;
  font-family: "offbit-regular", sans-serif;
  color: white;
  margin-bottom: 30px;
}
.intro {
  font-family: "dotbold-101", sans-serif;
  font-size: 30px;
  color: white;
}

.intro h1 {
  margin: 0;
}
.container {
  position: relative;
  height: 100%;
}

.body {
  background-image: url("@/assets/LandingPageImage.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Add position relative */
}

.body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.wrapper {
  text-align: center;
  position: relative; /* Add position relative */
  z-index: 2; /* Ensure the content is on top of the overlay */
}
.textbox {
  margin: auto;
}
.title {
  color: white;
  font-size: 100px;
  margin: 0;
  padding: 0;
  font-family: "offbit-bold", sans-serif;
}

.sub-title {
  font-family: "offbit-regular", sans-serif;
}

.intro_b {
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 3px;
  padding: 12px 24px;
  border: 0;
  color: #fff;
  background: #2176ff;
  line-height: 1.15;
  font-size: 16px;
  margin-top: 10px;
  font-family: "offbit_dotB";
}
.intro_b:hover {
  transition: all 0.1s ease;
  box-shadow: 0 0 0 0 #fff, 0 0 0 3px #1de9b6;
}
p {
  color: #d0ced1;
  font-size: 20px;
}
.intro_img {
  border-radius: 200px;
  width: 350px;
  height: 350px;
}

.intro_img_cont {
  margin: auto;
}

@media (max-width: 600px) {
  .wrapper {
    margin: 0;
    flex-direction: column;
    align-items: center;
  }
  .intro_img {
    height: 200px;
    width: 200px;
  }
  .title {
    font-size: 50px;
  }
  .textbox {
    text-align: center;
  }
  .intro h1 {
    font-size: 40px;
    margin: 10px;
  }

  .sub_title {
    font-size: 20px;
    margin: 10px;
  }
}
</style>
