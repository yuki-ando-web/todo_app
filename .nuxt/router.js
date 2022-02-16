import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ad73af60 = () => interopDefault(import('../pages/itiran.vue' /* webpackChunkName: "pages/itiran" */))
const _377e7eae = () => interopDefault(import('../pages/todos.vue' /* webpackChunkName: "pages/todos" */))
const _7075a7f9 = () => interopDefault(import('../pages/about/_id.vue' /* webpackChunkName: "pages/about/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/itiran",
    component: _ad73af60,
    name: "itiran"
  }, {
    path: "/",
    component: _377e7eae,
    name: "todos"
  }, {
    path: "/about/:id?",
    component: _7075a7f9,
    name: "about-id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
