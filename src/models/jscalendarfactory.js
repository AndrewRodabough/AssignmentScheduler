import { v4 as uuidv4 } from 'uuid';

class JSCalendarFactory {

  static createCalendar() {
    return {
      "@type": "Group",
      "groupUID": this.generateUID(),
      "created": new Date().toISOString(),
      "updated": new Date().toISOString(),
      "entries": {},

      setTitle(title) {
        if (title) this.title = title;
        return this;
      },

      setColor(color) {
        if (color) this.color = color;
        return this;
      },

      setPrivacy(privacy) {
        if (privacy) this.privacy = privacy;
        return this;
      },

      addEntry(entry) {
        if (!this.entries) this.entries = {};
        if (entry && entry.eventUID) {
          this.entries[entry.eventUID] = entry;
        }
        return this;
      }
    };
  }

  static createTask() {
    return {
      "@type": "Task",
      "eventUID": this.generateUID(),
      "created": new Date().toISOString(),
      "updated": new Date().toISOString(),

      // Optional fields with defaults omitted here, set via setters
      setRelatedTo(relatedTo) {
        if (relatedTo && relatedTo.length) this.relatedTo = relatedTo;
        return this;
      },

      setSequence(sequence) {
        if (sequence) this.sequence = sequence;
        return this;
      },

      setTitle(title) {
        if (title) this.title = title;
        return this;
      },

      setDescription(description) {
        if (description) this.description = description;
        return this;
      },

      setShowWithoutTime(show) {
        if (show) this.showWithoutTime = show;
        return this;
      },

      setLocations(locations) {
        if (locations && locations.length) this.locations = locations;
        return this;
      },

      setVirtualLocations(virtualLocations) {
        if (virtualLocations && virtualLocations.length) this.virtualLocations = virtualLocations;
        return this;
      },

      setKeywords(keywords) {
        if (keywords && keywords.length) this.keywords = keywords;
        return this;
      },

      setCategories(categories) {
        if (categories && categories.length) this.categories = categories;
        return this;
      },

      setColor(color) {
        if (color) this.color = color;
        return this;
      },

      setRecurrenceId(recurrenceId) {
        if (recurrenceId) this.recurrenceId = recurrenceId;
        return this;
      },

      setRecurrenceIdTimeZone(timeZone) {
        if (timeZone) this.recurrenceidTimeZone = timeZone;
        return this;
      },

      setRecurrenceRules(rules) {
        if (rules && rules.length) this.recurrenceRules = rules;
        return this;
      },

      setExcludeRecurrenceRules(excludeRules) {
        if (excludeRules && excludeRules.length) this.excludeReurrenceRules = excludeRules;
        return this;
      },

      setRecurrenceOverrides(overrides) {
        if (overrides && Object.keys(overrides).length) this.reurrenceOverrides = overrides;
        return this;
      },

      setExcluded(excluded) {
        if (excluded && excluded.length) this.excluded = excluded;
        return this;
      },

      setPriority(priority) {
        if (priority != null) this.priority = priority;
        return this;
      },

      setAlerts(alerts) {
        if (alerts && alerts.length) this.alerts = alerts;
        return this;
      },

      setUseDefaultAlerts(useDefault) {
        if (useDefault != null) this.useDefaultAlerts = useDefault;
        return this;
      },

      setTimeZone(tz) {
        if (tz) this.timeZone = tz;
        return this;
      },

      setTimeZones(tzs) {
        if (tzs && tzs.length) this.timeZones = tzs;
        return this;
      },

      setDue(due) {
        if (due) this.due = due;
        return this;
      },

      setStart(start) {
        if (start) this.start = start;
        return this;
      },

      setEstimatedDuration(duration) {
        if (duration) this.estimatedDuration = duration;
        return this;
      },

      setPercentComplete(percent) {
        if (percent != null) this.percentComplete = percent;
        return this;
      },

      setProgress(progress) {
        if (progress) this.progress = progress;
        return this;
      },

      setProgressUpdated(date) {
        if (date) this.progressUpdated = date;
        return this;
      },
    };
  }

