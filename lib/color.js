function getProgressBarColor(percentage) {
  if (percentage <= 30) {
    return '#00d22a';
  } else if (percentage <= 80) {
    return '#fbc02d';
  } else {
    return '#e65100';
  }
}

export default getProgressBarColor;
