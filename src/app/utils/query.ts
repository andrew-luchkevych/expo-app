export function isPlainObject(obj: any): obj is object {
    if (typeof obj !== "object" || obj === null) return false;

    let proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}

export function stripUndefined(obj: any) {
    if (!isPlainObject(obj)) {
        return obj;
    }

    const copy: Record<string, any> = { ...obj };
    for (const [k, v] of Object.entries(copy)) {
        if (v === undefined) delete copy[k];
    }

    return copy;
}
