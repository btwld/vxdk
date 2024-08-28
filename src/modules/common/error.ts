import { StringUtils } from './utils';

export enum ErrorCodes {
  UNKNOWN = 9999,
  NO_SUPPORTED_FORMAT_FOUND = 1001,
  CONTROLLER_LOAD_FAILED = 1002,
  NOT_IMPLEMENTED = 1003,

  PLAYBACK_CRITICAL_ERROR = 2001,
}

export class VxdkError extends Error {
  public code: ErrorCodes = ErrorCodes.UNKNOWN;

  public underlyingError: any;

  constructor(input: ErrorCodes | string, error?: any) {
    super();

    if (StringUtils.isString(input)) {
      this.message = input as string;
    } else {
      this.code = input as ErrorCodes;
    }

    this.underlyingError = error;
  }
}
