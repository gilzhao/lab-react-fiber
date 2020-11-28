import React from 'react';

class CSetState extends React.Component {
    state = { val: 0 };
    componentDidMount() {
        // 第一次调用
        this.setState({ val: this.state.val + 1 });
        console.log('first setState', this.state);

        // 第二次调用
        this.setState({ val: this.state.val + 1 });
        console.log('second setState', this.state);

        // 第三次调用: 只有在 setState 的回调函数内才能拿到最新的结果
        this.setState({ val: this.state.val + 1 }, () => {
            console.log('in callback', this.state);
        });

        // 脱离生命周期
        setTimeout(() => {
            // 第一次调用
            this.setState({ val: this.state.val + 1 });
            console.log('first setState', this.state);

            // 第二次调用
            this.setState({ val: this.state.val + 1 });
            console.log('second setState', this.state);
        });
    }
    render() {
        return <div> val: {this.state.val} </div>;
    }
}

export default CSetState;

/*

每次 setState 之后，立即获取 state 会发现并没有更新，只有在 setState 的回调函数内才能拿到最新的结果。
setState 是一次同步操作，只是每次操作之后并没有立即执行，而是将 setState 进行了缓存，mount 流程结束或事件操作结束，才会拿出所有的 state 进行一次计算。
setState 脱离了 React 的生命周期或者 React 提供的事件流，setState 之后就能立即拿到结果。比如放入 setTimeout 中


##### 旧版本 setState

*/
