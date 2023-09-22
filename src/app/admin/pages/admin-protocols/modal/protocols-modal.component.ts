import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  protocolId?: any;
}

@Component({
  selector: 'protocols-modal',
  templateUrl: 'protocols-modal.component.html',
  styleUrls: ['./protocols-modal.component.scss'],
})
export class ProtocolsModalComponent implements OnInit {
  formProtocols: FormGroup;
  selectedFile: File;
  protocolId?: number;
  hasChanges: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProtocolsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProtocolsModalData,
    private formBuilder: FormBuilder,
    public protocolService: ProtocolService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.protocolId = this.data.protocolId;
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createForm() {
    this.formProtocols = this.formBuilder.group({
      code: [this.data.protocolId.code],
      supplier: [this.data.protocolId.supplier.id],
      category: [this.data.protocolId.category.id],
      file: [this.data.protocolId.file.name],
      initial_date: [this.data.protocolId.initial_date],
      final_date: [this.data.protocolId.final_date],
    });
  }

  notEmpty(content: any) {
    return content ? content : '';
  }

  getChangedProperties(): any {
    const formValue = this.formProtocols.getRawValue();
    const changedProperties: any = {};

    Object.entries(formValue).forEach(([key, value]) => {
      if (value !== this.data.protocolId[key]) {
        changedProperties[key] = value;
        this.hasChanges = true;
      } else {
        this.hasChanges = false;
      }
    });

    return changedProperties;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    const protocolData = this.getChangedProperties();
    const formData: FormData = new FormData();

    if (protocolData.code) {
      formData.append('code', protocolData.code);
    }
    if (protocolData.supplier) {
      formData.append('supplier', protocolData.supplier);
    }
    if (protocolData.category) {
      formData.append('category', protocolData.category);
    }
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
    if (protocolData.initial_date) {
      const startDate = new Date(protocolData.initial_date);
      const formattedStartDate = startDate.toISOString();
      formData.append('start_date', formattedStartDate);
    }
    if (protocolData.final_date) {
      const endDate = new Date(protocolData.final_date);
      const formattedEndDate = endDate.toISOString();
      formData.append('end_date', formattedEndDate);
    }

    this.protocolService.patchProtocol(this.protocolId, formData).subscribe(
      (response) => {
        this.snackBar.open(
          snackbarConsts.admin.protocols.edit.success,
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
          snackbarConsts.admin.protocols.edit.error,
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
