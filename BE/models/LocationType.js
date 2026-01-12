/**
 * Model đại diện cho loại địa điểm đi chơi
 */
export class LocationType {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.description = data.description || '';
    this.icon = data.icon || '';
  }
}

