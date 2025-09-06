import { ICalendarEvent } from "../actions";

const formatDate = (date: string | Date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

// interface CalendarEvent {
//   _id: string;
//   [key: string]: any;
// }

const deepCopy = (inObject: any) => {
  // let outObject, value, key;
  let value, key;
  // let outObject: Array<CalendarEvent> | { [key: string]: any };
  let outObject: Array<ICalendarEvent> = [];

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  // outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];
    // Recursively (deep) copy for nested objects, including arrays
    outObject[key as any] = deepCopy(value);
  }

  return outObject;
}

export { formatDate, deepCopy };
