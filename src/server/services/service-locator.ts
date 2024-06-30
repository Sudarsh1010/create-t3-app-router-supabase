import { AuthRepository } from "~/server/repositories/auth-respository";
import { PostsRepository } from "~/server/repositories/posts-repository";

import { AuthenticationService } from "./authentication-service";
import { PostsService } from "./posts-service";

export class ServiceLocator {
  private static _cache: Record<string, any>;
  private static _repoCache: Record<string, any>;

  static {
    this._cache = {};
    this._repoCache = {};
  }

  static getService(name: string) {
    const service = this._cache[name];

    if (!!service) {
      return service;
    }

    if (name === AuthenticationService.name) {
      let authRepository: AuthRepository = this._repoCache[AuthRepository.name];

      if (!!!authRepository) {
        authRepository = new AuthRepository();
        this._repoCache[AuthRepository.name] = authRepository;
      }

      const authService = new AuthenticationService(authRepository);
      this._cache[name] = authService;
      return authService;
    }

    if (name === PostsService.name) {
      let postsRepository: PostsRepository =
        this._repoCache[PostsRepository.name];

      if (!!!postsRepository) {
        postsRepository = new PostsRepository();
        this._repoCache[PostsRepository.name] = postsRepository;
      }

      const postsSerivce = new PostsService(postsRepository);
      this._cache[name] = postsSerivce;
      return postsSerivce;
    }
  }
}
