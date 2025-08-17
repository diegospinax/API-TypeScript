import { Response } from "express";

const handleError = (message: string, res: Response): Response => {
  return res.status(400).json({ message });
};

const handleControllerError = (res: Response, error: Error): Response => {
  return res.status(400).json({ message: "CONTROLLER error.", error });
};

export {handleError, handleControllerError};
