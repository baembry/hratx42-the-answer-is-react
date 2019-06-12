
const http = {
    getCategories: async function (callback){
        return await axios.get('http://jservice.io/api/categories?count=5' )
     }
}


export default http;