import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError, map, BehaviorSubject } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
    providedIn: 'root'
})
export class productAPIService {
    all_products: any; db: any;
    noibat_products: any;
    banchay_products: any;
    hangmoi_products: any;
    bepretty_products: any;
    tet_products: any;
    daychuyen_products: any;
    nhan_products: any;
    vongtay_products: any;
    bongtai_products: any;

    categories: any = ["Tất cả", "Nổi bật", "Bán chạy", "Hàng mới về", "Hàng Tết", "Be Pretty", "Nhẫn", "Dây chuyền", "Bông tai", "Vòng tay"];
    routes: any = ["all", "hang-noi-bat", "hang-ban-chay", "hang-moi-ve", "hang-tet", "be-pretty", "nhan", "day-chuyen", "bong-tai", "vong-tay"];

    constructor(private _http: HttpClient) {
        this.bepretty_products = this.track_products("bepretty");
        this.tet_products = this.track_products("tet-products");
        this.noibat_products = this.track_products("outstanding_products");
        this.hangmoi_products = this.track_products("newest_products")
        this.banchay_products = this.track_products("bestseller_products");
        this.daychuyen_products = this.track_products("daychuyen");
        this.nhan_products = this.track_products("nhan");
        this.vongtay_products = this.track_products("vongtay");
        this.bongtai_products = this.track_products("bongtai");
        this.all_products = [].concat(this.noibat_products, this.banchay_products, this.hangmoi_products, this.tet_products, this.bepretty_products, this.nhan_products, this.daychuyen_products, this.bongtai_products, this.vongtay_products,);
        this.db = {
            "Tất cả": this.all_products,
            'Nổi bật': this.noibat_products,
            'Bán chạy': this.banchay_products,
            'Hàng mới về': this.hangmoi_products,
            'Hàng Tết': this.tet_products,
            'Be Pretty': this.bepretty_products,
            'Nhẫn': this.nhan_products,
            'Dây chuyền': this.daychuyen_products,
            'Bông tai': this.bongtai_products,
            'Vòng tay': this.vongtay_products
        }
    }
    
    get_products(category: string): Observable<any> {
        const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
        const requestOptions: Object = {
            headers: headers,
            responseType: "text"
        }
        return this._http.get<any>("http://localhost:3002/" + category, requestOptions).pipe(
            map(res => JSON.parse(res) as Array<Product>),
            retry(3),
            catchError(this.handleError)
            )
        }
        
        get_routesList() {
            let dict: { [key: string]: any } = {};
            for (let i = 0; i < this.categories.length; i++)
            dict[this.categories[i]] = this.routes[i];
        dict["Tất cả"] = "all";
        return dict;
        //     {Be Pretty: "be-pretty"
        //     Bán chạy: "hang-ban-chay",
        //     Bông tai: "bong-tai",
        //     Dây chuyền: "day-chuyen",
        //     Hàng Tết: "hang-tet",
        //     Hàng mới về: "hang-moi-ve",
        //     Nhẫn: "nhan",
        //     Nổi bật: "hang-noi-bat",
        //     Tất cả: "all",
        //     Vòng tay: "vong-tay"}
    }
    
    track_products(category: string) {
        let products_lst: any;
        this.get_products(category).subscribe(res => {
            products_lst = res;
        });
        return products_lst;
    }
    
    get_productDetail(id: any) {
        return this.all_products.filter((product: any) => product._id === id)[0];
    }
    
    get_randomProducts(products: any, product: any) {
        let randomIndices: any[] = [];
        while (randomIndices.length < 4) {
            const randomIndex = Math.floor(Math.random() * products.length);
            if (!randomIndices.includes(randomIndex) && products.indexOf(product) != randomIndex) {
                randomIndices.push(randomIndex);
            }
        }
        return randomIndices.map(index => products[index]);
    }

    handleError(error: HttpErrorResponse) {
        return throwError(() => new Error(error.message))
    }

}