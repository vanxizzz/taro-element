import QQMapWX from "./qqmap-wx-jssdk"

const myMapKey =  "3XCBZ-UWOKS-XWUOX-6J6NO-5TM27-ZVF22";

const mapAPI = new QQMapWX({
    key: myMapKey
});
export default mapAPI

export const reverseGeocoder = async (obj) => {
    const res = await new Promise((resolve) => {
        mapAPI.reverseGeocoder({
            ...obj,
            success(res) {
                resolve(res);
            }
        })
    })
    return res;

}