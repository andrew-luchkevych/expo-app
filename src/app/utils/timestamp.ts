import moment, { Moment } from "moment";

const timestampLength = 13;
export const getFixedTimestamp = (ts: number): number => {
    const l = ts.toString().length;
    const diff = l - timestampLength;
    return diff < 0
        ? Number(`${ts}${"0".repeat(timestampLength - l)}`)
        : diff > 0
          ? Number(ts.toString().slice(0, diff))
          : ts;
};

export const tsToMoment = (ts: number): Moment => moment(getFixedTimestamp(ts));
