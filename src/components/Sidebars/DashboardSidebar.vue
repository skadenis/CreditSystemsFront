<template>
  <!-- Main Sidebar -->
  <a-layout-sider
    collapsible
    class="sider-primary"
    breakpoint="lg"
    collapsed-width="0"
    width="250px"
    :collapsed="sidebarCollapsed"
    @collapse="$emit('toggleSidebar', !sidebarCollapsed)"
    :trigger="null"
    :class="[
      'ant-layout-sider-' + sidebarColor,
      'ant-layout-sider-' + sidebarTheme,
    ]"
    theme="light"
    :style="{ backgroundColor: 'transparent' }"
  >
    <div class="brand">
      <router-link to="/" class="brand-link">
        <img src="@/assets/CS_logo.png" />
        <h1>Кредитные<br />Системы</h1>
      </router-link>
    </div>
    <hr />

    <!-- Sidebar Navigation Menu -->
    <a-menu theme="light" mode="inline">
      <a-menu-item>
        <router-link to="/banks">
          <span class="icon">
            <svg
              viewBox="64 64 896 896"
              data-icon="bank"
              width="1.2em"
              height="1.2em"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
              class=""
            >
              <path
                d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM512 196.7l271.1 197.2H240.9L512 196.7zM264 462h117v374H264V462zm189 0h117v374H453V462zm307 374H642V462h118v374z"
              ></path>
            </svg>
          </span>
          <span class="label">Банки</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/leads">
          <span class="icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
                fill="#111827"
              ></path>
            </svg>
          </span>
          <span class="label">Лиды</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <a v-on:click="exit()">
          <span class="icon">
            <a-icon type="close-circle" />
          </span>
          <span class="label">Выйти</span>
        </a>
      </a-menu-item>
    </a-menu>

    <!-- Sidebar Footer -->
    <!-- <div class="aside-footer">
      <div class="footer-box">
        <h6>Возникли вопросы?</h6>
        <p>Звоните, мы поможем!</p>

        <p><br /><b>ID партнера: </b></p>
        <a-button
          type="primary"
          href="/contacts"
          block
          target="_blank"
          style=""
        >
          Контакты
        </a-button>
      </div>
    </div> -->

    <!--			 / Sidebar Footer -->

    <!--    <div>-->
    <!--      <a-menu mode="vertical" style="border: 0px;">-->
    <!--        <a-menu-item @click="openPage('/legal')">Юридическая информация</a-menu-item>-->

    <!--      </a-menu>-->
    <!--    </div>-->
  </a-layout-sider>
  <!-- / Main Sidebar -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    // Sidebar collapsed status.
    sidebarCollapsed: {
      type: Boolean,
      default: false,
    },

    // Main sidebar color.
    sidebarColor: {
      type: String,
      default: "primary",
    },

    // Main sidebar theme : light, white, dark.
    sidebarTheme: {
      type: String,
      default: "light",
    },
  },
  methods: {
    ...mapActions({
      userExit: "User/exit",
    }),
    exit: function () {
      this.userExit();
    },
    openPage(page) {
      this.$router.push(page);
    },
  },
};
</script>

<style lang="scss">
.icon {
  & i {
    margin: 0 !important;
    font-size: 18px !important;
  }
}
.footer-box .ant-btn-primary span {
  color: #141414;
}

.brand-link {
  display: flex;
  align-items: center;

  h1 {
    font-size: 18px;
  }
}
</style>
