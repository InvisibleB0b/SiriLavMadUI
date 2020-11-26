import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"


interface IRecipe {
    "recipeId": number,
    "recipeTitle": string,
    "LastMade": Date
}

const baseUrl: string = "http://localhost:55980/";


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
        'one-recepi': oneRecepiFromHistory
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



new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        history: [],
        selectedRecipe: {},
        showRecipe: false

    },
    components: {
        'history-of-recepies': RecepiInHistoryComponent,
        'one-recepi': oneRecepiFromHistory
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
            console.log(id);

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




