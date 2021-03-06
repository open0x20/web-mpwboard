<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon
        @click="navigationDrawer.isCollapsed = !navigationDrawer.isCollapsed"
      />
      <v-toolbar-title><b>Hackerspace </b>Web</v-toolbar-title>
      <v-spacer />

      <!-- Search Menu -->
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- Overflow Menu -->
      <v-menu
        bottom
        left
      >
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            icon
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            to="/examples"
            link
          >
            <v-list-item-title
              class="font-weight-regular"
            >
              Examples
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/settings"
            link
          >
            <v-list-item-title
              class="font-weight-regular"
            >
              Settings
            </v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item
            to="/logout"
            link
          >
            <v-list-item-title
              class="font-weight-regular"
            >
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-navigation-drawer
        v-model="navigationDrawer.isCollapsed"
        color="#262626"
        app
        fixed
        dark
      >
        <v-list
          dense
          nav
        >
          <!-- Dashboard -->
          <v-list-item
            to="/"
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- Chat -->
          <v-list-item
            to="/chat"
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-forum</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Chat</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- Custom-Apps -->
          <v-list-group
            no-action
            color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>mdi-apps</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  text="Custom-Apps"
                >
                  Custom-Apps
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="customApp in navigationDrawer.customApps"
              :key="customApp.title"
              :to="customApp.route"
              link
            >
              <v-list-item-content>
                <v-list-item-title v-text="customApp.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>

        <!-- Footer -->
        <template v-slot:append>
          <v-list
            dense
            nav
          >
            <v-list-item
              to="/about"
              link
            >
              <v-list-item-icon>
                <v-icon>mdi-help-box</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>About</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider />
          <MiniPlayer />
        </template>
      </v-navigation-drawer>
      <transition name="fade">
        <router-view class="view" />
      </transition>
    </v-main>

    <!-- Helper Components --> 
    <PlayerManager />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import MiniPlayer from "@/components/MiniPlayer.vue";
import PlayerManager from "@/components/PlayerManager.vue";

export default Vue.extend({
  name: "App",
  components: { MiniPlayer, PlayerManager },
  data: () => ({
    navigationDrawer: {
      isCollapsed: true,
      customApps: [
        { title: "ATAC", icon: "mdi-download", route: "/apps/atac" },
        { title: "NAS-Browser", icon: "mdi-forum", route: "/apps/nas-browser" },
        { title: "DNSmasq Configurator", icon: "mdi-forum", route: "/apps/dnsmasq-dynconf" },
        { title: "Bookshelf", icon: "mdi-forum", route: "/apps/bookshelf" }
      ]
    }
  })
});
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .15s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
