import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Button, Block, Form } from '@tarojs/components'
import './index.scss'
import { AtInput, AtList, AtListItem, AtForm, AtSwitch, AtButton, AtModal } from "taro-ui"
import MyIcon from "../../components/common/MyIcon"
import { selectUserAddressById } from "../../apis/front/address"
import { connect } from "@tarojs/redux"
import MyForm from "../../components/common/MyForm"
import delay from "@/utils/delay"
import getLastPage from '../../utils/getLastPage'
import LoadingWrapper from "../../components/common/LoadingWrapper"
import MyNavBar from "@/components/common/MyNavBar"
import getParams from "@/utils/getParams"
class index extends Component {
    static defaultProps = {
        address: []
    }
    config = {
        navigationBarTitleText: '收获地址编辑',
        navigationBarBackgroundColor: "#02B6FD",
        navigationStyle: "custom"
    }
    constructor(props) {
        super(props);
        this.state = {
            myFormData: [
                ...this.getMyFormData(),
            ],
            modal: {
                isOpened: false,
                content: ""
            }
        }
    }
    getMyFormData() {
        this.id = this.$router.params.id;
        this.type = this.$router.params.type;//update或create
        this.curAddress = null;
        if (this.type === "update") {
            this.curAddress = {
                ...this.props.address.find(item => +item.id === +this.id)
            };
        }
        return this.getInitFormData(this.curAddress);
    }
    getInitFormData(address) {
        if (!address) {
            return this.createInitFormData();
        }
        const { province, city, county, detailAddress, name, sex, phone, tag, isDefault } = address;
        return [
            {
                keyName: "name",
                label: "姓名",
                type: "input",
                inputInfo: {
                    placeholder: "收货人姓名",
                    defaultValue: name
                }
            },
            {
                keyName: "sex",
                label: "",
                type: "radio",
                tagInfo: [
                    {
                        text: "先生",
                        value: 1,
                        isChecked: true
                    },
                    {
                        text: "女士",
                        value: 0,

                    },
                ].map(item => {
                    if (item.value === sex) {
                        return { ...item, isChecked: true }
                    }
                    return { ...item, isChecked: false }
                })
            },
            {
                keyName: "phone",
                label: "电话",
                type: "input",
                inputInfo: {
                    placeholder: "收货人手机",
                    defaultValue: phone
                }
            },
            {
                keyName: "address",
                type: "picker",
                pickerInfo: {
                    mode: "region",
                    defaultValue: {
                        province,
                        city,
                        county
                    }
                },
                label: "省市区",
                rightIcon: {
                    value: "rightArrowIcon",
                    color: "#999"
                }
            },
            {
                keyName: "detailAddress",
                label: "详细地址",
                type: "input",
                inputInfo: {
                    placeholder: "街道门牌、楼层房间号等信息",
                    defaultValue: detailAddress
                }
            },
            {
                keyName: "tag",
                label: "",
                type: "radio",
                tagInfo: [
                    {
                        text: "家",
                        value: "home",
                        isChecked: true
                    },
                    {
                        text: "公司",
                        value: "company",
                    },
                    {
                        text: "学校",
                        value: "school",
                    },
                ].map(item => {
                    if (item.value === tag) {
                        return { ...item, isChecked: true }
                    }
                    return { ...item, isChecked: false }
                })
            },
            {
                keyName: "isDefault",
                type: "switch",
                label: "是否默认地址",
                switchInfo: {
                    defaultValue: isDefault
                }
            },
            {
                keyName: "saveBtn",
                type: "btn",
                btnInfo: {
                    text: "保存",
                    style: {
                        backgroundColor: "#02B6FD",
                        color: "#fff"
                    },
                    onClick: (state) => {
                        this.handleSaveBtn(state);
                        // this.onSave(state);
                    },
                },
            },
            {
                keyName: "deleteBtn",
                type: "btn",
                btnInfo: {
                    text: "删除",
                    style: {
                        backgroundColor: "#f40",
                        color: "#fff"
                    },
                    onClick: (state) => {
                        this.handleDeleteBtn(this.$router.params.id, state);
                        // this.onDelete(this.$router.params.id)
                    }
                },
            },
        ]
    }
    createInitFormData() {
        return [
            {
                keyName: "name",
                label: "姓名",
                type: "input",
                inputInfo: {
                    placeholder: "收货人姓名",
                    // defaultValue: "默认值"
                }
            },
            {
                keyName: "sex",
                label: "",
                type: "radio",
                tagInfo: [
                    {
                        text: "先生",
                        value: 1,
                        isChecked: true
                    },
                    {
                        text: "女士",
                        value: 0,
                    },
                ]
            },
            {
                keyName: "phone",
                label: "电话",
                type: "input",
                inputInfo: {
                    placeholder: "收货人手机",
                    // defaultValue: "默认值"
                }
            },
            {
                keyName: "address",
                type: "picker",
                pickerInfo: {
                    mode: "region",
                    // defaultValue: {
                    //     province: "广东省",
                    //     city: "深圳市",
                    //     county: "宝安区"
                    // }
                },
                label: "省市区",
                rightIcon: {
                    value: "rightArrowIcon",
                    color: "#999"
                }
            },
            {
                keyName: "detailAddress",
                label: "详细地址",
                type: "input",
                inputInfo: {
                    placeholder: "街道门牌、楼层房间号等信息",
                    // defaultValue: "默认值"
                }
            },
            {
                keyName: "tag",
                label: "",
                type: "radio",
                tagInfo: [
                    {
                        text: "家",
                        value: "home",
                        isChecked: true
                    },
                    {
                        text: "公司",
                        value: "company",
                    },
                    {
                        text: "学校",
                        value: "school",
                    },
                ]
            },
            {
                keyName: "isDefault",
                type: "switch",
                label: "是否默认地址",
                switchInfo: {
                    defaultValue: true
                }
            },
            {
                keyName: "saveBtn",
                type: "btn",
                btnInfo: {
                    text: "保存",
                    style: {
                        backgroundColor: "#02B6FD",
                        color: "#fff"
                    },
                    onClick: (state) => {
                        this.handleSaveBtn(state);
                        // this.onSave(state);
                    },
                },
            }
        ]
    }
    onSave({ address, ...state }) {
        const type = this.type ? this.type : "create";
        let info = {};
        if (type === "create") {
            info = {
                ...state,
                ...address,
                userId: this.props.userId,
            }
        } else {
            info = {
                ...this.curAddress,
                ...state,
                ...address
            }
        }
        this.props.setAddress({
            type,
            info,
            redirectUrl: "/pages/address/index"
        })
    }
    onDelete(id) {
        this.props.setAddress({
            type: "delete",
            info: id,
            redirectUrl: "/pages/address/index"
        })
    }
    async handleSaveBtn(state) {
        const { confirm } = await Taro.showModal({
            content: "确定保存？",
        });
        if (confirm) {
            this.onSave(state);
        }
    }
    async handleDeleteBtn(id, state) {
        const { confirm } = await Taro.showModal({
            content: "确定删除？",
        });
        if (confirm) {
            this.onDelete(id);
        }
    }
    handleCancel() {

    }
    handleConfirm() {

    }
    render() {
        return (
            <View>
                <MyNavBar title={this.config.navigationBarTitleText} bgColor={this.config.navigationBarBackgroundColor} />
                <View style={{ paddingTop: getParams.topBarHeight + "rpx" }}>
                    <LoadingWrapper
                        renderChildren={() => {
                            return (
                                <View className="editAddress" >
                                    {/* <AtModal
                                isOpened={this.state.modal.isOpened}
                                cancelText='取消'
                                confirmText='确认'
                                onClose={this.handleCancel}
                                onCancel={this.handleCancel}
                                onConfirm={this.handleConfirm}
                                content={this.state.modal.content}
                            /> */}
                                    <MyForm data={this.state.myFormData} />
                                </View>
                            )
                        }}
                    />
                </View>

            </View>


        );
    }
}
let mapStateToProps = (state, ownProps) => ({
    address: state.user.address,
    userId: state.user.id
});
let mapDispatchToProps = (dispatch, ownProps) => ({
    setAddress({ type, info, redirectUrl }) {
        dispatch({ type: "user/asyncSetAddress", payload: { type, info, redirectUrl } })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
