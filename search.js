const scriptSearch = require("search-keywords");
 
//配置不需要传keywords，内部会根据命令行参数取到keywords
const config = {
    excludeKeywords: ["node_modules", "LICENSE", "dist"],
}
 
//不传配置则使用默认配置
scriptSearch(config);