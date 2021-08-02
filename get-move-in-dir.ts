/*
 * @Description: 获取移入元素时移入方向
 * @Author: FF-Stone
 * @Date: 2021-04-28 13:22:37
 * @LastEditTime: 2021-04-28 13:22:37
 * @LastEditors: FF-Stone
 */

interface TYPE_POS {
    x: number;
    y: number;
}
interface TYPE_CENTER_POS {
    centerX: number;
    centerY: number;
}
type TYPE_DIR = "t" | "r" | "b" | "l";
export function calcAngle(
    { x, y }: TYPE_POS,
    { centerX, centerY }: TYPE_CENTER_POS
): number {
    return (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI + 180;
}
export function getMoveInDir(
    ev: PointerEvent,
    dom: HTMLElement
): "t" | "r" | "b" | "l" | "" {
    const { pageX, pageY } = ev;
    const rect = dom.getBoundingClientRect();
    const offsetLeft = dom.offsetLeft;
    const offsetTop = dom.offsetTop;
    const centerX = offsetLeft + rect.width / 2;
    const centerY = offsetTop + rect.height / 2;
    const x = pageX - rect.left;
    const y = pageY - rect.top;
    const angle = calcAngle({ x, y }, { centerX, centerY });
    const tr = calcAngle(
        { x: offsetLeft + rect.width, y: offsetTop },
        { centerX, centerY }
    );
    const tl = calcAngle({ x: offsetLeft, y: offsetTop }, { centerX, centerY });
    const bl = calcAngle(
        { x: offsetLeft, y: offsetTop + rect.height },
        { centerX, centerY }
    );
    const br = calcAngle(
        { x: offsetLeft + rect.width, y: offsetTop + rect.height },
        { centerX, centerY }
    );
    const range: { [dirRange in TYPE_DIR]: [number, number] } = {
        t: [tl, tr],
        r: [tr, br],
        b: [br, bl],
        l: [bl, tl],
    };
    let dir = "";
    Object.entries(range).some(([v, k]) => {
        if (k[0] > k[1] && (angle >= k[0] || angle < k[1])) {
            dir = v;
            return true;
        }
        if (angle >= k[0] && angle < k[1]) {
            dir = v;
            return true;
        }
    });
    return dir as TYPE_DIR;
}
