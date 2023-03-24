function pagination(current, total) {
  let delta = 1,
    left = current - delta,
    right = current + delta,
    range = [];
  for (let i = 1; i <= total; i++) {
    if (left > 1 && right < total) {
      range.push(1, left, `[${current}]`, right, total);
      break;
    }
    if (i == 1 || i == total || i >= left && i <= right) {
      const f = current === i ? `[${i}]` : i
      range.push(f);
    }
  }
  console.log('range :>> ', range);
  return range
}

pagination(2, 5)
pagination(3, 5)
pagination(4, 5)
pagination(4, 9)
pagination(8, 10000000000)
