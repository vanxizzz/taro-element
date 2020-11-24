const obj = {
    ratio: 2,
    capsuleTop:0,
    capsuleHeight:0,
    capsuleBottom:0,
    statusBarHeight: 20,
    height: 1000,
    topBarHeight: 150//myNavBar的高度，单位rpx
};
/* 下边的方法在app.js会进行初始化 */
export default obj;
export const changeRatio = (val)=>{
    obj.ratio = val;
}
export const changeCapsuleTop = (val)=>{
    obj.capsuleTop = val;
}
export const changeCapsuleBottom = (val)=>{
    obj.capsuleBottom = val;
}
export const changeCapsuleHeight = (val)=>{
    obj.capsuleHeight = val;
}
export const changeStatusBarHeight = (val)=>{
    obj.statusBarHeight = val;
}
export const changeHeight = (val)=>{
    obj.height = val;
}
export const changeTopBarHeight = (val)=>{
    obj.topBarHeight = val;
}