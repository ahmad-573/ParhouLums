let arr = [1, 2, 3, 4, 5]

console.log(arr.filter((val, index) => {
  if (val > 3) {return true}
  return false
}))