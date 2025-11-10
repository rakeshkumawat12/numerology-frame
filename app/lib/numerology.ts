export function calculateLifePath(dateStr: string): number {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  const sum = reduceToSingle(day) + reduceToSingle(month) + reduceToSingle(year);
  return reduceToSingle(sum);
}

export function reduceToSingle(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return num;
}

export function getNumerologyInsights(lifePath: number) {
  const meanings: { [key: number]: { title: string; desc: string } } = {
    1: { title: "The Leader", desc: "Independent, pioneering, ambitious" },
    2: { title: "The Diplomat", desc: "Cooperative, sensitive, peacemaker" },
    3: { title: "The Creative", desc: "Expressive, optimistic, artistic" },
    4: { title: "The Builder", desc: "Practical, disciplined, reliable" },
    5: { title: "The Freedom Seeker", desc: "Adventurous, versatile, dynamic" },
    6: { title: "The Nurturer", desc: "Responsible, caring, harmonious" },
    7: { title: "The Seeker", desc: "Spiritual, analytical, introspective" },
    8: { title: "The Powerhouse", desc: "Ambitious, successful, material mastery" },
    9: { title: "The Humanitarian", desc: "Compassionate, selfless, wise" },
    11: { title: "Master Intuitive", desc: "Spiritual insight, inspiration" },
    22: { title: "Master Builder", desc: "Large-scale vision, leadership" },
    33: { title: "Master Teacher", desc: "Universal healing, blessing" }
  };
  
  return meanings[lifePath] || meanings[1];
}