/**
 * Vue Router
 * @description: Vue Router configuration
 * @docs: https://router.vuejs.org/
 */
import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import BillsComponent from "../bills/pages/bills.component.vue";
import {authenticationGuard} from "../iam/services/authentication.guard.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/home",    name: 'home',       component: HomeComponent,       meta: { title: "Home"}},
        { path: '/sign-in', name: 'sign-in',    component: SignInComponent,     meta: { title: 'Sign In' } },
        { path: '/sign-up', name: 'sign-up',    component: SignUpComponent,     meta: { title: 'Sign Up' } },
        { path: '/bills',   name: 'bills',      component: BillsComponent,      meta: { title: 'Bills' } },
        { path: "/",        redirect: "/home"},
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'Billetera Virtual';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    // Call the authentication guard
    authenticationGuard(to, from, next);
});

export default router;