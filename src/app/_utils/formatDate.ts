const formatDate = (isoString: string, separator: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}${separator}${month}${separator}${day}`;
};

export default formatDate;
