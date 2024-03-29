import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProtocolService } from '../../../../services/protocol.service';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Supplier {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

export interface ProtocolsModalData {
  suppliers: Supplier[];
  categories: Category[];
}

@Component({
  selector: 'create-protocols-modal',
  templateUrl: 'create-protocols-modal.component.html',
  styleUrls: ['./create-protocols-modal.component.scss'],
})
export class CreateProtocolsModalComponent implements OnInit {
  formCreateProtocols: FormGroup;
  selectedFile: File;

  constructor(
    public dialogRef: MatDialogRef<CreateProtocolsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProtocolsModalData,
    private formBuilder: FormBuilder,
    public protocolService: ProtocolService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formCreateProtocols = this.formBuilder.group({
      code: ['', [Validators.required]],
      supplier: ['', [Validators.required]],
      category: ['', [Validators.required]],
      initial_date: ['', [Validators.required]],
      final_date: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onClick(): void {
    const protocolData = this.formCreateProtocols.value;
    const startDate = new Date(protocolData.initial_date);
    const endDate = new Date(protocolData.final_date);
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();

    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('code', protocolData.code);
    formData.append('supplier', protocolData.supplier);
    formData.append('category', protocolData.category);
    formData.append('start_date', formattedStartDate);
    formData.append('end_date', formattedEndDate);

    this.protocolService.createProtocol(formData).subscribe(
      (response) => {
        this.snackBar.open(
          snackbarConsts.admin.protocols.create.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      (error) => {
        this.snackBar.open(
          snackbarConsts.admin.protocols.create.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      },
    );
  }
}
