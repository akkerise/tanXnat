const searchService = require('../services/search')
const config = require('../config');
const { convertSeoAttributes } = require('../services/article')
const { __saveSeoData } = require('../services/sitemapService');
// Biến này dùng để theo dõi số Promise đang được thực thi tại một thời điểm
let counter = 0;

// Hàm xử lý bất đồng bộ
// Tăng biến counter để theo dõi số promise được thực thi mỗi giây
const asyncOperation = (filter) => {
  counter++;
  return new Promise(async resolve => {
    const { __getCategoryId } = require('../services/sitemapServiceV2');
    const { category, attributes, slug } = filter
    filter.writeToSiteMap = await searchService.checkArticle(__getCategoryId(category), convertSeoAttributes(attributes))
    if (filter.writeToSiteMap) {
      await __saveSeoData({
        category,
        location: slug,
        attributes: JSON.stringify(attributes)
      })
    }
    counter--;
    resolve(filter);
  })
}

async function threadPool(listOfArguments) {
  const startDate = new Date().getTime()
  // Tạo index cho array
  const argsCopy = [].concat(listOfArguments.map((val, ind) => ({ val, ind })));
  const result = new Array(listOfArguments.length);
  const promises = new Array(config.maxThreadSize).fill(Promise.resolve());
  // Đưa promise liên tiếp vào chuỗi thực thi
  function chainNext(p) {
    if (argsCopy.length) {
      const arg = argsCopy.shift();
      return p.then(() => {
        // Lưu kết quả vào array khi Promise chạy xong
        const operationPromise = asyncOperation(arg.val).then(r => { result[arg.ind] = r; });
        return chainNext(operationPromise);
      });
    }
    return p;
  }
  await Promise.all(promises.map(chainNext));
  const resultFilter = result.filter(v => v.writeToSiteMap)
  console.log("threadPool :>> ", `filter > 12 news. Total ${resultFilter.length}/${listOfArguments.length} url with total time: ${(new Date().getTime() - startDate) / 1000}s`);
  return resultFilter;
}

module.exports = {
  threadPool
}