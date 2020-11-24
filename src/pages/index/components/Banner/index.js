import  { Component } from '@tarojs/taro'
import { View,  Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'
class index extends Component {
    render() {
        return (
            <View className="banner">
                <Swiper
                    className='swiper'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    autoplay>
                    <SwiperItem>
                        <Image src="https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180" />

                    </SwiperItem>
                    <SwiperItem>
                        <Image src="https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180" />
                    </SwiperItem>
                </Swiper>
            </View>
        );
    }
}

export default index;