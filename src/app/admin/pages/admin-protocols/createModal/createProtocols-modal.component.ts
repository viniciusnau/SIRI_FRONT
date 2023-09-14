import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
}

@Component({
  selector: 'createProtocols-modal',
  templateUrl: 'createProtocols-modal.component.html',
  styleUrls: ['./createProtocols-modal.component.scss'],
})
export class CreateProtocolsModalComponent implements OnInit {
  formCreateProtocols: FormGroup;
  selectedFile: File;

  constructor(
    public dialogRef: MatDialogRef<CreateProtocolsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProtocolsModalData,
    private formBuilder: FormBuilder,
    public protocolService: ProtocolService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
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
        window.location.reload();
      },
      (error) => {},
    );
  }
}
