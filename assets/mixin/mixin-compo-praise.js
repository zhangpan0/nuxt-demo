import { requestIsLike, requestPraiseCount, requestIsPraised,requestCancelPraise } from "@/assets/api/index.js";

export default {
    data() {
        return {
            goodNum: 0,
            badNum: 0,
            isGood: false,
            isBad: false
        }
    },
    computed: {
        aiId() {
            return this.$store.state.aiId;
        },
    },
    methods: {
        handlePraise(like, successCbk, errorCbk) {
            if (!this.aiId) return;
            let httpData = {
                algorithmEstimateStatus:like,
                algorithmId: this.aiId
            }
            requestIsLike(httpData)
                .then((res) => {
                    if (successCbk) successCbk();
                    this.initPraiseCount();
                    this.initIsPraised();
                })
                .catch((err) => {
                    if (errorCbk) errorCbk();
                    this.$message.error(err.msg || "异常，请稍后重试");
                });
        },
        initPraiseCount() {
            if (!this.aiId) return;
            requestPraiseCount(this.aiId).then((res) => {
                if (typeof res !== "object") return;
                const { unLikeNum, likeNum } = res;
                this.goodNum = likeNum;
                this.badNum = unLikeNum;
            });
        },
        initIsPraised() {
            if (!this.aiId) return;
            requestIsPraised(this.aiId).then((res) => {
                // 用户已点赞
                if (res == '1') {
                    this.isGood = true;
                    this.isBad = false;
                } else if (res == '0') {
                    // 用户已踩
                    this.isGood = false;
                    this.isBad = true;
                } else {
                    this.isGood = false;
                    this.isBad = false;
                }
            });
        },
        cancelPraise(successCbk, errorCbk) {
            if (!this.aiId) return;
            let httpData = {
                algorithmId: this.aiId
            }
            requestCancelPraise(httpData)
                .then((res) => {
                    if (successCbk) successCbk();
                    this.initPraiseCount();
                    this.initIsPraised();
                })
                .catch((err) => {
                    if (errorCbk) errorCbk();
                    this.$message.error(err.msg || "异常，请稍后重试");
                });
        }
    },
    beforeMount() {
        // this.initPraiseCount();
        // this.initIsPraised();
    },
}