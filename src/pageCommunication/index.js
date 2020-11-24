// import EventChannel from "../utils/eventChannel";
import deepCompare from "../utils/deepCompare"
// const eventChannel = new EventChannel();

/**
 * 
 * @param {*} origin 
 */

class CommunicationModel {
    constructor() {
        this.communicationData = [
            // {
            //     origin: {
            //         path: "xxxx",// 基础路径
            //         params: {
            //             a: 5,
            //             b: 6
            //         }
            //     },
            //     info: {
            //         a: 5,
            //         b: 6
            //     },
            //     target: {
            //         path: "xxx",
            //         params: {
            //             a: 5,
            //             b: 6
            //         }

            //     }
            // }
        ];
        this.id = 0;
    }
    getNewId() {
        this.id++;
        return this.id;
    }
    createCommunication({ origin, target, info }) {
        const id = this.getNewId();
        this.communicationData = [...this.communicationData, { id, origin, target, info }];
        return id;
    }
    removeCommunicationByTargetUrl(targetUrl) {
        this.communicationData = this.communicationData.filter(item => item.target.path !== targetUrl);
    }
    getInfo(targetUrl) {
        // let resInfo = null;
        const target = this.communicationData.find(item => item.target.path === targetUrl);
        return target;
    }

}
const communication = new CommunicationModel();
// communication.createCommucation({
//     origin: {
//         path: "/pages/confirmOrder/index"
//     },
//     target: {
//         path: "/pages/address/index"
//     },
//     info: {
//         a: 5,
//         b: 6
//     }
// })
// console.log(commucation.getInfo("/pages/address/index"))


export default communication;
export function getInfo(...args) {
    return communication.getInfo(...args);
}
export function createCommunication(...args) {
    return communication.createCommunication(...args);
}
export function removeCommunicationByTargetUrl(...args) {
    return communication.removeCommunicationByTargetUrl(...args);
}


