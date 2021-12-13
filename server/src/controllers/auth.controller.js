const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = await tokenService.generateEmailVerificationToken(user);
  await emailService.emailVerificationEmail(token);
  res.status(httpStatus.NO_CONTENT).send();
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log('email-address', email);
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  // if (!user.is_email_verified) {
  //   const token = await tokenService.generateEmailVerificationToken(user);
  //   await emailService.emailVerificationEmail(user.email, token);
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification is pending. please verify your email');
  // } else {
  //   const tokens = await tokenService.generateAuthTokens(user);
  //   res.send({ user, tokens });
  // }
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const emailVerification = catchAsync(async (req, res) => {
  await authService.emailVerification(req.params.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  emailVerification,
};
