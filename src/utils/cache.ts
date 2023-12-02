enum CacheType {
  Local,
  Session
}

class CacheLocal {
  storage: Storage
  constructor(type: CacheType) {
    this.storage = CacheType.Local === type ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch (error) {
        return value
      }
    }
  }

  deleteCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new CacheLocal(CacheType.Local)
const sessionCache = new CacheLocal(CacheType.Session)

export { localCache, sessionCache }
