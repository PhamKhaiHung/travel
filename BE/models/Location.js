/**
 * Model đại diện cho địa điểm đi chơi
 */
export class Location {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.address = data.address || '';
    this.description = data.description || '';
    this.locationTypeId = data.locationTypeId || null;
    this.imageUrl = data.imageUrl || '';
    this.rating = data.rating || 0;
    this.phone = data.phone || null;
    this.website = data.website || null;
  }
}

