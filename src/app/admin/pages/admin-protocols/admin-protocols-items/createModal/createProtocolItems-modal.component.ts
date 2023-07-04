import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ProtocolsModalData {
  products: [];
  protocolId;
}

@Component({
  selector: 'createProtocolItems-modal',
  templateUrl: 'createProtocolItems-modal.component.html',
  styleUrls: ['./createProtocolItems-modal.component.scss'],
})
export class CreateProtocolItemsModalComponent implements OnInit {
  formCreateProtocolItems: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateProtocolItemsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProtocolsModalData,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  createForm() {
    this.formCreateProtocolItems = this.formBuilder.group({
      product: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if (this.formCreateProtocolItems.invalid) return;

    const createProtocolItemData = this.formCreateProtocolItems.getRawValue();

    createProtocolItemData.original_quantity = createProtocolItemData.quantity;
    createProtocolItemData.protocol = this.data.protocolId;

    this.stocksService.createProtocolItem(createProtocolItemData).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        this.snackBar.open('Erro ao criar item!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
    );
  }
}