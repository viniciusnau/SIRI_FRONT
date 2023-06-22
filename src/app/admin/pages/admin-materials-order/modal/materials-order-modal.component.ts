import { OrdersService } from 'src/app/services/orders.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

interface Supplier {
  id: number;
  name: number;
}

interface Category {
  id: number;
  name: string;
}

export interface MaterialsOrderModalData {
  suppliers: Supplier[];
  categories: Category[];
}

interface MaterialsOrder {
  supplier: string;
  category: string;
  materials_order: number;
  supplier_orders: SupplierOrder[];
}

interface SupplierOrder {
  public_defense: string;
  supplier_order_items: SupplierOrderItem[];
}

interface SupplierOrderItem {
  product: string;
  code: string;
  quantity: number;
}

@Component({
  selector: 'materials-order-modal',
  templateUrl: 'materials-order-modal.component.html',
  styleUrls: ['./materials-order-modal.component.scss'],
})
export class MaterialsOrderModalComponent implements OnInit {
  materialsOrder: MaterialsOrder | null = null;
  formMaterialsOrder: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MaterialsOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialsOrderModalData,
    private formBuilder: FormBuilder,
    public ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formMaterialsOrder = this.formBuilder.group({
      supplier_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      initial_date: ['', [Validators.required]],
      final_date: ['', [Validators.required]],
    });
  }

  onClick() {
    if (this.formMaterialsOrder.invalid) return;

    const { supplier_id, category_id, initial_date, final_date } =
      this.formMaterialsOrder.getRawValue();

    const formattedInitialDate = moment(initial_date).format('YYYY-MM-DD');
    const formattedFinalDate = moment(final_date).format('YYYY-MM-DD');

    this.ordersService
      .getMaterialsOrderStatusCode(
        supplier_id,
        category_id,
        formattedInitialDate,
        formattedFinalDate,
      )
      .subscribe((response) => {
        this.materialsOrder = response;
        this.generatePDF();
      });
  }

  generatePDF() {
    const currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const publicDefenses = Array.from(
      new Set(
        this.materialsOrder.supplier_orders.map((order) => order.public_defense)
      )
    );

    const productsSet = new Set<string>();
    const productsMap: { [key: string]: { [key: string]: number } } = {};

    this.materialsOrder.supplier_orders.forEach((supplierOrder) => {
      const publicDefense = supplierOrder.public_defense;

      supplierOrder.supplier_order_items.forEach((item) => {
        const product = item.product;
        const code = item.code;
        const quantity = item.quantity;

        productsSet.add(product);

        if (!productsMap[product]) {
          productsMap[product] = {};
        }

        if (productsMap[product][publicDefense]) {
          productsMap[product][publicDefense] += quantity;
        } else {
          productsMap[product][publicDefense] = quantity;
        }

        productsMap[product][`${publicDefense}_${product}_code`] = Number(code);
      });
    });

    const products = Array.from(productsSet);

    const maxColumnsPerPage = 11;
    const spaceBetweenTables = 20;

    const tables = [];
    let remainingProducts = products.length;
    let startIndex = 0;

    while (remainingProducts > 0) {
      const endIndex = Math.min(startIndex + maxColumnsPerPage, products.length);
      const sectionProducts = products.slice(startIndex, endIndex);

      const tableHeader = [
        'Nucleo',
        ...sectionProducts.map(
          (product) =>
            `${productsMap[product][`${publicDefenses[0]}_${product}_code`]}\n${this.firstLetterOnCapital(
              product
            )}`
        ),
      ];
      const tableData = [tableHeader];

      const columnTotals = Array<number>(sectionProducts.length).fill(0);

      publicDefenses.forEach((publicDefense) => {
        const rowData = [publicDefense];
        sectionProducts.forEach((product, i) => {
          const defenseMap = productsMap[product];
          const quantity = defenseMap[publicDefense] || 0;
          rowData.push(String(quantity));
          columnTotals[i] += quantity;
        });
        tableData.push(rowData);
      });

      const columnTotalRow = ['Total'];
      columnTotals.forEach((total) => {
        columnTotalRow.push(String(total));
      });
      tableData.push(columnTotalRow);

      tables.push({
        table: {
          headerRows: 1,
          widths: ['auto', ...Array(sectionProducts.length).fill('auto')],
          body: tableData,
        },
        margin: [0, 0, 0, spaceBetweenTables],
      });

      remainingProducts -= sectionProducts.length;
      startIndex += maxColumnsPerPage;
    }

    const docDefinition = {
      header: {
        columns: [
          {
            text: 'S.I.R.I',
            alignment: 'left',
            margin: [20, 5],
            fontSize: 14,
            bold: true,
          },
          { text: currentDate, alignment: 'right', margin: [20, 10] },
        ],
      },
      content: [
        {
          text: 'Pedido de Materiais' + ' - ' + this.materialsOrder.supplier,
          style: 'header',
          alignment: 'center',
          margin: [0, 10],
        },
        '\n\n',
        ...tables,
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
    };

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    pdfDocGenerator.getBlob((blob) => {
      const fileName = 'materials_order.pdf';
      const file = new File([blob], fileName, { type: 'application/pdf' });

      const objectId = this.materialsOrder.materials_order;

      const formData = new FormData();
      formData.append('file', file);

      this.ordersService.patchMaterialsOrder(objectId, formData).subscribe(
        (response) => {window.location.reload()},
        (error) => {}
      );
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }
}
