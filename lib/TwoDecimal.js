
export default function twoDecimal(value) {
  return (Math.round(value * 100) / 100).toFixed(2)
}

