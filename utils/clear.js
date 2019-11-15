export function clear(node) {
    let last;
    while ((last = node.lastChild)) node.removeChild(last);
}
