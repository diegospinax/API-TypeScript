import { Response } from "express";
import { CreateUserDto } from "../../dto/user/create-user.dto";
import {
  emailRegexList,
  nameRegexList,
  passwordRegexList,
} from "../regex/user.regex";
import { handleError } from "../error/handle-error";

export const userCreationValidation = (
  userDto: CreateUserDto,
  res: Response
): Response | null => {
  if (!nameRegexList.createRegex.test(userDto.name.trim())) {
    return handleError("Nombre inválido.", res);
  }
  if (!emailRegexList.createRegex.test(userDto.email.trim())) {
    return handleError("Email inválido.", res);
  }
  if (!passwordRegexList.createRegex.test(userDto.password.trim())) {
    return handleError(
      "Contraseña debe tener letras y por lo menos 1 número.",
      res
    );
  }

  return null;
};

export const userUpdateValidation = (
  userDto: CreateUserDto,
  res: Response
): Response | null => {
  if (!nameRegexList.updateRegex.test(userDto.name.trim())) {
    return res.status(400).json({
      message: "Nombre inválido.",
    });
  }
  if (!emailRegexList.updateRegex.test(userDto.email.trim())) {
    return res.status(400).json({
      message: "Email inválido.",
    });
  }
  if (!passwordRegexList.updateRegex.test(userDto.password.trim())) {
    return res.status(400).json({
      message: "Contraseña inválida.",
    });
  }

  return null;
};
