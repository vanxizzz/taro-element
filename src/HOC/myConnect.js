import Taro, { Component } from '@tarojs/taro'
import store from "@/store"
// dispatch: ƒ (action)
// subscribe: ƒ subscribe(listener)
// getState: ƒ getState()
export default (mapStateToProps = () => ({}), mapDispatchToProps = () => ({})) => {
    return (Comp) => {
        class Temp extends Component {
            constructor(props) {
                super(props);
                this.listener = store.subscribe(() => {
                    this.setState(prevState => {
                        const theProps = mapStateToProps(store.getState(), ...props);
                        const theDispatches = mapDispatchToProps(store.dispatch, ...props);
                        return {
                            ...prevState,
                            connectProps: { ...theProps, ...theDispatches }
                        }
                    })
                })
                const theProps = mapStateToProps(store.getState(), ...props);
                const theDispatches = mapDispatchToProps(store.dispatch, ...props);
                this.state = {
                    connectProps: { ...theProps, ...theDispatches }
                }
            }
            componentWillUnmount() {
                this.listener();
            }
            render() {
                return (
                    <Comp {...this.state.connectProps} />
                )
            }
        }
        return Temp;
    }
}
