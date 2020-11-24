import axios,{
AxiosResponse,
AxiosError
} from "../../node_modules/axios/index"


interface IRecipe{
    "Id":number,
    "Title":string,
    "LastMade":Date



}

const baseUrl: string = "http://localhost:55980/";




new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        history: []

    },

    mounted: async function () {
        try{this.history = await (await axios.get<IRecipe[]>(baseUrl + "recipe/history")).data}
        catch (error:AxiosError){
        console.log(error);
        }
        
        console.log(this.history)
    },

    methods: {
        






    }
})