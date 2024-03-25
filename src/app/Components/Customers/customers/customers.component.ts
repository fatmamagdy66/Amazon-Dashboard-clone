import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CostumersService } from 'src/app/Services/Customers-Service/costumers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  public result : any[]=[];
    
  constructor(
    private router: Router,
    private costumers:CostumersService,
    private http: HttpClient
  ){}

ngOnInit(): void {
  this.costumers.getCostumer().subscribe(
    (res:any)=>{

      console.log(res);
      this.result = res.customers;

    },(err)=>{
      console.log(err);
    }
  )
}

public formatPrice(price:any) {
  if (typeof price === 'string') {
   
    if (price.includes('$')) {
      
      return price.replace('$', '') + '$';
    } else {
      
      return price + '$';
    }
  } else if (typeof price === 'number') {
    
    return price.toString() + '$';
  } else {
   
    return 'N/A';
  }
}

public  formatReadableDate(dateString:any) {
  const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

  const date = new Date(dateString);

  return date.toLocaleString('en-US', options);
}

public navigateTo(id:string){

  this.router.navigate(['customers',id]);
  
}

}
