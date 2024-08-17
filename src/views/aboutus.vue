<template>
  <div class="abt_title">
    <h1>Meet Our Team</h1>
  </div>
  <div class="dev_container">
    <div class="dev_info">
      <div>
        <h1 class="custom_h1">Piolo Macayan</h1>
        <h2>Programmer</h2>
        <img :src="gmailIcon" v-lazy="gmailIcon" />
        <img :src="linkedIn" v-lazy="linkedIn" />
      </div>
      <div>
        <img :src="MacayanImg" class="image_size" v-lazy="MacayanImg" />
      </div>
    </div>
    <div class="dev_info_mamplata">
      <div>
        <h1 class="custom_h1">Matthew Mamplata</h1>
        <h2>Programmer</h2>
        <img :src="gmailIcon" v-lazy="gmailIcon" />
        <img :src="linkedIn" v-lazy="linkedIn" />
      </div>
      <div>
        <img
          :src="MamplataImg"
          class="image_size_mamplata"
          v-lazy="MamplataImg"
        />
      </div>
    </div>
    <div class="dev_info_barrios">
      <div>
        <h1 class="custom_h1">Alessandra<br />Yvonne Barrios</h1>
        <h2>Designer</h2>
        <img :src="gmailIcon" v-lazy="gmailIcon" />
        <img :src="linkedIn" v-lazy="linkedIn" />
      </div>
      <div>
        <img :src="BarriosImg" class="image_size" v-lazy="BarriosImg" />
      </div>
    </div>
    <div class="dev_info_fontanila">
      <div>
        <h1 class="custom_h1">Rose Ann Fontanilla</h1>
        <h2>Documentation</h2>
        <img :src="gmailIcon" v-lazy="gmailIcon" />
        <img :src="linkedIn" v-lazy="linkedIn" />
      </div>
      <div>
        <img :src="FontanillaImg" class="image_size" v-lazy="FontanillaImg" />
      </div>
    </div>
  </div>
</template>

<script>
import MacayanImg from "@/assets/macayan.png";
import MamplataImg from "@/assets/mamplata.png";

import FontanillaImg from "@/assets/fontanilla.png";

import BarriosImg from "@/assets/barrios.png";
import gmailIcon from "@/assets/gmail.png";
import linkedIn from "@/assets/LinkedIn.png";

export default {
  components: {
    MacayanImg,
    MamplataImg,
    FontanillaImg,
    BarriosImg,
    gmailIcon,
    linkedIn,
  },
  data() {
    return {
      MacayanImg: MacayanImg,
      MamplataImg: MamplataImg,
      FontanillaImg: FontanillaImg,
      BarriosImg: BarriosImg,
      gmailIcon: gmailIcon,
      linkedIn: linkedIn,
    };
  },
};
</script>

<style scoped>
html,
body {
  background-color: #f0f0f0;
  overflow-y: scroll;
}

.image_size_mamplata {
  width: 245px;
  height: auto;
}
.dev_info h2 {
  color: #878787;
  margin: 0;
  margin-bottom: 10px;
}

.dev_info h1 {
  margin: 0;
}

.dev_info_mamplata h2 {
  color: #878787;
  margin: 0;
  margin-bottom: 10px;
}

.dev_info_mamplata h1 {
  margin: 0;
}

.dev_info_barrios h2 {
  color: #878787;
  margin: 0;
  margin-bottom: 10px;
}
.dev_info_barrios h1 {
  margin: 0;
}
.dev_info_fontanila {
  display: flex;
  flex-direction: row;
  font-family: "offbit_dotB";
  color: #2e3cfe;
  align-items: center;
  gap: 40px;
}
.dev_info_fontanila h1 {
  margin: 0;
}

.dev_info_fontanila h2 {
  color: #878787;
  margin: 0;
  margin-bottom: 10px;
}
.image_size {
  width: 245px;
  height: auto;
}

.dev_info {
  display: flex;
  flex-direction: row;
  font-family: "offbit_dotB";
  color: #2e3cfe;
  align-items: center;
  gap: 40px;
}

.dev_info_mamplata {
  display: flex;
  flex-direction: row;
  font-family: "offbit_dotB";
  color: #2e3cfe;
  align-items: center;
  gap: 40px;
}

.dev_info_barrios {
  display: flex;
  flex-direction: row;
  font-family: "offbit_dotB";
  color: #2e3cfe;
  align-items: center;
  gap: 40px;
}
.dev_container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  gap: 100px;
}
.abt_title {
  color: #2176ff;
  text-align: center;
  font-family: "offbit_dotB", sans-serif;
  font-size: 17px;
  justify-content: center;
}

@media (max-width: 600px) {
  .dev_info {
    justify-content: center;
    gap: 40px;
  }

  .dev_info h1 {
    font-size: 20px;
    margin-top: 50px;
  }
  .dev_info h2 {
    font-size: 15px;
  }

  .dev_info_mamplata {
    justify-content: center;
    gap: 10px;
  }

  .dev_info_mamplata h1 {
    font-size: 20px;
    margin-top: 50px;
  }

  .dev_info_mamplata h2 {
    font-size: 15px;
  }

  .image_size_mamplata {
    width: 130px;
  }

  .dev_info_barrios {
    justify-content: center;
    gap: 40px;
  }

  .dev_info_barrios h1 {
    font-size: 20px;
    margin-top: 50px;
  }

  .dev_info_barrios h2 {
    font-size: 15px;
  }

  .abt_title {
    font-size: 15px;
    margin-top: 50px;
  }

  .image_size {
    max-width: 130px;
    max-height: auto;
  }
  .dev_container {
    flex-direction: column;
  }
  .dev_info_fontanila {
    justify-content: center;
    gap: 10px;
  }

  .dev_info_fontanila h1 {
    font-size: 20px;
    margin-top: 50px;
  }

  .dev_info_fontanila h2 {
    font-size: 15px;
  }
}
</style>
