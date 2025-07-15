import crypto from 'crypto';

function findLongestIncreasingSubstrings(name) {
  const lowerName = name.toLowerCase();
  let substrings = [];
  let maxLen = 0;
  let temp = lowerName[0];
  let startIndices = [0];

  for (let i = 1; i < lowerName.length; i++) {
    if (lowerName[i] > lowerName[i - 1]) {
      temp += lowerName[i];
    } else {
      if (temp.length > maxLen) {
        substrings = [temp];
        startIndices = [i - temp.length];
        maxLen = temp.length;
      } else if (temp.length === maxLen) {
        substrings.push(temp);
        startIndices.push(i - temp.length);
      }
      temp = lowerName[i];
    }
  }

  // Check the last one
  if (temp.length > maxLen) {
    substrings = [temp];
    startIndices = [lowerName.length - temp.length];
    maxLen = temp.length;
  } else if (temp.length === maxLen) {
    substrings.push(temp);
    startIndices.push(lowerName.length - temp.length);
  }

  return { substrings, startIndices };
}

export default function generateProductCode(name) {
  const { substrings, startIndices } = findLongestIncreasingSubstrings(name);
  const concatenated = substrings.join('');
  const start = Math.min(...startIndices);
  const end = startIndices[startIndices.length - 1] + substrings[substrings.length - 1].length - 1;

  const hash = crypto.createHash('md5').update(name).digest('hex').substring(0, 8);
  return `${hash}-${start}${concatenated}${end}`;
}
