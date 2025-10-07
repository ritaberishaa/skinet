import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-filters-dialog',
  standalone: true,
  imports: [MatSelectionList, MatListOption, FormsModule, MatIcon, MatButton],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss'
})
export class FiltersDialogComponent {
  shopService = inject(ShopService);
  private dialogRef = inject(MatDialogRef<FiltersDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  selectedBrands: string[] = this.data.selectedBrands;
  selectedTypes: string[] = this.data.selectedTypes;

  applyFilters() {
    this.dialogRef.close({ selectedBrands: this.selectedBrands, selectedTypes: this.selectedTypes });
  }

  clearFilters() {
    this.selectedBrands = [];
    this.selectedTypes = [];
  }
}
