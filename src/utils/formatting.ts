function sluggify(str: string): string {
  return str.replace(/\s+/g, '-').toLowerCase();
}

// eslint-disable-next-line import/prefer-default-export
export { sluggify };
