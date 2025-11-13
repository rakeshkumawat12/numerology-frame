const loShuGrid = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

export const insertIntoGrid = (date: string, mulank: number, destiny: number) => {
  const digits = [
    ...date.replace(/\D/g, "").split("").map(Number),
    mulank,
    destiny,
  ];

  const newGrid = Array.from({ length: 3 }, () => Array(3).fill(null)) as (number | null)[][];

  digits.forEach((digit) => {
    loShuGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === digit) {
          newGrid[rowIndex][colIndex] = digit;
        }
      });
    });
  });

  return newGrid;
};

export const getMindPlaneQualities = (grid: (number | null)[][]) => {
  const mindPlaneValues = [grid[0][0], grid[0][1], grid[0][2]];

  if (
    mindPlaneValues.includes(4) &&
    mindPlaneValues.includes(9) &&
    mindPlaneValues.includes(2)
  ) {
    return [
      "Genius.",
      "Uses mind while making any decision.",
      "Logical person.",
      "Mind plane is 100% active.",
    ];
  } else if (mindPlaneValues.includes(4)) {
    return [
      "Flexible in Nature.",
      "Intelligent person.",
      "No Grey area in life.",
      "Does Not like manipulative people.",
      "Hardworking but may face struggles in early life.",
    ];
  } else if (mindPlaneValues.includes(9)) {
    return [
      "Religious Person",
      "Artistic, Short Tempered",
      "Loves to help needy people",
      "Thinks from the heart",
      "Work for Society",
    ];
  } else if (mindPlaneValues.includes(2)) {
    return [
      "Caring Nature.",
      "Family oriented.",
      "Simple person.",
      "Take decisions considering the family in his/her mind.",
    ];
  } else if (mindPlaneValues.includes(4) && mindPlaneValues.includes(9)) {
    return [
      "Struggle with health (stress, leg problem, knee)",
      "Legal matters may happen",
    ];
  } else if (mindPlaneValues.includes(4) && mindPlaneValues.includes(2)) {
    return [
      "May involve in Bad company.",
      "Get Blame for other's misbehaviour.",
      "An intelligent person.",
      "Family problems (elder sibling or mother)",
    ];
  } else if (mindPlaneValues.includes(9) && mindPlaneValues.includes(2)) {
    return [
      "Helps the society",
      "Bad with love relations (especially girls)",
      "Gets Support from (powerful / Elder) people",
      "Spiritual person",
    ];
  } else {
    return ["Empty Mind Plane!"];
  }
};

export const getHeartPlaneQualities = (grid: (number | null)[][]) => {
  const heartPlaneValues = [grid[1][0], grid[1][1], grid[1][2]];

  if (
    heartPlaneValues.includes(3) &&
    heartPlaneValues.includes(5) &&
    heartPlaneValues.includes(7)
  ) {
    return [
      "Satisfaction in life",
      "Artistic Nature",
      "Good learner",
      "Very emotional person",
      "Golden heart",
    ];
  } else if (heartPlaneValues.includes(3)) {
    return ["Knowledgable", "Lazy", "Quick Learner"];
  } else if (heartPlaneValues.includes(5)) {
    return ["Multiple experiences in life", "Enjoy life to the fullest"];
  } else if (heartPlaneValues.includes(7)) {
    return [
      "Intuitive person",
      "Researcher",
      "Don't believe people easily",
      "May face minimum two break-ups in life",
    ];
  } else if (heartPlaneValues.includes(3) && heartPlaneValues.includes(5)) {
    return [
      "Rational behavior",
      "Lucky in money matters",
      "Good communicator",
      "Good for education business",
    ];
  } else if (heartPlaneValues.includes(5) && heartPlaneValues.includes(7)) {
    return [
      "Attractive personality",
      "Business oriented",
      "If 5 comes two times and 7 comes one time, people learn by themselves and start earning well",
    ];
  } else if (heartPlaneValues.includes(3) && heartPlaneValues.includes(7)) {
    return [
      "Lucky person",
      "Skilled person",
      "Good in occult science",
      "Emotional person",
    ];
  } else {
    return ["Empty Heart plane!"];
  }
};

export const getPracticalPlaneQualities = (grid: (number | null)[][]) => {
  const practicalPlaneValues = [grid[2][0], grid[2][1], grid[2][2]];

  if (
    practicalPlaneValues.includes(8) &&
    practicalPlaneValues.includes(1) &&
    practicalPlaneValues.includes(6)
  ) {
    return [
      "Very practical nature",
      "Believes in materialistic gains in life",
      "Romantic nature",
      "Loves power and authority in jobs/business and also in relationships.",
    ];
  } else if (practicalPlaneValues.includes(8)) {
    return [
      "Manages money well",
      "Always speaks the truth and hates liars too much.",
      "Justice lover",
    ];
  } else if (practicalPlaneValues.includes(1)) {
    return ["Good in communication", "Good memory and grasping power"];
  } else if (practicalPlaneValues.includes(6)) {
    return [
      "Family oriented",
      "Loves luxury around them",
      "Have Attractive personality",
      "Art lover",
    ];
  } else if (
    practicalPlaneValues.includes(8) &&
    practicalPlaneValues.includes(1)
  ) {
    return [
      "Image conscious",
      "Aggressive nature",
      "Insult or accusation of a crime may arise in life at least once",
      "Loves variety in career",
      "His/her spouse may face frequent health issues",
      "Loves being in authority or power",
    ];
  } else if (
    practicalPlaneValues.includes(1) &&
    practicalPlaneValues.includes(6)
  ) {
    return [
      "Not very good for married life",
      "Luxury comes into life",
      "Prefer looking groomed and rich",
    ];
  } else if (
    practicalPlaneValues.includes(8) &&
    practicalPlaneValues.includes(6)
  ) {
    return [
      "Somehow Money finds its way when they are in need.",
      "May face eyes related problems",
      "May face genital-related problems.",
    ];
  } else {
    return ["Empty Practical plane!"];
  }
};

