import delay from "@/utils/delay"
import Taro from "@tarojs/taro"

export default async function ({ encryptedData, iv, code }) {
    // await delay(1000);
    const res = await Taro.request({
        url: "https://zyxin.top:3333/api/getPhone",
        data: {
            encryptedData,
            iv,
            code
        }
    });
    console.log("返回结果：")
    console.log(res)
    // return res;
    return {
        "phoneNumber": "13580006666",
        "purePhoneNumber": "13580006666",
        "countryCode": "86",
        "watermark":
        {
            "appid": "APPID",
            "timestamp": "TIMESTAMP"
        }
    }
}