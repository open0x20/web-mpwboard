# Multi Purpose Web Board
A frontend for small APIs.

![View of a custom app page](/docs/example-view.png)

The multi purpose web board (short mpwb) is a JS frontend developed with VueJS.
It is mainly used by the open0x20 community to provide user interfaces for
specific applications.

Applications with their own user interface can be integrated by the use of iframes.
## Applications
A list of all currently integrated applications:
- ATAC, Anything to audio converter (api-atac)
- NAS-Browser, MSDOS like file browser (web-nas-browser)
- DNSmasq-Configurator, tool to manage DNS records (api-dnsmasq-dynconf)

## Development
1. Install nodejs for the platform of your choice. For RaspberryPi binaries visit nodesource.
    ```
    # Debian
    apt install node
    
    # Specific version, replace x with version (e.g. 14.5 or 14.x)
    curl -sL https://deb.nodesource.com/setup_x | sudo bash -
    ```
2. Install the VueJS CLI tool.
    ```
    npm install -g @vue/cli
   ```
3. Move into the directory and start the vue project manager. Navigate to "Tasks" and click on "Serve".
   A development server with hot reloading should spin up any second.
    ```
    cd web-mpwboard/
    vue ui
   ```

### Secrets 
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

### How do I create a custom app page?
Well walk trough an example, an application called "bookshelf" to manage ebooks.
1. You start by adding the title, icon and future URL location to `src/App.vue`.
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

### What views can I use for my page?
To quickly put something into a container you can use a view called `Sheet`. You can put
anything into sheets... even more sheets!

![View of the example page](/docs/example-view-2.png)

All you need is a single import statement and a reference in the vue component attribute.
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
   
   export default Vue.extend({
      components: { Sheet }
   });
  
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
For more insights look up the examples view in `src/views/Examples.vue`.

### Tips & Tricks
* If you have trouble integrating your application within an iframe, don't forget the CORS
policies and add an `Access-Control-Allow-Origin` header.
* If you also have to deal with preflight CORS (OPTIONS) requests you better know how to use nginx.  

## Deployment
If you want to deploy a feature branch you need to change the deplyoment directory
specified in `Jenkinsfile` (attrib: "remoteDirectory").

```
Branch                      | Resulting name of directory
----------------------------+-----------------------------------------
master                      | web-mpwboard
development                 | web-mpwboard--development
feature/nameoffeature       | web-mpwboard--feature-nameoffeature
feature/anotherfeaturename  | web-mpwboard--feature-anotherfeaturename
```
