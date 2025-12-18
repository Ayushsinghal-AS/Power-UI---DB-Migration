const express = require("express");
const { successHandler, errorHandler } = require("../../utils/responseHandler");
const getMessage = require("../../message");
const { createUserQuery } = require("../../query/userQuery");


exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const result = await createUserQuery(userData);
    console.log("User created successfully:", result);

    return successHandler({
      res,
      data: result,
      statusCode: 201,
      message: getMessage("M001"),
    });
  } catch (error) {
    let message = "Something went wrong";

    if (error.code === "23505") {
      message = "Email already exists";
    }

    return errorHandler({
      res,
      statusCode: 400,
      message,
    });
  }
};