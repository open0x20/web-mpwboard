<template>
  <div class="dnsmasq-dynconf">
    <v-container>
      <v-row
        align="center"
        justify="center"
        class="pl-4 pr-4"
      >
        <v-col cols="12">
          <h1 class="display-1">
            DNSmasq Configurator
          </h1>
          <v-divider />
          <p class="font-weight-light font-italic pt-2">
            Manage your local DNSmasq name entries dynamically!
          </p>
          <v-col cols="12">
            <Sheet title="Entries by Endpoint">
              <v-dialog
                v-model="table.addDialog.show"
                max-width="400px"
              >
                <AddEntryDialog :endpoint="endpoints[selectedEndpoint].text" />
              </v-dialog>
              <v-dialog
                v-model="table.authorizationDialog.show"
                max-width="400px"
              >
                <AuthorizationDialog :endpoint="endpoints[selectedEndpoint].text" />
              </v-dialog>
              <v-container>
                <v-row
                  align="center"
                  justify="start"
                >
                  <!-- Sheet Description -->
                  <v-col
                    cols="12"
                    class="pb-0"
                  >
                    <p class="font-weight-light">
                      Select an endpoint and it will automatically fetch all available name entries for that dnsmasq-dynconf instance.
                    </p>
                  </v-col>

                  <!-- Endpoint Dropdown Selection -->
                  <v-col
                    cols="12"
                    class=""
                  >
                    <v-select
                      v-model="endpointSelect"
                      :items="endpoints"
                      @change="onEndpointSelection"
                      label="Endpoint"
                      filled
                      dense
                      hide-details
                      class="pb-0 mb-0"
                    />
                  </v-col>

                  <!-- Table: DNS entries/records -->
                  <v-col
                    cols="12"
                    class="mb-0"
                  >
                    <v-card>
                      <v-card-title>
                        <v-container class="pa-0 ma-0">
                          <v-row no-gutters>
                            <v-col>
                              <h3 class="title">
                                Entries
                              </h3>
                            </v-col>
                            <v-col
                              cols="1"
                              align="right"
                            >
                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-icon
                                    v-on="on"
                                    class="pr-2"
                                    @click="onClickAddDialogShow"
                                  >
                                    mdi-plus
                                  </v-icon>
                                </template>
                                <span>Add New Record</span>
                              </v-tooltip>
                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-icon
                                    v-on="on"
                                    class="pr-2"
                                    :disabled="table.btnRefreshDisabled"
                                    @click="tableClickRefresh"
                                  >
                                    mdi-refresh
                                  </v-icon>
                                </template>
                                <span>Refresh</span>
                              </v-tooltip>
                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-icon
                                    v-on="on"
                                    class="pr-2"
                                    @click="table.authorizationDialog.show = true"
                                  >
                                    mdi-lock
                                  </v-icon>
                                </template>
                                <span>Authorization</span>
                              </v-tooltip>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-title>
                      <v-divider />
                      <v-card-title class="pt-0">
                        <v-text-field
                          class="font-weight-regular"
                          v-model="table.searchInput"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details
                        />
                      </v-card-title>
                      <v-data-table
                        :loading="table.isLoading"
                        :headers="table.headers"
                        :items="table.data"
                        :search="table.searchInput"
                        :footer-props="{
                          itemsPerPageOptions: [15,50,100,-1]
                        }"
                        :items-per-page="15"
                        class="elevation-1"
                      >
                        <template v-slot:item.actions="{ item }">
                          <v-icon
                            small
                            class="mr-2"
                            @click="actionBtnVisit(item)"
                            :disabled="item.modified"
                          >
                            mdi-play
                          </v-icon>
                          <v-icon
                            small
                            class="mr-2"
                            @click="actionBtnDelete(item)"
                          >
                            mdi-delete
                          </v-icon>
                        </template>
                      </v-data-table>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </Sheet>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import {mapGetters} from "vuex";
import Sheet from "@/components/Sheet";
import AddEntryDialog from "@/views/apps/DnsmasqDynconf/AddEntryDialog.vue";
import AuthorizationDialog from "@/views/apps/DnsmasqDynconf/AuthorizationDialog.vue";
import globals from "@/globals";
import Axios from "axios";

export default Vue.extend({
  name: "DnsmasqDynconf",
  components: { Sheet, AddEntryDialog, AuthorizationDialog },
  data: () => ({
    Globals: globals,
    selectedEndpoint: 0,
    endpoints: globals.DNSMASQ_DYNCONF_ENDPOINT_LIST,
    endpointSelect: 0,
    table: {
      addDialog: {
        show: false
      },
      authorizationDialog: {
        show: false
      },
      btnRefreshDisabled: false,
      searchInput: "",
      isLoading: false,
      headers: [
        {text: "Name", value: "name"},
        {text: "IPv4", value: "ip"},
        {text: 'Actions', value: 'actions', sortable: false },
      ],
      data: []
    },
  }),
  methods: {
    onEndpointSelection: function() {
      this.tableFetchData();
    },
    onClickAddDialogShow: function() {
      // Show authorization dialog if secret is not yet set
      if (this.getSessionSecret === "") {
        this.table.authorizationDialog.show = true;
        return;
      }

      this.table.addDialog.show = true;
    },
    tableFetchData: function() {
      this.table.isLoading = true;
      // TODO pagination
      Axios.get(this.endpoints[this.selectedEndpoint].text + '/list')
          .then(response => {
            this.$store.commit("setApisAppsDnsmasqDynconfAddresses", response.data.addresses);
            this.table.data = response.data.addresses;
            this.table.isLoading = false;
          })
          .catch(error => {
            this.$store.commit("setApisAppsDnsmasqDynconfAddresses", []);
            this.table.isLoading = false;
            console.log(error);
          });
    },
    tableClickRefresh: function() {
      this.table.isLoading = true;
      this.table.btnRefreshDisabled = true;
      setTimeout(() => {
        this.tableFetchData();
        this.table.btnRefreshDisabled = false;
      },1500)
    },
    actionBtnVisit: function(item) {
      window.open("https://" + item.name, "_blank");
    },
    actionBtnDelete: function(item) {
      // Show authorization dialog if secret is not yet set
      if (this.getSessionSecret === "") {
        this.table.authorizationDialog.show = true;
        return;
      }

      confirm("Are you sure you want to delete this item? (" + item.name + ":" + item.ip + ")")
      && Axios.post(
          this.endpoints[this.selectedEndpoint].text + '/delete',
          JSON.stringify({name:item.name,ip:item.ip,secret:this.getSessionSecret}),
          {headers: {'Content-Type': 'application/json'}}
      )
          .then(() => {
            const index = this.table.data.indexOf(item)
            this.table.data.splice(index, 1)
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
  mounted: function() {
    this.tableFetchData();
  },
  computed: {
    ...mapGetters({
      getTableData: "getApisAppsDnsmasqDynconfAddresses",
      getSessionSecret: "getApisAppsDnsmasqDynconfSessionSecret",
    })
  },
});
</script>

<style scoped>

</style>
