import { SCORM_API, RUNTIME_SERVICE } from "../src/types";

export declare global {
  interface Window {
    API: SCORM_API;
    scrolwRuntime: RUNTIME_SERVICE
  }
}