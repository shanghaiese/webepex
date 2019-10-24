import router from "./../router";
export default function dealMenu (data) {
    if(data.islink) {
        // 是跳转链接；
        router.push(data.index);
    }else{
        //切换用户
        console.log("切换用户");
    }
}