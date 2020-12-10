import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"


interface IRecipe {
    "id": number,
    "title": string,
    "ectendedIngridients": Array<object>
}

const baseUrl: string = "http://localhost:55980/";

//start recipe history
let oneRecepiFromHistory = {
    template: '#one-recipe-in-history-template',
    props: {
        id: {
            required: true
        },
        title: {
            required: true
        }
    },
    methods: {

        getRecipeId(id: number) {

            this.$parent.getId(id);

        }

    }
}

let RecepiInHistoryComponent = {
    template: '#recipe-history-template',
    components: {
        'one-recepi-in-history': oneRecepiFromHistory
    },
    props: {
        recepies: {
            type: Array,
            required: true
        }
    },
    methods: {

        getId(id: number) {

            this.$parent.visId(id);

        }

    }
}

//end recipe history

let searchResultComponent = {
    template: '#searchresult-template',
    components: {
        "one-recepi-in-search" : oneRecepiFromHistory
    },
    data: function(){
        return{
            search: "",
            
            
        }

    },
    methods: {
        async searchRecipe (search: string) {
            
            /* Skal bruge hjælp fra theo angående "facelift" - skal kunne fjerne alt indhold på siden og kun vise den valgt opskrift */

            /* this. */
            
            this.$parent.selectedView = 'search-result';
            try {
                
                let response: AxiosResponse = await axios.get<IRecipe>(baseUrl + `recipe/search/${search}`);

                this.$parent.results = response.data;
                
                this.search = "";
                console.log(response);

                console.log(this.results);
                
                

            }

            catch (error: AxiosError) {
                console.log(error);
            }
        
            
        }
}
}
let recipeResultComponent = {
        template: '#recipeResult-template',
        props: {
            
            recipe: {
                type: Object,
                required: true
            }
        },
        methods: {
    
            postRecipe: function(postBody: object){
                axios.post(baseUrl + "recipe/",postBody)
                  .then((response: AxiosResponse)=>{
                      console.log(response);
                  })
                  .catch((error:AxiosError)=>{
                      alert(error.message)
                  })
                  
                  
              }
    
        },
    }







//start show one recipe template


let oneIngridientComponent = {
    template: '#one-ingridient-template',
    props: {
        ingridient: {
            type: Object,
            required: true
        }
    }
}

let showOneRecipeComponent = {
    template: '#show-one-recipe-template',
    components: {
        'one-ingredient': oneIngridientComponent
    },
    props: {
        recipe: {
            type: Object,
            required: true
        }
    },
    methods: {
        makeShoppingList: function (ingridientList: Array<object>) {

            this.$parent.listOfItemsToBuy = ingridientList;

            this.$parent.selectedView = 'shoppingList';
        }
    }
}


//end show one recipe template

//Start Shoppinglist components


let entireShoppingListComponent = {
    template: '#shopping-list-template',
    components: {
        'specific-ingridient': oneIngridientComponent
    },
    data: function () {
        return {
            itemsBought: []
        }

    },
    props: {
        ingridientstobuy: {
            type: Array,
            required: true
        }
    },
    methods: {
        updateShopping: function (ingridientBought: object) {


            if (this.itemsBought[0] == undefined) {
                this.itemsBought = [ingridientBought]
            } else {
                this.itemsBought.push(ingridientBought);
            }

            let indexOfIng: number = this.ingridientstobuy.indexOf(ingridientBought);

            this.ingridientstobuy.splice(indexOfIng, 1)


        },
        removeFromShopping: function (ingridientBought: object) {


            if (this.ingridientstobuy[0] == undefined) {
                this.ingridientstobuy = [ingridientBought]
            } else {
                this.ingridientstobuy.push(ingridientBought);
            }

            let indexOfIng: number = this.itemsBought.indexOf(ingridientBought);

            this.itemsBought.splice(indexOfIng, 1)


        }
    }
}



//Slut shoppinglist components



//start vue app
new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        history: [],
        selectedRecipe: {},
        showRecipe: false,
        listOfItemsToBuy: [],
        listOfItemsBought: [],

        selectedView: "history",
        search: "",
        results:[]


    },
    components: {
        'history-of-recepies': RecepiInHistoryComponent,
        'one-selected-recipe': showOneRecipeComponent,

        'shopping-list': entireShoppingListComponent,
        'search-result': searchResultComponent,
        'recipe-result': recipeResultComponent
    },

    mounted: async function () {
        try {

            let response: AxiosResponse = await axios.get<IRecipe[]>(baseUrl + "recipe/history");

            this.history = response.data;
        }
        catch (error: AxiosError) {
            console.log(error);
        }
    },


    methods: {

        async visId(id: number) {

            this.showRecipe = true;


            try {


                let response: AxiosResponse = await axios.get<IRecipe>(baseUrl + `recipe/getspecific/${id}`);

                this.selectedRecipe = response.data;


            }
            catch (error: AxiosError) {
                console.log(error);
            }


        },

        handleShopping: function (ingredient: object) {

            console.log(ingredient);
            // let indexet: number;

            // console.log(this.$parent.listOfItemsToBuy);

            // for (let index = 0; index < this.$parent.listOfItemsToBuy.length; index++) {

            //     if (this.$parent.listOfItemsToBuy[index].name == ingridientBought.name) indexet = index;



            // }


            // this.$parent.listOfItemsToBuy.splice(indexet);

            // this.$parent.listOfItemsBought.push(ingridientBought);
        },
        postRecipe: function(postBody: object){
            axios.post(baseUrl + "recipe/",postBody)
              .then((response: AxiosResponse)=>{
                  console.log(response);
              })
              .catch((error:AxiosError)=>{
                  alert(error.message)
              })
              window.location.reload()
          },
          async searchRecipe (search: string) {
            
            /* Skal bruge hjælp fra theo angående "facelift" - skal kunne fjerne alt indhold på siden og kun vise den valgt opskrift */

            /* this. */

            try {
                
                let response: AxiosResponse = await axios.get<IRecipe>(baseUrl + `recipe/search/${search}`);

                this.results = response.data;
                
                this.search = "";
                console.log(response);

                console.log(this.results);

                this.selectedView = "search-result";

            }

            catch (error: AxiosError) {
                console.log(error);
            }
        
            
        },

        Myrecipeview: function(){
            this.selectedView = "history";

        },

        Homefunction: function(){
            window.location.reload();
        },

        

    },

    }



//end vue app