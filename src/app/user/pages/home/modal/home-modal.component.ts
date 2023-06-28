import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from '../../../../services/orders.service';
import { Product } from '../../../../interfaces/stock/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'admin-orders-modal',
  templateUrl: 'home-modal.component.html',
  styleUrls: ['./home-modal.component.scss'],
})
export class HomeModalComponent implements OnInit {
  form: FormGroup;
  chosenProducts: Product[] = [];
  client: string;

  constructor(
    public dialogRef: MatDialogRef<HomeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ordersService: OrdersService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.chosenProducts = this.sortAlphabetically(data.chosenProducts);
    this.client = data.client
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({});
  }

  createOrder(products) {
    const order = {
      is_sent: false,
      partially_added_to_stock: false,
      completely_added_to_stock: false,
      client: this.client,
    };

    this.ordersService.createOrder(order).subscribe(
      (orderResponse) => {
        const orderItems = products.map((product) => {
          return {
            product: product.id,
            quantity: product.quantity,
            added_quantity: 0,
            order: orderResponse.id,
          };
        });

        this.ordersService.createOrderItems(orderItems).subscribe(
          (orderItemsResponse) => {
            this.snackBar.open('Pedido feito!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          },
          (error) => {
            this.snackBar.open('Erro ao criar itens do pedido.', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
        );
      },
      (error) => {
        this.snackBar.open('Erro ao criar pedido.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    );
  }

  sortAlphabetically(list) {
    return list.sort((a, b) => a?.name?.localeCompare(b?.name));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    this.dialogRef.close();
    this.createOrder(this.chosenProducts)
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
