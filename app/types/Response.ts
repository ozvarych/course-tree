export enum StatusType {
  ERROR = "ERROR",
  OK = "OK",
}

export type Response = {
  message: string;
  status: StatusType;
  data?: any;
};
