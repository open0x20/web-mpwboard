# Multi Purpose Web Board
A platform for every small project out there with the need for a small GUI.

![View of a custom app page](/docs/example-view.png)

The multi purpose web board (short mpwb) is a JS frontend developed around VueJS. It has no
specific purpose other than enabling smaller applications to have a simple and fast way to create
a user interface.

Applications with their own user interface can be integrated by the use of iframes.

## How to setup for development
1. Install nodejs for the platform of your choice. For RaspberryPi binary visit nodesource.
    ```
    # Debian
    apt install node
    
    # RaspberryPi, replace x with version (e.g. 14.5 or 14.x)
    curl -sL https://deb.nodesource.com/setup_x | sudo bash -
    ```
2. Install the VueJS CLI tool. It is required.
    ```
    npm install -g @vue/cli
   ```
3. Move into the directory and start the vue project manager. Navigate to "Tasks" and click on "serve".
   A development server with hot reloading should spin up any second.
    ```
    # Start dev gui
    cd web-mpwdboard/
    vue ui
   ```

## Secrets 
If you want to inject secrets at build time simply contact any of the active developers or the
maintainer of the jenkins instance. Secrets will be injected into the `src/globals.ts` file and
accessed by static attributes like this:
```
# Import statement
import globals from "@/globals";

# Vue data object reference
data: () => ({
  Globals: globals,
})

# Accessed like this
this.Globals.API_URL__ATAC
```

## How do I create a custom app page?
Well walk trough an example, an application called "bookshelf" to manage ebooks.
1. You start by adding the title and future URL location the the `src/App.vue`
   ```
   customApps: [
      { title: "ATAC", icon: "mdi-download", route: "/apps/atac" },
      { title: "NAS-Browser", icon: "mdi-forum", route: "/apps/nas-browser" },
      { title: "Bookshelf", icon: "mdi-bookshelf", route: "/apps/bookshelf" },
   ]
   ```
2. Now you need to create a VueJS specific `.vue` file containing all your stuff.
It should reside within the `src/views/` directory. If its going to be more than
   one file you should consider creating another directory. Here is a template for
   our bookshelf example application:
   ```
   src/views/apps/Bookshelf/Bookshelf.vue
   
   <template>
      <div class="bookshelf">
       <v-container>
         <v-row
             align="center"
             justify="center"
             class="pl-4 pr-4"
         >
           <v-col cols="12">
             <h1 class="display-1">
               Bookshelf
             </h1>
             <v-divider />
             <p class="font-weight-light font-italic pt-2">
               Your favourite ebooks in one place!
             </p>
           </v-col>
      
           <!-- BookPreview -->
           <v-col cols="12">
      
           </v-col>
      
         </v-row>
       </v-container>
      </div>
      </template>
      
      <script lang="ts">
      import Vue from "vue";
      import Globals from "@/globals"; // required for urls/secrets
      import Axios from "axios";       // required for async api stuff
      
      export default Vue.extend({
         name: "Bookshelf",
         components: { },
         data: () => ({
            Globals: Globals
         }),
         methods: {},
         computed: {},
      });
      </script>

   ```
3. Finally we need to add our new app to the router. Add the following to the `routes`
   object in `src/router/index.ts`:
   ```
   {
      path: "/apps/bookshelf",
      name: "Bookshelf",
      component: Bookshelf
   }
   ```
   Also don't forget the import statement at the top!
   ```
   import Bookshelf from "@/views/apps/Bookshelf/Bookshelf.vue";
   ```
You are done! Now reload the page and enjoy your new custom app page!

## What views can I use for my page?
To quickly put something into containers you can use a view called `Sheet`. You can put
anything into sheets, even more sheets!

![View of the example page](/docs/example-view-2.png)

All you need is a single import statement!
```
<Sheet title="Sheet A">
  <v-container>
    <p class="font-weight-light">
      Lorem Ipsum dolor.
    </p>
  </v-container>
</Sheet>

<script lang="ts">
   import Sheet from "@/components/Sheet.vue";
</script>
```
DataTable within a sheet:
```
<Sheet title="Tables">
   <v-container>
      <p class="font-weight-light">
         Examples for different tables.
      </p>
      <v-data-table
         :headers="headers"
         :items="desserts"
         :sort-by="['calories', 'fat']"
         :sort-desc="[false, true]"
         multi-sort
         class="elevation-1"
      />
   </v-container>
</Sheet>
```
For more detailed code look up the examples view in `src/views/Examples.vue`.

## Tips & Tricks
* If you have trouble integrating your application within an iframe, don't forget the CORS
policies and add an `Access-Control-Allow-Origin` header.
