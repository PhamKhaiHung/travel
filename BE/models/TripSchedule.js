/**
 * Model đại diện cho lịch đi chơi
 */
export class TripSchedule {
  constructor(data = {}) {
    this.id = data.id || null;
    this.title = data.title || '';
    this.startTime = data.startTime || null;
    this.endTime = data.endTime || null;
    this.locationIds = data.locationIds || [];
    this.notes = data.notes || '';
    this.comment = data.comment || '';
    this.rating = data.rating || 0;
    this.images = data.images || [];
  }
}

