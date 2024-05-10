export default defineStore({
  id: 'user',
  state: () => {
    return {
      userInfo: {
        token: '',
      }
    } as {
      userInfo: User.UserInfo;
    };
  },
  getters: {
    token:(state) => {
      return state.userInfo.token;
    },
  },
  actions: {
    setUserInfo(userInfo: User.UserInfo) {
      Object.assign(this.userInfo, userInfo);
    }
  }
});
