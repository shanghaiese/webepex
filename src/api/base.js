const env = process.env.NODE_ENV;


switch(env){
 case "development":{
     var url="/api"
     var explorerUrl="https://uat-explorer.e-pex.com"
     break;
 }
 case "test":{
    var url="https://uat-api.e-pex.com/greenland"
    var explorerUrl="https://uat-explorer.e-pex.com"
    break;
 }
 default:{
    var url="https://api.e-pex.com/greenland"
    var explorerUrl="https://explorer.e-pex.com"
 }
}
export default ({
    baseUrl:`${url}`,
    explorer:`${explorerUrl}`
});
