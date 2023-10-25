export const getPrice = (x) => {
  return `Rp. ${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};