export const getVisionPlaneQualities = (grid: (number | null)[][]) => {
  const visionPlaneValues = [grid[0][0], grid[1][0], grid[2][0]];

  if (
    visionPlaneValues.includes(4) &&
    visionPlaneValues.includes(3) &&
    visionPlaneValues.includes(8)
  ) {
    return [
      "Strong thinking power",
      "Very good in brain-related work",
      "Visionary",
      "May get airborne diseases very easily",
      "Good in practical planning of any work",
    ];
  } else if (visionPlaneValues.includes(4) && visionPlaneValues.includes(3)) {
    return [
      "This combination is not very good for fame and art-related work but gives good results in the technical field.",
      "A person wants to be organised but can face problems in keeping everything under control.",
      "Intelligent person",
    ];
  } else if (visionPlaneValues.includes(3) && visionPlaneValues.includes(8)) {
    return [
      "Good for real estate and medical field.",
      "Love to learn new things.",
    ];
  } else if (visionPlaneValues.includes(4) && visionPlaneValues.includes(8)) {
    return [
      "Straight forward nature.",
      "Small friend circle",
      "May make enemies because of their words.",
      "Delayed success but not denied.",
      "Life can change 180 degrees if he/she continues to work hard.",
    ];
  } else {
    return [
      "Person may suggest something to others but people tend to overlook him.",
    ];
  }
};

export const getWillPlaneQualities = (grid: (number | null)[][]) => {
  const willPlaneValues = [grid[0][1], grid[1][1], grid[2][1]];

  if (
    willPlaneValues.includes(9) &&
    willPlaneValues.includes(5) &&
    willPlaneValues.includes(1)
  ) {
    return [
      "Immense willpower",
      "May face difficulties in settling down till the age of 28 but after that, they earn very well.",
      "Usually settles in the 32nd year",
      "Many successful people have these numbers",
      "Dominating Personality",
      "Fight back attitude",
    ];
  } else if (willPlaneValues.includes(9) && willPlaneValues.includes(1)) {
    return [
      "Commanding nature",
      "Leadership qualities",
      "Respect is everything",
      "May go for higher education",
    ];
  } else if (willPlaneValues.includes(9) && willPlaneValues.includes(5)) {
    return [
      "Kind-hearted person",
      "Strong will power",
      "Manipulates to get his work done",
      "Strong communication skills",
    ];
  } else if (willPlaneValues.includes(1) && willPlaneValues.includes(5)) {
    return [
      "Sharp minded people",
      "Good business sense",
      "Good with father/son but possibly",
      "one person shines at a time.",
    ];
  } else {
    return [
      "Person can lose hope in life easily. One or two failures can break his motivation for a long time.",
    ];
  }
};

export const getActionPlaneQualities = (grid: (number | null)[][]) => {
  const actionPlaneValues = [grid[0][2], grid[1][2], grid[2][2]];

  if (
    actionPlaneValues.includes(2) &&
    actionPlaneValues.includes(7) &&
    actionPlaneValues.includes(6)
  ) {
    return [
      "Action takers (doers)",
      "Quick decision maker",
      "Good in sports",
      "Opportunity grabber",
      "If the mental plane is missing he can't make decisions without proper thinking",
    ];
  } else if (actionPlaneValues.includes(2) && actionPlaneValues.includes(7)) {
    return [
      "Caring nature",
      "Spiritually inclined",
      "Highly intuitive",
      "Sensitive",
      "Good in occult science",
      "Money is not their priority.",
    ];
  } else if (actionPlaneValues.includes(2) && actionPlaneValues.includes(6)) {
    return [
      "Good looking",
      "Caring nature",
      "Art lover",
      "Prone to water-related diseases.",
      "Loves family too much (may become a hurdle in growth)",
    ];
  } else if (actionPlaneValues.includes(7) && actionPlaneValues.includes(6)) {
    return [
      "Metal elements traits will be there.",
      "Attraction towards the opposite sex.",
      "Indulge in More than one love relationship.",
      "Chances of an extra marital affair.",
    ];
  } else {
    return ["Person may be lazy and have weak decision-making power."];
  }
};

export const getRajyog = (grid: (number | null)[][]) => {
  const isFirstDiagonalFull =
    grid[0][0] !== null &&
    grid[1][1] !== null &&
    grid[2][2] !== null;

  const isSecondDiagonalFull =
    grid[0][2] !== null &&
    grid[1][1] !== null &&
    grid[2][0] !== null;

  if (isFirstDiagonalFull) {
    return "Support from Family, Friends, Spouse, Children and Universe";
  } else if (isSecondDiagonalFull) {
    return "Property Real estate Agriculture Interior Architect";
  } else {
    return "No Rajyog is present in your numeroscope!";
  }
};
