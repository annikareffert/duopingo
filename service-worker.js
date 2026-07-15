const CACHE_NAME = "duopingo-v1";


const DATEIEN = [

    "./",

    "./index.html",

    "./styles.css",

    "./script.js",

    "./manifest.json",

    "./icon.svg",

];



/*
================================
 Installation
================================
*/

self.addEventListener(
    "install",
    event => {


        event.waitUntil(

            caches.open(CACHE_NAME)

            .then(cache => {

                return cache.addAll(DATEIEN);

            })

        );


    }

);




/*
================================
 Aktivierung
================================
*/

self.addEventListener(
    "activate",
    event => {


        event.waitUntil(

            caches.keys()

            .then(cacheNames => {


                return Promise.all(

                    cacheNames.map(name => {


                        if(
                            name !== CACHE_NAME
                        ){

                            return caches.delete(name);

                        }


                    })

                );


            })

        );


    }

);





/*
================================
 Dateien laden
================================
*/

self.addEventListener(
    "fetch",
    event => {


        event.respondWith(


            caches.match(event.request)

            .then(response => {


                // Datei aus Cache verwenden

                if(response){

                    return response;

                }



                // sonst aus Internet laden

                return fetch(event.request);


            })


        );


    }

);