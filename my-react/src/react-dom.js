import $ from 'jquery';
import { createUnit } from './unit';

let ReactDOM = {
	render,
	rootIndex: 0,
};

// element 类型：文本节点、DOM节点、自定义组件
function render(element, container) {
	let unit = createUnit(element);
	let markUp = unit.getMarkUp(ReactDOM.rootIndex);
	$(container).html(markUp);
	$(document).trigger('mounted'); // dom 挂载到页面上后，触发 mounted 事件
}

export default ReactDOM;
