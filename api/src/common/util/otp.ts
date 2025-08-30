export const generateOtp = () => {
  return (Math.random() * 10 ** 6).toFixed(0);
};

export const generateOtpMessage = (otp: string) => {
  return 'あなたのOTPは ' + otp;
};
