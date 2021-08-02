/*
 * @Description: 获取页面滚动方向
 * @Author: FF-Stone
 * @Date: 2021-03-24 14:10:25
 * @LastEditTime: 2021-03-24 14:10:26
 * @LastEditors: FF-Stone
 */
const getScrollDir = (() => {
    const originScrollPos = { top: undefined, left: undefined };
    /**
     * 获取页面滚动方向
     *
     * @return {x, y} x: 1: 向左滚动 -1: 向右侧滚动
     *                y: 1: 向下滚动 -1: 向上滚动
     */
    return function getScrollDir(): { x: 0 | -1 | 1; y: 0 | -1 | 1 } {
        if (originScrollPos.top == undefined) {
            originScrollPos.top = window.pageYOffset;
        }
        if (originScrollPos.left == undefined) {
            originScrollPos.left = window.pageXOffset;
        }

        const diffX = window.pageXOffset - originScrollPos.left;
        const diffY = window.pageYOffset - originScrollPos.top;

        originScrollPos.top = window.pageYOffset;
        originScrollPos.left = window.pageXOffset;

        return {
            x: diffX == 0 ? 0 : diffX > 0 ? 1 : -1,
            y: diffY == 0 ? 0 : diffY > 0 ? 1 : -1,
        };
    };
})();
export default getScrollDir;
