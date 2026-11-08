// Import all operating systems guide content
import winBeginner from '../content/windows/beginner/guides.json';
import winIntermediate from '../content/windows/intermediate/guides.json';
import winAdvanced from '../content/windows/advanced/guides.json';
import winSymptoms from '../content/windows/symptoms.json';

import macBeginner from '../content/macos/beginner/guides.json';
import macIntermediate from '../content/macos/intermediate/guides.json';
import macAdvanced from '../content/macos/advanced/guides.json';
import macSymptoms from '../content/macos/symptoms.json';

import linuxBeginner from '../content/linux/beginner/guides.json';
import linuxIntermediate from '../content/linux/intermediate/guides.json';
import linuxAdvanced from '../content/linux/advanced/guides.json';
import linuxSymptoms from '../content/linux/symptoms.json';

import androidBeginner from '../content/android/beginner/guides.json';
import androidIntermediate from '../content/android/intermediate/guides.json';
import androidAdvanced from '../content/android/advanced/guides.json';
import androidSymptoms from '../content/android/symptoms.json';

import iosBeginner from '../content/ios/beginner/guides.json';
import iosIntermediate from '../content/ios/intermediate/guides.json';
import iosAdvanced from '../content/ios/advanced/guides.json';
import iosSymptoms from '../content/ios/symptoms.json';

import dualbootBeginner from '../content/dualboot/beginner/guides.json';
import dualbootIntermediate from '../content/dualboot/intermediate/guides.json';
import dualbootAdvanced from '../content/dualboot/advanced/guides.json';
import dualbootSymptoms from '../content/dualboot/symptoms.json';

import osConfig from '../content/os-config.json';

const OS_DATA = {
  windows: {
    beginner: winBeginner.guides,
    intermediate: winIntermediate.guides,
    advanced: winAdvanced.guides,
    symptoms: winSymptoms.symptoms
  },
  macos: {
    beginner: macBeginner.guides,
    intermediate: macIntermediate.guides,
    advanced: macAdvanced.guides,
    symptoms: macSymptoms.symptoms
  },
  linux: {
    beginner: linuxBeginner.guides,
    intermediate: linuxIntermediate.guides,
    advanced: linuxAdvanced.guides,
    symptoms: linuxSymptoms.symptoms
  },
  android: {
    beginner: androidBeginner.guides,
    intermediate: androidIntermediate.guides,
    advanced: androidAdvanced.guides,
    symptoms: androidSymptoms.symptoms
  },
  ios: {
    beginner: iosBeginner.guides,
    intermediate: iosIntermediate.guides,
    advanced: iosAdvanced.guides,
    symptoms: iosSymptoms.symptoms
  },
  dualboot: {
    beginner: dualbootBeginner.guides,
    intermediate: dualbootIntermediate.guides,
    advanced: dualbootAdvanced.guides,
    symptoms: dualbootSymptoms.symptoms
  }
};

export function getAllGuides(osId = 'windows') {
  const target = OS_DATA[osId] || OS_DATA.windows;
  return [
    ...target.beginner.map(g => ({ ...g, level: 'beginner', os: osId })),
    ...target.intermediate.map(g => ({ ...g, level: 'intermediate', os: osId })),
    ...target.advanced.map(g => ({ ...g, level: 'advanced', os: osId }))
  ];
}

export function getGuideById(guideId, osId = 'windows') {
  // First look in target OS, then search all OSes as fallback
  const inTarget = getAllGuides(osId).find(g => g.id === guideId);
  if (inTarget) return inTarget;

  for (const os of Object.keys(OS_DATA)) {
    const found = getAllGuides(os).find(g => g.id === guideId);
    if (found) return found;
  }
  return null;
}

export function getGuidesByLevel(level, osId = 'windows') {
  return getAllGuides(osId).filter(g => g.level === level);
}

export function getGuidesByCategory(category, osId = 'windows') {
  return getAllGuides(osId).filter(g => g.category === category);
}

export function getCategories(osId = 'windows') {
  const guides = getAllGuides(osId);
  const cats = new Map();
  guides.forEach(g => {
    if (!cats.has(g.category)) {
      cats.set(g.category, { id: g.category, name: g.categoryName, icon: g.categoryIcon, count: 0 });
    }
    cats.get(g.category).count++;
  });
  return Array.from(cats.values());
}

export function getSymptoms(osId = 'windows') {
  const target = OS_DATA[osId];
  if (target && target.symptoms) {
    return target.symptoms;
  }
  return OS_DATA.windows.symptoms;
}

export function getAllSymptomsAcrossOS() {
  const list = [];
  for (const [osKey, data] of Object.entries(OS_DATA)) {
    if (data.symptoms) {
      data.symptoms.forEach(s => {
        list.push({ ...s, os: osKey });
      });
    }
  }
  return list;
}

export function getOSConfig() {
  return osConfig;
}
