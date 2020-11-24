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



new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        history: [],
        selectedRecipe: {}

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