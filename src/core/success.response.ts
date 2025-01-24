import { HttpStatus } from "@nestjs/common";
import { response } from "express";

const ReasonStatusCode = {
  OK: 'Success',
  CREATED: 'Created',
}

export class SuccessResponse {
  // Định nghĩa các thuộc tính của class
  statusCode: number;
  message: string;
  data: {};

  // Hàm khởi tạo giá trị mặc định cho các thuộc tính

  constructor({ statusCode, message, metadata }) {
    this.message = !message ? ReasonStatusCode.OK : message;
    this.statusCode = !statusCode ? HttpStatus.OK : statusCode;
    this.data = metadata;
  }

  send() {
    return response.status(this.statusCode).json(this)
  }
}

export class CreatedResponse extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ statusCode: HttpStatus.CREATED, message, metadata });
  }
}