  static createEvent() {
    return {
      "@type": "Event",
      "eventUID": this.generateUID(),
      "created": new Date().toISOString(),
      "updated": new Date().toISOString(),

      setRelatedTo(relatedTo) {
        if (relatedTo && relatedTo.length) this.relatedTo = relatedTo;
        return this;
      },

      setSequence(sequence) {
        if (sequence !== 0 && sequence != null) this.sequence = sequence;
        return this;
      },

      setTitle(title) {
        if (title) this.title = title;
        return this;
      },

      setDescription(description) {
        if (description) this.description = description;
        return this;
      },

      setShowWithoutTime(show) {
        if (show) this.showWithoutTime = show;
        return this;
      },

      setLocations(locations) {
        if (locations && locations.length) this.locations = locations;
        return this;
      },

      setVirtualLocations(virtualLocations) {
        if (virtualLocations && virtualLocations.length) this.virtualLocations = virtualLocations;
        return this;
      },

      setKeywords(keywords) {
        if (keywords && keywords.length) this.keywords = keywords;
        return this;
      },

      setCategories(categories) {
        if (categories && categories.length) this.categories = categories;
        return this;
      },

      setColor(color) {
        if (color) this.color = color;
        return this;
      },

      setRecurrenceId(recurrenceId) {
        if (recurrenceId) this.recurrenceId = recurrenceId;
        return this;
      },

      setRecurrenceIdTimeZone(timeZone) {
        if (timeZone) this.recurrenceidTimeZone = timeZone;
        return this;
      },

      setRecurrenceRules(rules) {
        if (rules && rules.length) this.recurrenceRules = rules;
        return this;
      },

      setExcludeRecurrenceRules(excludeRules) {
        if (excludeRules && excludeRules.length) this.excludeReurrenceRules = excludeRules;
        return this;
      },

      setRecurrenceOverrides(overrides) {
        if (overrides && Object.keys(overrides).length) this.reurrenceOverrides = overrides;
        return this;
      },

      setExcluded(excluded) {
        if (excluded && excluded.length) this.excluded = excluded;
        return this;
      },

      setPriority(priority) {
        if (priority != null) this.priority = priority;
        return this;
      },

      setAlerts(alerts) {
        if (alerts && alerts.length) this.alerts = alerts;
        return this;
      },

      setUseDefaultAlerts(useDefault) {
        if (useDefault != null) this.useDefaultAlerts = useDefault;
        return this;
      },

      setTimeZone(tz) {
        if (tz) this.timeZone = tz;
        return this;
      },

      setTimeZones(tzs) {
        if (tzs && tzs.length) this.timeZones = tzs;
        return this;
      },

      setStart(start) {
        if (start) this.start = start;
        return this;
      },

      setDuration(duration) {
        if (duration) this.duration = duration;
        return this;
      },

      setShowWithoutTime(show) {
        if (show) this.showWithoutTime = show;
        return this;
      },

      setStatus(status) {
        if (status) this.status = status;
        return this;
      },
    };
  }

  // Removes fields with default values, nulls, empty strings, or empty arrays
  static cleanForSerialization(obj) {
    const defaults = {
      sequence: 0,
      showWithoutTime: false,
    };
    const cleaned = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'function') continue;
      if (value === null || value === undefined) continue;
      if (value === '') continue;
      if (Array.isArray(value) && value.length === 0) continue;
      if (key in defaults && value === defaults[key]) continue;
      cleaned[key] = value;
    }
    return cleaned;
  }

  // Serializes a JSCalendar object to a JSON string, omitting defaults and empty values
  static toJSON(jsCalObject) {
    return JSON.stringify(this.cleanForSerialization(jsCalObject), null, 2);
  }

  static generateUID() {
    return uuidv4();
  }
}

export default JSCalendarFactory;