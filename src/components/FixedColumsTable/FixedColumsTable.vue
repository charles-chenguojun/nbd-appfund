<script setup lang="ts">
    import {
        nextTick,
        onMounted,
        ref,
        toRefs,
        watchEffect,
    } from "vue";
    import BScroll from "@better-scroll/core";
    export interface Colum {
        key: string;
        name: string;
        sort?: string;
        fixed?: string;
    }
    const props = withDefaults(
        defineProps<{
            colums?: Colum[];
            data: any[];
        }>(),
        {
            colums: () => [],
            data: () => [],
        },
    );
    const { colums, data } = toRefs(props);
    let scrollerOption = {
        scrollX: true,
        probeType: 3,
        bounce: false,
        HWCompositing: true,
        useTransition: false,
        eventPassthrough: "vertical",
        preventDefault: false,
    };

    const initScroller = () => {
        let lockHead = false;
        let lockBody = false;

        let theadBs = new BScroll(".thead", scrollerOption);
        let tbodyBs = new BScroll(".tbody", scrollerOption);
        theadBs.on("scroll", ({ x, y }: any) => {
            tbodyBs.scrollTo(x, y, 0);
        });
        theadBs.on("scrollStart", () => {
            if (!lockHead) {
                lockBody = true;
                addScrollingStyle();
            }
        });
        theadBs.on("scrollEnd", () => {
            if (!lockHead) {
                lockBody = false;
                removeScrollingStyle();
            }
        });
        tbodyBs.on("scroll", ({ x, y }: any) => {
            theadBs.scrollTo(x, y, 0);
        });
        tbodyBs.on("scrollStart", () => {
            if (!lockBody) {
                lockHead = true;
                addScrollingStyle();
            }
        });
        tbodyBs.on("scrollEnd", () => {
            if (!lockBody) {
                lockHead = false;
                removeScrollingStyle();
            }
        });

        let leftFixed = fixedColumsTable.value?.querySelector(".left-fixed");
        let rightFixed = fixedColumsTable.value?.querySelector(".right-fixed");
        let topLeftThs = fixedColumsTable.value?.querySelector(".top-left-ths");
        let topRightThs =
            fixedColumsTable.value?.querySelector(".top-right-ths");
        const addScrollingStyle = () => {
            leftFixed?.classList.add("scrolling");
            rightFixed?.classList.add("scrolling");
            topLeftThs?.classList.add("scrolling");
            topRightThs?.classList.add("scrolling");
        };
        const removeScrollingStyle = () => {
            leftFixed?.classList.remove("scrolling");
            rightFixed?.classList.remove("scrolling");
            topLeftThs?.classList.remove("scrolling");
            topRightThs?.classList.remove("scrolling");
        };
    };

    const fixedColumsTable = ref<HTMLElement>();
    const theadContent = ref<HTMLElement>();
    const tbodyContent = ref<HTMLElement>();

    const setFixedColums = () => {
        let leftFixed = fixedColumsTable.value?.querySelector(".left-fixed");
        if (leftFixed) {
            fixedColumsTable.value?.removeChild(leftFixed);
        }
        let rightFixed = fixedColumsTable.value?.querySelector(".right-fixed");
        if (rightFixed) {
            fixedColumsTable.value?.removeChild(rightFixed);
        }
        let theadEl = fixedColumsTable.value?.querySelector(".thead");
        let topLeftThsFixed =
            fixedColumsTable.value?.querySelector(".top-left-ths");
        if (topLeftThsFixed) {
            theadEl?.removeChild(topLeftThsFixed);
        }
        let topRightThsFixed =
            fixedColumsTable.value?.querySelector(".top-right-ths");
        if (topRightThsFixed) {
            theadEl?.removeChild(topRightThsFixed);
        }

        let fixedIndexs: any[] = [];
        colums.value.forEach((item, i) => {
            if (item.fixed) {
                fixedIndexs[i] = item.fixed;
            }
        });
        let leftFixedDom = document.createElement("div");
        leftFixedDom.classList.add("left-fixed");
        let rightFixedDom = document.createElement("div");
        rightFixedDom.classList.add("right-fixed");

        let firstFixedDoms: any[] = [];
        let lastFixedDoms: any[] = [];
        for (let i = 0, len = fixedIndexs.length; i < len; i++) {
            let item = fixedIndexs[i];
            let p = document.createElement("div");
            if (item == "left") {
                firstFixedDoms[i] = p;
            } else if (item == "right") {
                lastFixedDoms[i] = p;
            }
        }

        let topLeftThs = document.createElement("div");
        topLeftThs.classList.add("top-left-ths");
        let topRightThs = document.createElement("div");

        const appendChild = (i: number, child: Element, type: string) => {
            let whiteStyle = [
                "width",
                "height",
                "background",
                "font-size",
                "padding",
                "margin",
                "align-items",
                "justify-content",
                "text-align",
            ];
            let style = getComputedStyle(child);
            let el = child.cloneNode(true) as HTMLElement;
            whiteStyle.forEach((item: any) => {
                el.style.cssText += `${item}:${style[item]}`;
            });

            if (type == "thead") {
                let item = colums.value[i];
                if (item.sort != undefined) {
                    el.addEventListener("click", () => {
                        hdlSort(item);
                    });
                }
            }

            if (type == "thead") {
                let newEl = el.cloneNode(true);
                let item = colums.value[i];
                if (item.sort != undefined) {
                    newEl.addEventListener("click", () => {
                        hdlSort(item);
                    });
                }
                if (fixedIndexs[i] == "left") {
                    topLeftThs.appendChild(newEl);
                } else if (fixedIndexs[i] == "right") {
                    topRightThs.appendChild(newEl);
                }
            }

            if (fixedIndexs[i] == "left") {
                firstFixedDoms[i].appendChild(el);
            } else if (fixedIndexs[i] == "right") {
                lastFixedDoms[i].appendChild(el);
            }
        };
        if (theadContent.value) {
            Array.from(theadContent.value.children).forEach((child, i) => {
                appendChild(i, child, "thead");
            });
        }

        if (tbodyContent.value) {
            Array.from(tbodyContent.value.children).forEach((children) => {
                let c = children.children;
                if (c) {
                    Array.from(c).forEach((child, i) => {
                        appendChild(i, child, "tbody");
                    });
                }
            });
        }
        if (firstFixedDoms.length > 0) {
            firstFixedDoms.forEach((item) => {
                leftFixedDom.appendChild(item);
            });
            fixedColumsTable.value?.appendChild(leftFixedDom);
        }

        if (lastFixedDoms.length > 0) {
            lastFixedDoms.forEach((item) => {
                rightFixedDom.appendChild(item);
            });
            fixedColumsTable.value?.appendChild(rightFixedDom);
        }

        theadEl?.appendChild(topLeftThs);
        theadEl?.appendChild(topRightThs);
    };
    const isMounted = ref(false);
    onMounted(() => {
        initSortStatus();
        setFixedColums();
        initScroller();
        isMounted.value = true;

        let p = document.querySelector(".fixedColumsTable");
        p?.addEventListener("click", (e) => {
            let target = e.target as HTMLElement;
            while (target && !target.classList.contains("eft-name")) {
                target = target.parentElement!;

                if (target.classList.contains("fixedColumsTable")) {
                    break;
                }
            }

            let code = target.dataset.code;
            let mode = process.env.NODE_ENV;

            if (code) {
                let url = `http://172.19.30.175:8081/appfundDetail?id=${code}`;
                if (mode != "development") {
                    url = `https://news.nbd.com.cn/fund-manager/c/appfundDetail?id=${code}`;
                }
                window.location.href = url;
            }
        });
    });

    const showList = ref<any[]>([]);
    watchEffect(() => {
        showList.value = [...data.value];
    });
    const sortStatus = ref<any>({});
    const initSortStatus = () => {
        colums.value.forEach((item, i) => {
            if (item.sort != undefined) {
                sortStatus.value[item.sort] = "";
            }
        });
    };

    const hdlSort = (obj: any) => {
        let itemSort = obj.sort;

        if (itemSort != undefined) {
            for (let key in sortStatus.value) {
                if (key == itemSort.toString()) {
                    let status = sortStatus.value[itemSort];

                    if (status == "") {
                        status = "down";
                    } else if (status == "down") {
                        status = "up";
                    } else if (status == "up") {
                        status = "";
                    }

                    showList.value.sort((a, b) => {
                        let v0 = eval(`a.${itemSort}`);
                        let v1 = eval(`b.${itemSort}`);
                        return status === "up"
                            ? v0 - v1
                            : status === "down"
                            ? v1 - v0
                            : 0;
                    });

                    sortStatus.value[itemSort] = status;
                    console.log(itemSort, sortStatus.value[itemSort]);
                } else {
                    sortStatus.value[key] = "";
                }
            }

            nextTick(() => {
                setFixedColums();
            });
        }
    };
</script>

<template>
    <div class="fixedColumsTable" ref="fixedColumsTable">
        <div class="thead">
            <div class="thead-content" ref="theadContent">
                <slot v-if="colums.length == 0" name="thead"></slot>
                <div
                    v-else
                    class="th"
                    v-for="(item, i) in colums"
                    :key="item.key"
                    @click="hdlSort(item)"
                >
                    <span v-html="item.name"></span>
                    <div
                        :class="[
                            item.sort != undefined
                                ? `sort ${sortStatus[item.sort] || ''}`
                                : '',
                        ]"
                    ></div>
                </div>
            </div>
        </div>
        <div class="tbody">
            <div class="tbody-content" ref="tbodyContent">
                <slot :data="showList"></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped src="./FixedColumsTable.scss"></style>
