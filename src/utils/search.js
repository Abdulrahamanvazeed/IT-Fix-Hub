export function searchGuides(guides, query) {
  if (!query || query.trim() === '') return guides;
  const terms = query.toLowerCase().split(/\s+/);
  return guides.filter(guide => {
    const searchText = [
      guide.title,
      guide.symptom,
      guide.description,
      ...(guide.keywords || []),
      ...(guide.causes || []),
      guide.category
    ].join(' ').toLowerCase();
    return terms.every(term => searchText.includes(term));
  }).sort((a, b) => {
    // Prioritize title matches
    const aTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
    const bTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
    return bTitle - aTitle;
  });
}

export function searchSymptoms(symptoms, query) {
  if (!query || query.trim() === '') return symptoms;
  const lq = query.toLowerCase();
  return symptoms.filter(s => 
    s.text.toLowerCase().includes(lq) ||
    s.keywords.some(k => k.toLowerCase().includes(lq))
  );
}
