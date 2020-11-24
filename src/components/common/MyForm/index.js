import{ Component } from '@tarojs/taro'
import { View, Button ,Input, Switch, Picker} from '@tarojs/components'
import './index.scss'
// import { AtInput } from "taro-ui"
import MyIcon from "../MyIcon"
import MyTagGroup from "../MyTagGroup"
import delay from "@/utils/delay"
// import 
class index extends Component {
    /* 
        data里每一项的格式
        {
            keyName: "phone" //一定要传的
            type: input switch radio checkbox btn picker
            label: 姓名 //type是phone时可以不传
            inputInfo: {
                placeholder: "请输入"
                defaultValue: "默认值"
            }
            pickInfo: {
                mode: ""参考picker的mode
                defaultValue: {
                    如果是mode = region,
                    province:"xx",
                    city: "xx",
                    county: "xx"
                }
            }
            switchInfo: {
                defaultValue: true
            }
            rightIcon: {格式参考AtIcon}, 
            
            btnInfo: {
                style: 样式,
                text: 按钮文字,
                onClick(state){

                }
            }
            tagInfo: [] type是radio或checkbox时有效，里边每一项可以参考MyTagGroup
        }
    */

    static defaultProps = {
        data: [],
    }
    state = {
        infoObj: {}
    }
    type = {
        INPUT: "input",
        SWITCH: "switch",
        RADIO: "radio",
        CHECKBOX: "checkbox",
        BTN: "btn",
        PICKER: "picker"
    }
    constructor(props) {
        super(props);
        const obj = this.getDefaultInfoObj();
        this.state.infoObj = { ...obj };
    }
    getDefaultInfoObj() {
        let obj = {};
        const { INPUT, SWITCH, RADIO, CHECKBOX, BTN, PICKER } = this.type;
        this.props.data.forEach(({ type, keyName, label, inputInfo, switchInfo, rightIcon, btnInfo, tagInfo, pickerInfo: { mode, defaultValue } = {} }) => {
            console.log("mode", mode)
            if (type === INPUT) {
                obj[keyName] = inputInfo.defaultValue ? inputInfo.defaultValue : "";
                console.log("测试2222222222222222")
                console.log(keyName, obj[keyName])
            } else if (type === SWITCH) {
                obj[keyName] = switchInfo.defaultValue ? true : false
            } else if (type === RADIO || type === CHECKBOX) {
                console.log("测试")
                let checkArr = [];
                tagInfo.forEach((item, i) => {
                    if (item.isChecked) {
                        checkArr.push(item.value);
                    }
                })
                if (type === RADIO) {
                    checkArr = checkArr[0]
                }
                obj[keyName] = checkArr;
            } else if (type === PICKER) {
                if (mode === "region") {
                    if (!defaultValue) {
                        obj[keyName] = {
                            province: "",
                            city: "",
                            county: ""
                        }
                    } else {
                        obj[keyName] = {
                            province: defaultValue.province,
                            city: defaultValue.city,
                            county: defaultValue.county
                        };
                    }
                }
            }
        })
        return obj;
    }
    handleInput(keyName, e) {
        console.log(keyName)
        console.log("测222试");
        this.changeInfo({ prop: keyName, value: e.detail.value })
    }
    getPickerInputValue(keyName) {
        const { province, county, city } = this.state.infoObj[keyName];
        if (province === "") {
            return "";
        }
        // this.state.infoObj[keyName].province ? this.state.infoObj[keyName].province : "省"} - ${this.state.infoObj[keyName].city ? this.state.infoObj[keyName].city : "市"} - ${this.state.infoObj[keyName].county ? this.state.infoObj[keyName].county : "区"
        return `${province} - ${city} - ${county}`;
    }
    async btnClick(keyName) {

        await delay(10);
        const { onClick } = this.props.data.find(item => item.keyName === keyName).btnInfo
        onClick && onClick(this.state.infoObj);
    }
    getComp({ type, keyName, label, inputInfo, switchInfo, rightIcon, btnInfo, tagInfo, pickerInfo: { mode, defaultValue } = {} }) {
        const { INPUT, SWITCH, RADIO, CHECKBOX, BTN, PICKER } = this.type;
        if (type === BTN) {
            return (
                <Button onClick={this.btnClick.bind(this, keyName)} className="btn" style={btnInfo.style}>{btnInfo.text}</Button>
            )
        } else if (type === INPUT) {
            return (
                <Input
                    className={`input ${keyName}`}
                    placeholder={inputInfo.placeholder}
                    value={this.state.infoObj[keyName]}
                    onChange={this.handleInput.bind(this, keyName)}
                />
            )
        } else if (type === SWITCH) {
            return (
                <Switch checked={switchInfo.defaultValue} onChange={({ detail: { value } }) => {

                    this.changeInfo({ prop: keyName, value })
                }} />
            )
        } else if (type === RADIO || type === CHECKBOX) {
            return (
                <MyTagGroup mode={type} data={tagInfo} onClick={({ cur }) => {
                    let value;
                    if (type === RADIO) {
                        this.changeInfo({ prop: keyName, value: tagInfo[cur].value });
                    } else if (type === CHECKBOX) {
                        this.changeInfo({ prop: keyName, value: cur.map(index => tagInfo[index].value) });
                    }
                }} />
            )
        } else if (type === PICKER) {
            // console.log("!!!!!!!!!###########")
            // console.log(this.state.infoObj)
            // const { province, city, county } = this.state.infoObj[keyName];
            return (
                <Picker mode={mode} onChange={({ detail: { value } }) => {
                    console.log(value)
                    this.changeInfo({ prop: keyName, mode: mode, value })
                }}>
                    <Input
                        placeholder="请输入省市区"
                        disabled
                        value={this.getPickerInputValue.call(this, keyName)}
                    />
                </Picker>
            )
        }
    }
    onChangeRegion(res) {
        this.changeInfo({ prop: "address" })
    }
    changeInfo({ prop, value, mode }) {
        if (mode === "region") {
            /* 针对picker region */
            this.setState(prevState => {
                return {
                    ...prevState,
                    infoObj: {
                        ...prevState.infoObj,
                        [prop]: {
                            province: value[0],
                            city: value[1],
                            county: value[2],
                        }
                    }
                }
            })
            return;
        }
        this.setState(prevState => {
            return {
                ...prevState,
                infoObj: {
                    ...prevState.infoObj,
                    [prop]: value
                }
            }
        })
    }
    render() {
        return (
            <View className="myForm">
                {this.props.data.map((item, i) => {
                    return (
                        <View
                            className={`${item.type === this.type.BTN ? "btnWrapper" : "item"}`}
                            key={item.keyName}
                        >
                            {
                                item.type !== this.type.BTN && <View className="label">{item.label}</View>
                            }
                            {
                                <View className="content">
                                    {this.getComp({ ...item })}
                                </View>
                            }
                            {item.rightIcon && <MyIcon {...item.rightIcon} />}
                        </View>
                    )
                })}
                {/* <View className="item">
                    <View className="label">姓名</View>
                    <View className="content">
                        <Input
                            className="input"
                            placeholder='收货人姓名'
                        />
                    </View>
                    <MyIcon value="addIcon" size={30} />
                </View>
                <View className="item">
                    <View className="label"></View>
                    <View className="content">
                        <MyTagGroup mode="radio" data={[
                            { text: "先生", value: 1 },
                            { text: "女士", value: 0 },
                        ]} onClick={({ value: { value } }) => {
                            console.log(value)
                        }} />
                    </View>
                </View>
                <View className="item">
                    <View className="label">是否默认</View>
                    <View className="content">
                        <Switch checked />
                    </View>
                </View>
                <View className="item">
                    <View className="label">地区</View>
                    <View className="content">
                        <Picker style={{
                            width: "100%"
                        }} mode='region' range={this.state.selector} onChange={this.onChangeRegion}>
                            <Input
                                className="input"
                                placeholder='地区'
                                disabled
                            />
                        </Picker>
                    </View>
                    <MyIcon value="addIcon" size={30} />
                </View>
                <View className="btnWrapper">
                    <Button onClick={() => {
                        console.log("测试")
                    }} className="btn saveBtn">保存</Button>
                    <Button onClick={() => {
                        console.log("测试2")
                    }} className="btn deleteBtn">删除</Button>
                </View> */}

            </View>
        );
    }
}

export default index;