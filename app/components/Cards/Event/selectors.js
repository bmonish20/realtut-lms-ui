import _get from "lodash/get";

export const hostedBy = hostedBy => _get(hostedBy, 'name', 'RealTuT Trainer');