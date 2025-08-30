export const generateCacheKey = {
  /**
   * @param phone
   * @returns key
   */
  otpKey(phone: string) {
    return 'OTP_' + phone;
  },
  /**
   * @param ip
   * @returns key
   */
  logIpRequestSendSms(ip: string) {
    return 'SMS_SENDED_' + ip;
  },
  /**
   * @param phone
   * @returns key
   */
  tokenOtpVerified(phone: string) {
    return 'OTP_VERIFIED_' + phone;
  },
};
