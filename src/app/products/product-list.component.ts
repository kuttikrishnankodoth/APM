import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";


@Component({

  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  filteredProducts: IProduct[];
  errorMessge: string = '';
  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.perFormFilter(this.listFilter) : this.products;
  }

  products: IProduct[];

  constructor(private productService: ProductService) {

  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  perFormFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    var filteredData = this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
    return filteredData;
  }
  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products
      this.filteredProducts = this.products;
    }, error => this.errorMessge = <any>error);

  }
}