/*const env = process.env.NODE_ENV;


switch(env){
 case "development":{
     var url="https://uat-api.e-pex.com"
     break;
 }
 case "test":{
    var url="https://uat-api.e-pex.com"
    // var explorerUrl="https://uat-explorer.e-pex.com"
    break;
 }
 default:{
    var url="https://api.e-pex.com"
 }
}*/
// var url="http://192.168.18.6:8080";
var url="https://uat-api.e-pex.com";
// var url="https://api.e-pex.com";
export default ({
    baseUrl:`${url}`
});
