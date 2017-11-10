
import { observable, action } from 'mobx';

class userInfo {
    @observable isLogin = false;
    @observable userName = '测试';
    @observable phoneNumber = '13899996666';

    @action testAction() {

    }

}

export default new userInfo();