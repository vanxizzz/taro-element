import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MyGrid from "@/components/common/MyGrid"
import './index.scss'
import handleModule from "@/utils/handleModule"
class index extends Component {
    theNavData = [
        {
            id: 0,
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            value: '美食'
        },
        {
            id: 1,
            image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
            value: '商超便利'
        },
        {
            id: 2,
            image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
            value: '水果'
        },
        {
            id: 3,
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
            value: '夜宵'
        },
        {
            id: 4,
            image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
            value: '汉堡披萨'
        },
        {
            id: 5,
            image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
            value: '速食简餐'
        },
        {
            id: 6,
            image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
            value: '买菜'
        },
        {
            id: 7,
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
            value: '分享赚钱'
        },
        {
            id: 8,
            image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
            value: '炸鸡炸串'
        },
        {
            id: 9,
            image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
            value: '跑腿代购'
        }
    ]
    render() {
        return (
            <View className="mallNav">
                <MyGrid
                    hasBorder={true}
                    columnNum={5}
                    data={this.theNavData}
                    onClick={(item,i) => {
                        if(i===0){
                            Taro.redirectTo({
                                url: "/pages/meishi/index"
                            })
                        }else {
                            handleModule();
                        }
                    }}
                />
                {/* <AtGrid
                    hasBorder={false}
                    columnNum={5}
                    data={this.theNavData}
                    onClick={(...args) => {
                        console.log(args)
                    }}
                /> */}
            </View>
        );
    }
}

export default index;