/*
 * @Description:
 * @Author: FF-Stone
 * @Date: 2021-03-29 16:56:47
 * @LastEditTime: 2021-03-29 16:56:47
 * @LastEditors: FF-Stone
 */
export default function mouseScrollListen(
    callback: (dir: "" | "up" | "down") => void
): {
    destroy: () => void;
} {
    const scrollFunc = function (ev) {
        const mouseEvent = ev || window.event;
        let dir: "" | "up" | "down" = "";
        if (mouseEvent.wheelDelta) {
            if (mouseEvent.wheelDelta > 0) {
                dir = "up";
            }
            if (mouseEvent.wheelDelta < 0) {
                dir = "down";
            }
        } else if (mouseEvent.detail) {
            if (mouseEvent.detail < 0) {
                dir = "up";
            }
            if (mouseEvent.detail > 0) {
                dir = "down";
            }
        }
        callback(dir);
    };
    // 给页面绑定鼠标滚轮事件,针对火狐的非标准事件
    window.addEventListener("DOMMouseScroll", scrollFunc); // 给页面绑定鼠标滚轮事件，针对Google，mousewheel非标准事件已被弃用，请使用 wheel事件代替
    window.addEventListener("wheel", scrollFunc); // ie不支持wheel事件，若一定要兼容，可使用mousewheel
    window.addEventListener("mousewheel", scrollFunc);
    return {
        destroy: () => {
            window.removeEventListener("DOMMouseScroll", scrollFunc);
            window.removeEventListener("wheel", scrollFunc);
            window.removeEventListener("mousewheel", scrollFunc);
        },
    };
}
