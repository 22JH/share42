// 시간 측정하기
export const getTimeAgo = (timestamp: string) => {
  const now = new Date().getTime();
  const diff = now - new Date(timestamp).getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;

  if (diff < minute) {
    return "방금 전";
  } else if (diff < hour) {
    return Math.floor(diff / minute) + "분 전";
  } else if (diff < day) {
    return Math.floor(diff / hour) + "시간 전";
  } else if (diff < month) {
    return Math.floor(diff / day) + "일 전";
  } else {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }
};