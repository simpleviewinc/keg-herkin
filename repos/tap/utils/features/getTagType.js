export const getTagType = parent => {
  return !parent
    ? null
    : parent.feature
      ? 'feature'
      : parent.scenario
        ? 'scenario'
        : null
}