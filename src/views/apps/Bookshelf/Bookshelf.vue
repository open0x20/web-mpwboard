<template>
  <div class="bookshelf">
    <v-container>
      <v-row
        align="center"
        justify="center"
        class="pl-4 pr-4"
      >
        <v-col
          cols="12"
        >
          <h1 class="display-1">
            Bookshelf
          </h1>
          <v-divider />
          <p class="font-weight-light font-italic pt-2">
            All your favourite eBooks in one place!
          </p>
          <v-col cols="12">
            <v-container>
              <v-row>
                <v-col
                  v-for="item in this.books"
                  :key="item.name"
                  class="d-flex align-content-start flex-wrap flex-grow-0"
                >
                  <template>
                    <v-card
                      max-width="200"
                      min-width="200"
                      class="mx-auto"
                    >
                      <v-img
                        :src="item.cover"
                        aspect-ratio="0.7"
                        class="align-end white--text"
                        gradient="to top, rgba(10, 0, 0, 0.5) 0%, transparent 200px"
                        @error="updateImageSource(item)"
                      >
                        <v-card-title class="pb-1">
                          {{ item.name }}
                        </v-card-title>
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            />
                          </v-row>
                        </template>
                      </v-img>
                      <v-card-subtitle class="pb-0">
                        {{ item.typesString }}
                      </v-card-subtitle>
                      <v-card-actions>
                        <v-spacer />

                        <div>
                          <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                              >
                                <v-icon>mdi-download</v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item
                                v-for="book in item.types"
                                :key="book.type"
                                @click="clickBtnDownload(book.url, book.type, book.downloadLabel)"
                              >
                                <v-list-item-title>{{ book.typeName }}</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>

                        <v-btn
                          icon
                          @click="clickBtnOpenInNewTab(item.newTabUrl)"
                        >
                          <v-icon>mdi-open-in-new</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import {mapGetters} from "vuex";
import globals from "@/globals";
import Axios from "axios";

export default Vue.extend({
  name: "Bookshelf",
  components: {  },
  data: () => ({
    Globals: globals,
    selectedEndpoint: 0,
    endpoints: globals.DNSMASQ_DYNCONF_ENDPOINT_LIST,
    books: [],
    isLoading: false
  }),
  methods: {
    fetchBookData: function() {
      this.isLoading = true;
      Axios.get(this.Globals.API_URL__BOOKS + '/list')
          .then(response => {
            this.books = response.data.data;
            this.books.map((book) => {
              const types = [];
              book.cover = this.Globals.API_URL__BOOKS + '/cover/' + book.name + '.pdf';
              for (let i = 0; i < book.types.length; i++) {
                // Put host part in front of relative urls
                book.types[i].url = this.Globals.API_URL__BOOKS + book.types[i].url;
                book.types[i].downloadLabel = book.name + '.' + book.types[i].type;
                book.types[i].typeName = book.types[i].type.toUpperCase();
                types.push(book.types[i].typeName);

                // Fetch the pdf link for preview purpose
                // If pdf is not available just pick any
                if (book.types[i].type === 'pdf' || !book.newTabUrl) {
                  book.newTabUrl = book.types[i].url;
                }
              }
              book.typesString = types.join('/');
            })
            this.$store.commit("setApisAppsBookshelfBooks", this.books);
            this.isLoading = false;
          })
          .catch(error => {
            this.$store.commit("setApisAppsBookshelfBooks", []);
            this.isLoading = false;
            console.log(error);
          });
    },
    clickBtnOpenInNewTab: function(url) {
      window.open(
          url,
          '_blank'
      );
    },
    clickBtnDownload: function(url, type, label) {
      Axios.get(url, { responseType: 'blob' })
          .then(response => {
            const mimetype = 'application/' + type;
            const blob = new Blob([response.data], { type: mimetype })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = label
            link.click()
            URL.revokeObjectURL(link.href)
          }).catch(console.error)
    },
    updateImageSource: function(item) {
      this.books.find((obj) => obj.name === item.name).cover = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAABPmlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGDiSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8rAxsAMFFRlUEtMLi5wDAjwAfIYYDQq+HaNgRFEX9YFmVW3qflIwJsNAr5GPbWVxeqPMdWjAK6U1OJkIP0HiBOSC4pKGBgYY4Bs5fKSAhC7AcgWKQI6CsieAmKnQ9grQOwkCHsPWE1IkDOQfQHIFkjOSEwBsh8A2TpJSOLpSGyovSDA5mpkYmJIwKGkgpLUihIQ7ZxfUFmUmZ5RouAIDJ1UBc+8ZD0dBSMDI6CFoLCGqP58AxyGjGIcCLGU5wwM5hJAwXMIsdxYBoadeQwMfCcRYiqTGBj4qxgYDk0rSCxKhDuA8RtLcZqxEYTNvZ2BgXXa//+fwxkY2DUZGP5e////9/b///8uY2BgvsXAcOAbAKxcXkbJx+zYAAAAVmVYSWZNTQAqAAAACAABh2kABAAAAAEAAAAaAAAAAAADkoYABwAAABIAAABEoAIABAAAAAEAAAADoAMABAAAAAEAAAACAAAAAEFTQ0lJAAAAU2NyZWVuc2hvdB/EfxYAAAHSaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA2LjAuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjI8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MzwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlVzZXJDb21tZW50PlNjcmVlbnNob3Q8L2V4aWY6VXNlckNvbW1lbnQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgrvNZXfAAAAEklEQVQIHWP8DwQMUMAEY4BoAF3wBADWYEaGAAAAAElFTkSuQmCC';
      this.books = [...this.books]; // We need to copy it for vue to detect changes in the data
    }
  },
  mounted: function() {
    this.isLoading = true;
    if (this.getBooks.length > 0) {
      this.books = this.getBooks;
    }

    setTimeout(() => {
      this.fetchBookData();
    }, 1500);
  },
  computed: {
    ...mapGetters({
      getBooks: 'getApisAppsBookshelfBooks',
    })
  },
});
</script>

<style scoped>
</style>
