const spacePhone = phone => {
  let match = ('' + phone).replace(/\D/g, '').match(/^(\d{4})(\d{3})(\d{3})$/)
  return match ? match[1] + ' ' + match[2] + ' ' + match[3] : null
}

const random = (length = 0) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const vn = (str) => {
  return str ? str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    .replace(/ì|í|ị|ỉ|ĩ/g, "i")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    .replace(/đ/g, "d")
    .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
    .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
    .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
    .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
    .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
    .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
    .replace(/Đ/g, "D") : ''
}

const friendly = str => {
  return vn(str)
    .trim()
    .replace(/\/|\.|\,|\(|\)|\'|\"|\’|\!|\@|\#|\%|\*/g, '')
    .replace(/ |=|>|<=|<|>=|\=|\>|\<\=|\<|\>\=|\+|\^|\+|\$|\&|\_/g, '-')
    .replace(/^-+|-+$|-+/g, '-')
    .toLowerCase()
    .toLocaleLowerCase() || ''
}

const sliceIntoChunksByFor = (arr, chunkSize) => {
  const res = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    res.push(chunk)
  }
  return res
}

// const sliceIntoChunksByReduce = (arr, chunkSize) => {
//   return Array.from({ length: Math.ceil(arr.length / chunkSize) })
//     .reduce((arr, _, index) => [...arr.slice(index * chunkSize, (index + 1) * chunkSize), chunk], [])
// }

const uniqByKeepFirst = (arr, key) => {
  let seen = new Set();
  return arr.filter(v => seen.has(key(v)) ? false : seen.add(key(v)))
}

const uniqByKeepLast = (arr, key) => [...new Map(arr.map(v => [key(v), v])).values()]

const getUniqueListBy = (arr, key) => [...new Map(arr.map(item => [item[key], item])).values()]

const uuidv1 = () => {
  let temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid && uuid.substr(uuid.lastIndexOf('/') + 1); // remove prefix (e.g. blob:null/, blob:www.test.com/, ...)
}

const uuidv2 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => ((Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)).toString()))

module.exports = {
  to: {
    spacePhone,
    friendly,
    random,
    vn,
  },
  trick: {
    sliceIntoChunksByFor,
    // sliceIntoChunksByReduce
  },
  duplicate: {
    uniqByKeepFirst,
    uniqByKeepLast,
    getUniqueListBy
  },
  uuidv1,
  uuidv2,
}
