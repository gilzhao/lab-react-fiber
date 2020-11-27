### fiber data structure

#### stack reconciler

![stack reconciler](https://user-gold-cdn.xitu.io/2019/2/23/1691a90e9b42dddc?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

./recursion/index.js

#### fiber reconciler

![fiber reconciler](https://user-gold-cdn.xitu.io/2019/2/23/1691a90e81d44b8a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

./linked-list/index.js

1. 父节点到子节点(红色虚线)
2. 同层节点(黄色虚线)
3. 子节点到父节点(蓝色虚线)

> 父节点指向第一个子节点, 每个子节点都指向父节点，同层节点间是单向链表。

#### React 中的 work loop

```javascript
function workLoop(isYieldy) {
    if (!isYieldy) {
        // Flush work without yielding
        while (nextUnitOfWork !== null) {
            nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }
    } else {
        // Flush asynchronous work until the deadline runs out of time.
        while (nextUnitOfWork !== null && !shouldYield()) {
            nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }
    }
}
```
