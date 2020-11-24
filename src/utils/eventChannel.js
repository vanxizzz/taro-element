

class EventChannel {
    constructor(value) {
        this.eventData = [
            // {
            //     eventName: "click",
            //     fns: []
            // }
        ];
    }
    on(eventName, fn) {
        if (!eventName || typeof fn !== "function") {
            throw "eventchannel错误"
        }

        let targetEventIndex = this.eventData.findIndex(item => item.eventName === eventName);
        if (targetEventIndex === -1) {
            /* 没绑定过该事件 */
            this.eventData.push({
                eventName,
                fns: [fn]
            })
        } else {
            this.eventData = this.eventData.map((item, i) => {
                if (i !== targetEventIndex) {
                    return item;
                }
                return {
                    ...item,
                    fns: [...item.fns, fn]
                }
            })
        }
    }
    /**
     * 
     * @param {*} eventName 
     * @param {*} arg 一个数组
     */
    emit(eventName, arg) {
        if (!Array.isArray(arg)) {
            arg = [arg];
        }
        let target = this.eventData.find(item => item.eventName === eventName);
        if (target) {
            for (let fn of target.fns) {
                fn(...arg);
            };
        }
    }
};
export default EventChannel;
// const eventchannel = new EventChannel();
// eventchannel.on("test", (...args) => {
//     console.log(args)
//     console.log("test111")
// })
// eventchannel.emit("test", [33,44,55])
// eventchannel.on("test", (...args) => {
//     console.log(args)
//     console.log("test222")
// })
// eventchannel.emit("test", [11, 22, 33])
// eventchannel.on("test",(...args)=>{
//     console.log(args)
//     console.log("test222")
// })