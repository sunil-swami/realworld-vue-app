import {
  getModule,
  Module,
  MutationAction,
  VuexModule,
} from 'vuex-module-decorators';
import store from '@/store';
import { Profile, User, UserSubmit, UserForUpdate } from '../models';
import { fetchProfile, fetchUser, loginUser, updateUser, setAuthHeader , clearAuthHeader } from '../../app-shared/services/api.service';
import {saveToken , getToken , destroyToken} from '@/app-shared/services/Jwt.service';
@Module({
  namespaced: true,
  name: 'users',
  store,
  dynamic: true,
})
class UsersModule extends VuexModule {
  public user: User | null = null;
  public profile: Profile | null = null;
  get username() {
    return (this.user && this.user.username) || null;
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
    if (getToken()) {
      setAuthHeader();
      const user = await fetchUser();
      return { user };
    } else {
      destroyToken();
      clearAuthHeader();
    }
  }

  @MutationAction
  public async updateSelfProfile(userUpdateFields: UserForUpdate) {
    const user = await updateUser(userUpdateFields);
    return { user };
  }
}

export default getModule(UsersModule);
