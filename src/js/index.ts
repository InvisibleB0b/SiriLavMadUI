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


let oneListInShoppingComponent = {
    template: '#specific-list-template',
    components: {
        'one-ingredient': oneIngridientComponent
    },
    props: {
        itemsinbuylist: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    methods: {

        itemIsBought: function (ingridientBought: object) {

            let indexet: number;

            console.log(this.$parent.listOfItemsToBuy);

            for (let index = 0; index < this.$parent.listOfItemsToBuy.length; index++) {

                if (this.$parent.listOfItemsToBuy[index].name == ingridientBought.name) indexet = index;



            }


            this.$parent.listOfItemsToBuy.splice(indexet);

            this.$parent.listOfItemsBought.push(ingridientBought);

        }

    }
}

let entireShoppingListComponent = {
    template: '#shopping-list-template',
    components: {
        'specific-list': oneListInShoppingComponent
    },
    props: {
        ingridientstobuy: {
            type: Array,
            required: true
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
        selectedView: "history"

    },
    components: {
        'history-of-recepies': RecepiInHistoryComponent,
        'one-selected-recipe': showOneRecipeComponent,
        'shopping-list': entireShoppingListComponent
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


        }

    }
})


//end vue app