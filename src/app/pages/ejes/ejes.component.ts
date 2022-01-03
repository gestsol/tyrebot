import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ejes',
  templateUrl: './ejes.component.html',
  styleUrls: ['./ejes.component.css']
})
export class EjesComponent implements OnInit {
  cantidad = 0;
  elements = Array(0); 
  constructor(private route: ActivatedRoute, private router: Router) {
		this.route.queryParams.subscribe(
		  params => {
			this.cantidad =  params['cantidad'];
			this.elements = Array(parseInt(params['cantidad'])); 
		  }
		)

  }

  ngOnInit(): void {
  }
  
   volver(){
	  this.router.navigate(['/addVehicle'])
   }

}
