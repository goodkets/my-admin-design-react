/**
 * 滚动排行榜
 */
const ScrollRankingBoardList = {
  data: [
    {
      name: "周口",
      value: 55,
    },
    {
      name: "南阳",
      value: 120,
    },
    {
      name: "西峡",
      value: 78,
    },
    {
      name: "驻马店",
      value: 66,
    },
    {
      name: "周口",
      value: 55,
    },
    {
      name: "南阳",
      value: 120,
    },
    {
      name: "西峡",
      value: 78,
    },
    {
      name: "驻马店",
      value: 66,
    },
    {
      name: "周口",
      value: 55,
    },
    {
      name: "南阳",
      value: 120,
    },
    {
      name: "西峡",
      value: 78,
    },
    {
      name: "驻马店",
      value: 66,
    },
    {
      name: "新乡",
      value: 80,
    },
    {
      name: "信阳",
      value: 45,
    },
    {
      name: "漯河",
      value: 29,
    },
  ],
  carousel: "page",
};

/**
 * 数据滚动
 */
const ScrollBoardList = {
  header: ["列1", "列2", "列3"],
  data: [
    ["行1列1", "行1列2", "行1列3"],
    ["行2列1", "行2列2", "行2列3"],
    ["行3列1", "行3列2", "行3列3"],
    ["行4列1", "行4列2", "行4列3"],
    ["行5列1", "行5列2", "行5列3"],
    ["行6列1", "行6列2", "行6列3"],
    ["行7列1", "行7列2", "行7列3"],
    ["行8列1", "行8列2", "行8列3"],
    ["行9列1", "行9列2", "行9列3"],
    ["行10列1", "行10列2", "行10列3"],
  ],
  index: true,
  columnWidth: [50],
  align: ["center"],
};

/**
 * 数字滚动
 */
const DigitalFlopList = (number = 0) => {
  return {
    number: [number],
    content: ` 全国淘宝主播数量{nt}个`,
    animationFrame: 100,
    formatter: (num: number) => {
      const numbers = num.toString().split("").reverse();
      const segs = [];
      while (numbers.length) segs.push(numbers.splice(0, 3).join(""));
      return segs.join(",").split("").reverse().join("");
    },
  };
};

export { ScrollRankingBoardList, ScrollBoardList, DigitalFlopList };
