export enum ENotification {
  REQUEST_ADD_COMPANY = '会社の追加をリクエストする',
  REQUEST_ADD_FAMILY = '家族の追加を受け入れる',
  ACCEPT_REQUEST_ADD_FAMILY = '家族に加わることに同意する',
  EMERGENCY_CALL = '緊急電話',
  CIRCULAR_NEW = '新しい回覧板',
  CHECK_IN = 'チェックイン',
  LIVE_SHARING = '位置情報のライブ共有',
  APPROVE_EMERGENCY_CALL = '緊急通報が受信されました',
  REJECT_EMERGENCY_CALL = '緊急通報が拒否されました',
}

export enum NOTIFICATION_TYPE {
  REQUEST_ADD_COMPANY = 'REQUEST_ADD_COMPANY',
  REQUEST_ADD_FAMILY = 'REQUEST_ADD_FAMILY',
  ACCEPT_REQUEST_ADD_FAMILY = 'ACCEPT_REQUEST_ADD_FAMILY',
  EMERGENCY_CALL = 'EMERGENCY_CALL',
  CIRCULAR_NEW = 'CIRCULAR_NEW',
  CHECK_IN = 'CHECK_IN',
  LIVE_SHARING = 'LIVE_SHARING',
  REJECT_EMERGENCY_CALL = 'REJECT_EMERGENCY_CALL',
  APPROVE_EMERGENCY_CALL = 'APPROVE_EMERGENCY_CALL',
}

export enum NOTIFICATION_DATA_TO_TYPE {
  USER = 'USER',
  ALL = 'ALL',
  GROUP = 'GROUP',
  FAMILY = 'FAMILY',
  ADMIN = 'ADMIN',
}

export const generateNotificationBody = {
  addCompany() {
    return `警備会社に依頼したい`;
  },
  addFamily(requestUser: string) {
    return `${requestUser}さんがあなたを家族に加えたいと考えています!`;
  },
  acceptAddFamily(acceptUser: string) {
    return `${acceptUser}さんはあなたの家族に加わることに同意しました!`;
  },
  emergencyCall(requestUser: string) {
    return `${requestUser}さんが緊急電話をかけた`;
  },
  checkIn(requestUser: string) {
    return `${requestUser}さんが新しい投稿を追加しました`;
  },
  liveSharing(requestUser: string) {
    return `${requestUser}は位置情報のライブ共有です`;
  },

  approveEmergency(companyName: string) {
    return `${companyName}があなたの緊急通報を受信しました`;
  },
  rejectEmergency(companyName: string) {
    return `${companyName}はあなたの緊急通報を拒否しました`;
  },
};

export enum EMERGENCY_STATUS {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  PENDING = 'PENDING',
}
