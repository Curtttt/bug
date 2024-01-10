import { Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { PromotionComponent } from './pages/promotion/promotion.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SignInComponent } from './pages/account/sign-in/signin.component';
import { SignUpComponent } from './pages/account/sign-up/sign-up.component';
import { Blog1Component } from './pages/blog/blogDetail/blog1/blog1.component';
import { Blog2Component } from './pages/blog/blogDetail/blog2/blog2.component';
import { Blog3Component } from './pages/blog/blogDetail/blog3/blog3.component';
import { Blog4Component } from './pages/blog/blogDetail/blog4/blog4.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { DashboardComponent } from './pages/account/dashboard/dashboard.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'cart', component: CartComponent},
    {path: 'promotion', component: PromotionComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog', children:[
        {'path': 'tac-dung-khong-tuong-cua-bac-925-se-lam-ban-bat-ngo', component: Blog1Component},
        {'path': 'lam-the-nao-de-bao-quan-trang-suc-bac', component: Blog2Component},
        {'path': 'tai-sao-bac-lai-bi-den', component: Blog3Component},
        {'path': 'di-ung-bac-tu-dau', component: Blog4Component}
    ]},
    {path: 'contact', component: ContactComponent},
    {path: 'about', component: AboutComponent},
    {path: 'products/:collection', component: ProductListComponent},
    {path: 'products/:collection/:id', component: ProductDetailComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];
