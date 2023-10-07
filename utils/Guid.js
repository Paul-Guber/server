"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guid_ts_1 = require("guid-ts");
const returnGuid = () => guid_ts_1.Guid.newGuid().toString();
exports.default = returnGuid;
