---
layout: null
---
let version = "{{site.time | date: "%Y%m%d%H%M%S"}}"
let baseUrl = '{{site.baseurl}}'

// let version = '001'
// let baseUrl = ''

let cachePrefix = 'blog_'
let cacheKey = cachePrefix + version

// skipWaiting ayarı yapılmazsa, güncellemeden sonra service worker bekleme durumuna girer ve eski service worker etkin olmaya devam eder. Bu durum, eski service worker'ın artık hiçbir client'ı kontrol etmediği ana kadar sürer, örneğin tarayıcı kapatılırsa. Bu durumda sayfa yeniden açıldığında yeni service worker devreye girer.
// skipWaiting ayarı yapıldığında, güncelleme hemen etkinleşir. Bu durumda, bir sayfa önce sw-v1 tarafından kontrol edilirken, sonrasında sw-v2 tarafından kontrol edilmeye başlar. Programınızın farklı service worker sürümlerini kullanma durumunu iyi yönetmesi gerekir.
self.skipWaiting()

self.addEventListener('install', function (event) {
  console.log('serviceWorker install')
  event.waitUntil(
    fetch(baseUrl + '/index.html')
      .then(resp => resp.text())
      .then(html => {
        let reg = /(href|src)=\"(.+?)\"/g // 匹配链接
        let reg2 = /#.*/ // 去除hash
        let urls = []
        let match
        while ((match = reg.exec(html)) !== null) {
          urls.push(match[2])
        }
        urls = urls.map(url => url.replace(reg2, ''))
        urls = urls.filter(url => !url.startsWith('http') && url.startsWith(baseUrl))
        urls = Array.from(new Set(urls))

        caches.open(cacheKey).then(function (cache) {
          cache.addAll(urls)
        })
      })
  )
})

// fetch根据的是cacheKey进行分组，无需等待event.waitUntil
self.addEventListener('activate', function (event) {
  console.log('serviceWorker activate')

  caches.keys().then(keys => {
    keys.forEach(key => {
      if (key.startsWith(cachePrefix) && key != cacheKey) caches.delete(key)
    })
  })
})

this.addEventListener('fetch', function (event) {
  if (new URL(event.request.url).origin != self.origin) {
    return
  }
  event.respondWith(
    caches
      .open(cacheKey)
      .then(cache => cache.match(event.request))
      .then(data => {
        if (data) return data
        return fetch(event.request)
      })
  )
})
