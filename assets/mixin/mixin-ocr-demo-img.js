export default {
    methods: {
        // 获取坐标点第一个宽高不为0的索引
        getFirstIdxFromCoords(coords, { width = 'width', height = 'height' } = {}) {
            if (!Array.isArray(coords)) return;
            let coord;
            for (let i = 0; i < coords.lenght; i++) {
                coord = coords[i];
                if (
                    coord[width] !== 0 &&
                    coord[height] !== 0
                ) {
                    return i;
                }
            }
        },
    }
}