import getRanNum from "../utils/getRanNum"
import delay from "../utils/delay"
class Code {
    code = null
    timer = null
    timeRemaining = null//剩余时间
    bindEvent({ onTimeRemainingChange = () => { }, onTimeRemainingEnd = () => { } }) {
        this.onTimeRemainingChange = onTimeRemainingChange;
        this.onTimeRemainingEnd = onTimeRemainingEnd;
    }
    async updateCode(time = 3) {
        //time单位秒，多久更新

        if (this.getCode() !== null) {
            return;
        }
        await delay(1000);
        this.setTimeRemaining(time)
        this.setCode("" + getRanNum(1000, 9999));
        this.timer = setInterval(() => {
            let nextTime = this.getTimeRemaining() - 1;
            if (nextTime === 0) {
                clearInterval(this.timer);
                this.timer = null;
                this.clearCode();
                this.onTimeRemainingEnd();
                return;
            }
            this.setTimeRemaining(nextTime);
            this.onTimeRemainingChange(nextTime);
        }, 1000);
        return this.getCode()
    }
    setCode(value) {
        this.code = value;
    }
    getCode() {
        return this.code;
    }
    clearCode() {
        this.setCode(null);
    }
    getTimeRemaining() {
        return this.timeRemaining;
    }
    setTimeRemaining(value) {
        this.timeRemaining = value;
    }
};

export default new Code();


