import { LOGGING_ENABLED } from "../../utilities/properties/base.property";

export function logData(data: any) {
    if (LOGGING_ENABLED) {
        console.log(data);
    }
}
