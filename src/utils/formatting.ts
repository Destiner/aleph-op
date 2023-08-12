function sluggify(str: string): string {
  return str.replace(/\s+/g, '-').toLowerCase();
}

function formatAddress(address: string): string {
  return address.substring(0, 6) + '...' + address.substring(38);
}

export { sluggify, formatAddress };
