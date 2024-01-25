import { ErrorCode, errorCodes } from './errorCodes';
import SharpTalksModal from '../features/Chat/components/modalOption';
import { ActionOption } from '../features/Chat/enums/actionOption';
import { modalTexts } from '../store/models/common/Modal';
import { t } from './i18n';

export class ErrorHandler {
  static handleNoMoneyError(e: ErrorCode) {
    if (e === errorCodes.ERR_TWILIO_NO_MONEY) {
      SharpTalksModal.show({
        action: ActionOption.ERROR,
        modal: modalTexts.notEnoughMoney,
        withArguments: false,
        defaultButtonTitle: t('COMMON.ACTIONS.OK_I_UNDERSTOOD'),
      });
    }
  }

  public static handleNetworkError() {
    SharpTalksModal.showError();
  }
}
