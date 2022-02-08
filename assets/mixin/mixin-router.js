/* 路由相关通用逻辑 */
export default {
    data() {
        return {
            mixHomePath: ["", this.routerPath.home], // 首页路由配置 String || Array<String>
        }
    },
    methods: {
        // 当前路由是否等于传入路径
        isEqualPath(path) {
            return this.$route.path === path
        },
        // 当前路由是否包含传入路径
        isContainPath(path) {
            if(typeof path !== "string") return;
            return this.$route.path.indexOf(path);
        },
        // 是否首页
        isHomePage() {
            if (Array.isArray(this.mixHomePath)) {
                return this.mixHomePath.some(this.isEqualPath);
            }
            return this.isEqualPath(this.mixHomePath)
        },
        // AI菜单跳转
        aiPageJump(child, parent) {
            if(!child) return;
            this.$router.push({
                path: child.url,
                query: this.aesEncrypt({
                    i: child.id,
                    n: child.title,
                }),
            });
        },
    }
}