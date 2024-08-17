<template>
  <div class="nav">
    <input type="checkbox" id="nav-check" v-model="showMobileNav" />
    <div class="nav-header">
      <div class="nav-title">
        <div class="nav-title">
          <router-link to="/" @click="resetLabelAndImage" class="title_link"
            >Classif-<span class="title_color">AI</span></router-link
          >
        </div>
      </div>
    </div>
    <div class="nav-btn">
      <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>

    <div class="nav-links">
      <router-link to="/" @click="resetLabelAndImage" class="nav-link"
        ><a>Home</a></router-link
      >
      <router-link to="/upload" @click="resetLabelAndImage" class="nav-link"
        ><a>Try our model</a></router-link
      >
      <router-link to="/aboutus" @click="resetLabelAndImage" class="nav-link"
        ><a>About Us</a></router-link
      >
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      showMobileNav: false,
    };
  },

  methods: {
    resetLabelAndImage() {
      // Reset the prediction label
      this.$store.dispatch("updatePredictionLabel", null);

      // Clear the uploaded image
      this.$store.dispatch("clearUploadedImage");

      // Additional logic for resetting other data properties if needed
      // Clear the uploaded image in the local component data
      this.uploadedImage = null;
      this.showMobileNav = false;
    },

    toggleMobileNav() {
      this.showMobileNav = !this.showMobileNav;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oxanium:wght@200;300;400;500;600;700;800&display=swap");
@font-face {
  font-family: "offbit_dotB";
  src: url("./assets/OffBitTrial-DotBold.ttf");
}
@font-face {
  font-family: "dotbold-101";
  src: url("./assets/ttf/OffBitTrial-101Bold.ttf");
}
@font-face {
  font-family: "offbit-bold";
  src: url("./assets/ttf/OffBitTrial-Bold.ttf");
}
@font-face {
  font-family: "offbit-regular";
  src: url("./assets/ttf/OffBitTrial-Regular.ttf");
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  height: 100vh;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  overflow-y: scroll;
}

body {
  margin: 0;
  background-color: #f0f0f0;
}

.logo {
  margin: 20px 20px;
  cursor: pointer;
}

.title_link {
  text-decoration: none;
  color: #2176ff;
}

.title_color {
  color: #2176ff;
  -webkit-text-fill-color: #2176ff;
}

.nav {
  width: 100%;
  background-color: white;
  position: relative;
  padding: 1px;
}

.nav > .nav-header {
  display: inline;
  padding-left: 70px;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  color: #fff;
  padding: 10px 10px 10px 10px;
  font-size: 40px;
  cursor: pointer;
  font-family: "dotbold-101", sans-serif;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 20px;
  margin-top: 7px;
  font-family: "offbit-bold", sans-serif;
  color: #2176ff;
  padding-right: 70px;
  z-index: 1000;
}

.nav > .nav-links > a {
  display: inline-block;
  padding: 15px 20px 15px 20px;
  text-decoration: none;
  color: #2176ff;
}

.nav > .nav-links > a:hover {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
}

.nav > #nav-check {
  display: none;
}

@media (max-width: 600px) {
  .nav-title {
    margin-left: -30px;
    padding: 0;
  }
  .nav {
    padding: 0;
  }
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
    margin-top: 10px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .nav > .nav-btn > label:hover,
  .nav #nav-check:checked ~ .nav-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > .nav-btn > label:hover,
  .nav #nav-check:not(:checked) ~ .nav-btn > label {
    background-color: transparent;
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #85817c;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #d0ced1;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }
  .nav > .nav-links > a {
    display: block;
    width: 100%;
  }
  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
}
</style>
