import Vue from 'vue'
import Router from 'vue-router'

import Main from '../Main.vue'
import Home from '../components/Home.vue'
import Draw from '../components/Draw.vue'
import Setting from '../components/Setting.vue'
import Article from '../components/Article.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Main',
    component: Main,
    children: [{
      path: '/Home',
      name: 'Home',
      component: Home
    }, {
      path: '/Draw',
      name: 'Draw',
      component: Draw
    }, {
      path: '/Setting',
      name: 'Setting',
      component: Setting
    }, {
      path: '/Article',
      name: 'Article',
      component: Article
    }]
  }]
})
