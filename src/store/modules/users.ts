import {
  getModule,
  Module,
  MutationAction,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import store from '@/store';
import { Profile, User, UserSubmit, UserForUpdate, UserRegister, RegistrationResponse } from '../models';
import {
  fetchProfile, fetchUser, loginUser, updateUser, setAuthHeader,
  clearAuthHeader, conduitApi, registerUser,
} from '../../app-shared/services/api.service';
import { saveToken, getToken, destroyToken } from '@/app-shared/services/Jwt.service';
@Module({
  namespaced: true,
  name: 'users',
  store,
  dynamic: true,
})
class UsersModule extends VuexModule {
  public user: User = {} as User;
  public profile: Profile | null = null;

  get username() {
    return (this.user && this.user.username) || null;
  }

  get getuser() {
    return this.user || {};
  }
  get fetchProfile() {
    return (this.profile) || null;
  }
  get isAuthenticated() {
    return !!this.user;
  }


  @MutationAction
  public async login(userSubmit: UserSubmit) {
    const user = await loginUser(userSubmit);
    saveToken(user.token);
    setAuthHeader();
    return { user };
  }

  @MutationAction
  public async loadProfile(username: string) {
    const profile = await fetchProfile(username);
    return { profile };
  }

  @MutationAction
  public async loadUser() {
    const user = await fetchUser();
    return { user };
  }

  @MutationAction
  public async checkAuth() {
    const checkAuth = !!getToken();
    let user;
    if (checkAuth) {
      setAuthHeader();
      user = await fetchUser();
      return { user };
    } else {
      destroyToken();
      clearAuthHeader();
      return { user };
    }
  }

  @Action({ rawError: true })
  public async register(credentials: UserRegister) {
    const response: RegistrationResponse = await registerUser(credentials);
    if (response.user) {
      saveToken(response.user.token);
      setAuthHeader();
    }
    this.context.commit('initUserOnRegister', response);
    return { user: {response} };
  }

  @Mutation
  public async initUserOnRegister(response: RegistrationResponse) {
    this.user = response.user;
  }

  @MutationAction
  public async updateSelfProfile(userUpdateFields: UserForUpdate) {
    const user = await updateUser(userUpdateFields);
    return { user };
  }
}

export default getModule(UsersModule);
