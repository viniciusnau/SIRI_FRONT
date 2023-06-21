import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProtocolService } from '../../../../services/protocol.service';

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
  protocolId?: number;
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

  constructor(
    public dialogRef: MatDialogRef<ProtocolsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProtocolsModalData,
    private formBuilder: FormBuilder,
    public protocolService: ProtocolService,
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
      code: [''],
      supplier: [''],
      category: [''],
      file: [''],
      initial_date: [''],
      final_date: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if (this.formProtocols.valid && this.protocolId) {
      const protocolData = this.formProtocols.value;
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
          window.location.reload();
        },
        (error) => {},
      );
    }
  }
}
