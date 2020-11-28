// 1. 调用 Component.setState
ReactComponent.prototype.setState = function (partialState) {
    this.updater.enqueueSetState(this, partialState);
};

// 2. 调用 ReactUpdateQueue.enqueueSetState，将 state 值放到 _pendingStateQueue 进行缓存
var ReactUpdateQueue = {
    enqueueSetState(component, partialState) {
        var queue = component._pendingStateQueue || (component._pendingStateQueue = []);
        queue.push(partialState);
        enqueueUpdate(component);
    },
};

// 3. 判断是否在更新过程中，如果不在就进行更新
var dirtyComponents = [];
function enqueueUpdate(component) {
    // 如果之前没有更新，此时的 isBatchingUpdates 肯定是 false
    if (!batchingStrategy.isBatchingUpdates) {
        // 调用 batchingStrategy.batchedUpdates 进行更新
        batchingStrategy.batchedUpdates(enqueueUpdate, component);
        return;
    }
    dirtyComponents.push(component);
}

// 4. 进行更新，更新逻辑放入事务中进行处理
var batchingStrategy = {
    isBatchingUpdates: false,
    // 注意：此时的 callback 为 enqueueUpdate
    batchedUpdates: function (callback, component) {
        var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
        ReactDefaultBatchingStrategy.isBatchingUpdates = true;
        if (alreadyBatchingUpdates) {
            // 如果已经在更新状态中，重新调用 enqueueUpdate，将 component 放入 dirtyComponents
            return callback(callback, component);
        } else {
            // 进行事务操作
            return transaction.perform(callback, null, component);
        }
    },
};
