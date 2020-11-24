import Taro from "@tarojs/taro"
import queryString from "@/utils/queryString"
export default () => {
    let pages = Taro.getCurrentPages();

    let curPage = pages[pages.length-1].route;
    // let lastPage = pages[pages.length - 2];
    let lastPage = null;
    for(let i = pages.length - 2; i >= 0; i--){
        if(pages[i].route !== curPage){
            lastPage = pages[i];
            break;
        }
    };
    if (!lastPage) {
        lastPage = "/pages/index/index"
    } else {
        // console.log("pagesssssssss");
        // console.log(pages);
        // lastPage = "/" + lastPage.route.replace(/^\//, "")
        lastPage = queryString(lastPage.$component.$router);
        console.log("lastPageeeeeeeeeeeee")
        console.log(lastPage)
        console.log(Taro.getCurrentPages())
        // console.log(queryString( "/" + lastPage.route.replace(/^\//, ""), pages))
    }
    return lastPage;
}