import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreBase, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent } from 'ids-enterprise-ng/lib/datagrid/soho-datagrid.component';
import { ItemService } from '../item.service';
import { ApplicationService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-attributes',
   templateUrl: './attributes.component.html',
   styleUrls: ['./attributes.component.css']
})
export class AttributesComponent extends CoreBase implements OnInit {

   @ViewChild('datagrid', { static: true })
   private datagrid: SohoDataGridComponent;
   public dataGridOptions: SohoDataGridOptions;
   static reload: any;



   constructor(private miService: MIService, private itemService: ItemService, private applicationService: ApplicationService) {
      super("Attributes");
      this.buildDataGrid();
      this.itemService.getAttributesDataEventEmitter().subscribe(
         x => {
            console.log(x);
            const records: MIRecord[] = [];
            x.items.forEach(item => {
               if (item["ATAV"] != "") {
                  records.push(item);
               }
            });
            this.dataGridOptions.dataset = records;
         });

   }


   ngOnInit(): void {

   }

   buildDataGrid(): void {
      this.dataGridOptions = {
         disableRowDeactivation: true,
         clickToSelect: true,
         cellNavigation: false,
         editable: true,
         filterable: true,
         showDirty: true,
         selectable: 'single',
         rowHeight: 'short',
         columns: this.buildColumns()
      };

   }
   buildColumns(): SohoDataGridColumn[] {
      const columns: SohoDataGridColumn[] = [];

      columns.push({
         width: 100, id: 'CYP6', name: 'Maand', field: 'ATDS', filterType: "text",
      });

      // columns.push({
      //    width: 50, id: 'MFOR', name: 'Forecast', field: 'ATID',
      // });
      // columns.push({
      //    width: 50, id: 'MFOR', name: 'Forecast', field: 'ATAN',
      // });
      // columns.push({
      //    width: 50, id: 'MFOR', name: 'Forecast', field: 'ATVA',
      // });

      columns.push({
         width: 50, id: 'MFOR', name: 'Forecast', field: 'ATAV',
      });
      return columns;

   }


}
