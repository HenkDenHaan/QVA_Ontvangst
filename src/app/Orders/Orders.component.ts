import { Component, Input, ViewChild } from '@angular/core';
import { IUserContext, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService, ApplicationService, FormService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoModalDialogRef, SohoModalDialogService, } from 'ids-enterprise-ng';
import { ItemService } from '../item.service';

@Component({
   selector: 'app-component-Left',
   templateUrl: './Orders.component.html',
   styleUrls: ['./Orders.component.css']
})
export class OrdersComponent {
   private messageModal: SohoModalDialogRef<any>;
   private messageModal2: SohoModalDialogRef<any>;
   public Actie: string;
   public Machine: any;
   AlreadyProducedLeft: any;
   CUNMLeft: any;
   ExistingLotcodeLeft: any;
   PalletAantalLeft: any;
   RasBunkerLeft: any;
   MTNOLeft: string;
   MFNOLeft: string;
   OrderQuantityLeft: any;
   PalletLeft: any;
   QuantityToReceiveLeft: String;
   selectedProductionOrderDescriptionLeft: any;
   selectedProductionOrderNumberLeft: string = '';
   selectedRow: MIRecord;
   StockLeft: any;
   selectedProductLeft: any;
   messageModal3: SohoModalDialogRef<unknown>;
   VHWHST: any;
   MaxQuantityToReceiveLeft: any;
   MAQA: number;
   BunkerLeft: string;
   Palletname: any;
   Attributenumber: any;
   A1ATAV: any;
   A2ATAV: any;
   A3ATAV: any;
   A4ATAV: any;
   A5ATAV: any;
   A6ATAV: any;
   A7ATAV: any;
   A8ATAN: any;
   A9ATAN: any;
   AHATAN: any;
   B1ATAN: any;
   B4ATAV: String;
   B3ATAV: String;
   B2ATAV: String;
   A9ATAN_2: string;
   B5ATAV: any;
   B6ATAV: any;
   B7ATAV: any;
   B8ATAV: any;
   B9ATAV: any;
   C1ATAV: any;
   C2ATAV: any;
   MMITGR: string = "500";
   IsBIO: boolean;
   ShowButtonSaveControles: boolean;
   isValid: boolean = true;

   LocBano: any;
   Dooslabel: any;
   ShowButtonBoxLabel: boolean;
   QuantityBoxLabels: any;
   ShowbuttonToReceive: boolean = true;
   ShowButtonCloseOrder: boolean = false;
   LocLVO: any;
   LocRas: any;
   MTNO_BANO: any;
   MTNO_RAS: any;
   MTNOqty: any;
   LocSize: any;
   LocGGN: any;
   LocPP: any;
   LocGrasp: any;
   LocSpring: any;
   Rasfout: boolean;
   GGNfout: boolean;
   RasOk: boolean = true;
   GGNOk: boolean = true;
   LocGGNcheck: boolean = false;
   Cuno: any;
   F1A030: any;

   title(title: any) {
      throw new Error('Method not implemented.');
   }
   userContext = {} as IUserContext;


   @ViewChild('datagridLeft', { static: false }) dataGrid: SohoDataGridComponent;
   @Input() artikel: ItemService[];
   public dataGridOptions: SohoDataGridOptions;
   static reload: any

   constructor(private miService: MIService, private userService: UserService, public itemService: ItemService, private formService: ApplicationService, private sohoModalService: SohoModalDialogService) {
      this.buildDataGrid();
      this.itemService.getComponentLeftDataEventEmitter().subscribe(
         x => {
            console.log(x);
            const records: MIRecord[] = [];
            x.items.forEach(item => {
               records.push(item);
            });
            this.dataGridOptions.dataset = records;
         });
   }
   ngOnInit() {
   }

   buildDataGrid(): void {
      this.dataGridOptions = {
         disableRowDeactivation: true,
         clickToSelect: true,
         cellNavigation: false,
         editable: true,
         filterable: false,
         showDirty: false,
         selectable: 'single',
         rowHeight: 'extra-small',
         columns: this.buildColumns(),
      };
   }

   buildColumns(): SohoDataGridColumn[] {
      const columns: SohoDataGridColumn[] = [];
      columns.push({
         width: 35, id: 'MFNO', name: 'Ordernummer', field: 'VHMFNO', cssClass: this.customCssClass.bind(this), sortable: true
      });
      columns.push({
         width: 120, id: 'ITNO', name: 'Omschrijving', field: 'V_5035', cssClass: this.customCssClass.bind(this), sortable: true
      });
      columns.push({
         width: 95, id: 'CUNM', name: 'Klant', field: 'V_3002', cssClass: this.customCssClass.bind(this), sortable: true
      });
      columns.push({
         width: 25, id: 'Aantal', name: 'Aantal', field: 'V_1235', cssClass: this.customCssClass2.bind(this), sortable: false,
      });
      columns.push({
         width: 61, id: 'Ras', name: 'Ras', field: 'A8ATAV', cssClass: this.customCssClass.bind(this), sortable: false
      });
      columns.push({
         width: 9, id: 'Opmerking', name: '', field: 'V_6215', cssClass: this.customCssClass3.bind(this), sortable: false
      });
      return columns;
   }

   private customCssClass(row: number, cell: number, fieldValue: any, columnDef: SohoDataGridColumn, rowData: any): string {
      const dateTime: Date = new Date();
      const dateOrder = new Date(rowData.V_1600.substring(3, 5) + '-' + rowData.V_1600.substring(0, 2) + '-' + rowData.V_1600.substring(6, 10))

      if (dateTime.getTime() < dateOrder.getTime()) {
         return 'grey';
      } else {
         return 'normal'
      }
   }

   private customCssClass2(row: number, cell: number, fieldValue: any, columnDef: SohoDataGridColumn, rowData: any): string {
      const ToProduce = Number(rowData.V_1235);
      const AlreadyProduced = Number(rowData.VHORQA) - Number(rowData.V_1235)
      const dateTime: Date = new Date();
      const dateOrder = new Date(rowData.V_1600.substring(3, 5) + '-' + rowData.V_1600.substring(0, 2) + '-' + rowData.V_1600.substring(6, 10))

      if (ToProduce <= 0) {
         return 'greenqty';
      } else {
         if (AlreadyProduced > 0) {
            return 'orange';
         } else {
            if (dateTime.getTime() < dateOrder.getTime()) {
               return 'grey';
            } else {
               return 'normal'
            }
         }
      }
   }

   private customCssClass3(row: number, cell: number, fieldValue: any, columnDef: SohoDataGridColumn, rowData: any): string {
      const dateTime: Date = new Date();
      const dateOrder = new Date(rowData.V_1600.substring(3, 5) + '-' + rowData.V_1600.substring(0, 2) + '-' + rowData.V_1600.substring(6, 10))
      const Opm = rowData.V_6215
      if (dateTime.getTime() < dateOrder.getTime()) {
         return 'grey';
      } else {
         if (Opm === "(!)") {
            return 'normal_red'
         } else {
            return 'normal'
         }
      }
   }

   private customCssClassRas(row: number, cell: number, fieldValue: any, columnDef: SohoDataGridColumn, rowData: any): string {
      const ToProduce = Number(rowData.V_1235);
      const RasOrder = rowData.A8ATAV;
      const RasBunker = rowData.A7ATVA
      const AlreadyProduced = Number(rowData.VHORQA) - Number(rowData.V_1235)
      if (RasOrder == "+") {
         return 'blank'
      } else {
         if (RasBunker != RasOrder && RasOrder != "+") {
            return 'red';
         } else {
            if (ToProduce <= 0) {
               return 'green';
            } else {
               if (AlreadyProduced > 0) {
                  return 'orange';
               }
            }
         }
      }
   }

   onInputEntry(event, nextInput) {
      let input = event.target;
      let length = input.value.length;
      let maxLength = input.attributes.maxlength.value;

      if (length >= maxLength) {
         nextInput.focus();
      }
   }

   PrintBoxLabels(event) {
      const MFNO = this.selectedRow['VHMFNO'];
      const PRNO = this.selectedRow['VHPRNO'];
      let QuantityBoxLabels = Number(this.QuantityBoxLabels);
      if (QuantityBoxLabels > 300) {
         this.showMessageModal2('Max 300 labels kunnen geprint worden', 'Max 300 labels can be printed', 'Można wydrukować maksymalnie 300 etykiet');
         this.isValid = true;
         this.QuantityBoxLabels = "";
         return;
      }

      for (let i = 0; QuantityBoxLabels > 99; i++) {
         const mformsResponse1 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep +command%3d%22RUN%22+value%3d%22PMS250%22+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WWFACI%22%3e100%3c%2ffield%3e%3cfield +name%3d%22WAPRNO%22%3e' + PRNO + '%3c%2ffield%3e%3cfield +name%3d%22WAOPNO%22%3e%3c%2ffield%3e%3cfield +name%3d%22WAMFNO%22%3e' + MFNO + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22LSTOPT%22+value%3d%22-1%22+%2f%3e%3cstep+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WANUC1%22%3e99%3c%2ffield%3e%3cfield +name%3d%22WANUC4%22%3e%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +%2f%3e%3c%2fsequence%3e');
         QuantityBoxLabels = QuantityBoxLabels - 99
      }
      const mformsResponse1 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep +command%3d%22RUN%22+value%3d%22PMS250%22+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WWFACI%22%3e100%3c%2ffield%3e%3cfield +name%3d%22WAPRNO%22%3e' + PRNO + '%3c%2ffield%3e%3cfield +name%3d%22WAOPNO%22%3e%3c%2ffield%3e%3cfield +name%3d%22WAMFNO%22%3e' + MFNO + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22LSTOPT%22+value%3d%22-1%22+%2f%3e%3cstep+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WANUC1%22%3e' + QuantityBoxLabels + '%3c%2ffield%3e%3cfield +name%3d%22WANUC4%22%3e%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +%2f%3e%3c%2fsequence%3e');
      this.QuantityBoxLabels = "";
   }

   async UpdateAttributes(event) {
      const MFNO = this.selectedRow['VHMFNO'];
      const PRNO = this.selectedRow['VHPRNO'];
      this.ShowButtonSaveControles = false;
      this.ShowbuttonToReceive = true;
      this.ShowButtonCloseOrder = false
      const delay = ms => new Promise(res => setTimeout(res, ms));

      this.itemService.UploadAttributesOrder(this.Attributenumber, 'QVA01', this.A8ATAN);
      this.itemService.UploadAttributesOrder(this.Attributenumber, 'QVA07', this.B2ATAV);
      this.itemService.UploadAttributesOrder(this.Attributenumber, 'QVA08', this.B3ATAV);
      this.itemService.UploadAttributesOrder(this.Attributenumber, 'QVA09', this.B4ATAV);
      this.itemService.UploadAttributesOrder(this.Attributenumber, 'QVA33', this.C2ATAV);
      this.itemService.UploadAttributesOrder(this.Attributenumber, 'QVA06', this.C1ATAV);
      this.itemService.UploadAttributesOrder(this.Attributenumber, 'QVA03', this.B9ATAV);

      this.itemService.UploadAttributesOrder(this.Attributenumber, 'QVA02', this.AHATAN);
      this.itemService.UploadAttributesOrder(this.Attributenumber, 'QVA39', this.B5ATAV);
      this.itemService.UploadAttributesOrder(this.Attributenumber, 'QVA40', this.B6ATAV);
      this.itemService.UploadAttributesOrder(this.Attributenumber, 'QVA41', this.B7ATAV);
      this.itemService.UploadAttributesOrder(this.Attributenumber, 'QVA42', this.B8ATAV);
      this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e100%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2220%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F18%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +%2f%3e%3c%2fsequence%3e'); await delay(2000)

      this.itemService.SetAttributesOrder(this.selectedProductionOrderNumberLeft, this.selectedProductLeft)
      if (this.AHATAN != "" && this.AHATAN != "0" && this.B5ATAV != "" && this.B6ATAV != "" && this.B7ATAV != "" && this.B8ATAV != "") {
         this.ShowbuttonToReceive = false; this.ShowButtonCloseOrder = true
      } else {
         await delay(2000)
         if (this.Dooslabel) { this.ShowButtonBoxLabel = true }
      }
   }

   UpdateBano(event) {
      this.itemService.UploadAttributesOrder(this.Attributenumber, '50800', this.ExistingLotcodeLeft)
   }

   UpdateSize(event) {
      this.itemService.UploadAttributesOrder(this.Attributenumber, '20160', this.A4ATAV)
   }

   CloseOrder(event) {
      const MFNO = this.selectedRow['VHMFNO'];
      const PRNO = this.selectedRow['VHPRNO'];
      this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e100%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2231%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
      this.itemService.loadComponentLeft();
      this.ShowbuttonToReceive = true
      this.ShowButtonCloseOrder = false
   }

   async onSelectedLeft(event: any) {
      this.ShowbuttonToReceive = false;
      this.ShowButtonSaveControles = false
      this.ShowButtonBoxLabel = false
      this.ShowButtonCloseOrder = false
      this.IsBIO = false
      this.isValid = false
      this.Rasfout = false
      this.GGNfout = false
      this.QuantityBoxLabels = "";
      this.LocBano = "";
      this.LocRas = "";
      this.LocLVO = "";
      this.LocSize = "";
      this.LocGGN = "";
      this.LocPP = "";
      this.LocGrasp = "";
      this.LocSpring = "";
      this.LocGGNcheck = false;
      this.F1A030 = "";
      this.itemService.loadComponentLeft();

      const delay = ms => new Promise(res => setTimeout(res, ms));
      this.selectedRow = event.rows[0].data
      this.selectedProductLeft = this.selectedRow['VHPRNO'];
      this.selectedProductionOrderNumberLeft = this.selectedRow['VHMFNO'];
      this.selectedProductionOrderDescriptionLeft = this.selectedRow['V_5035'];
      this.CUNMLeft = this.selectedRow['V_3002'];
      this.Cuno = this.selectedRow['V_3002'].substring(0, 5);
      this.ExistingLotcodeLeft = this.selectedRow['V_4012'];
      this.OrderQuantityLeft = this.selectedRow['VHORQA'];
      this.QuantityToReceiveLeft = this.selectedRow['V_1235'];
      this.MaxQuantityToReceiveLeft = this.selectedRow['V_1240'];
      this.AlreadyProducedLeft = Number(this.OrderQuantityLeft) - Number(this.QuantityToReceiveLeft)
      this.PalletLeft = this.selectedRow['V_2000'];
      this.PalletAantalLeft = this.selectedRow['V_1230'];
      this.BunkerLeft = this.selectedRow['VOPLGR'];
      if (this.BunkerLeft.startsWith("VP")) { this.BunkerLeft = "Nog niet gekoppeld" }
      this.RasBunkerLeft = this.selectedRow['A7ATVA'];
      this.Attributenumber = this.selectedRow['VHATNR'];
      this.VHWHST = this.selectedRow['VHWHST'];
      this.Dooslabel = this.selectedRow['V_2344']
      this.MTNOLeft = this.selectedRow['Z5MTNO']
      this.MTNOqty = this.selectedRow['Z5CNQT']

      this.itemService.SetItem(this.PalletLeft)
      this.itemService.getItemDataEventEmitter().subscribe(x => this.Palletname = x.items[0].FUDS);

      this.itemService.SetAttributesOrder(this.selectedProductionOrderNumberLeft, this.selectedProductLeft)
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.MMITGR = x.items[0].MMITGR);
      await delay(400)
      if (this.MMITGR === "558") {
         this.IsBIO = true
      }

      this.itemService.SetAttributesOrder(this.selectedProductionOrderNumberLeft, this.selectedProductLeft)
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.A1ATAV = x.items[0].A1ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.A2ATAV = x.items[0].A2ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.A3ATAV = x.items[0].A3ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.A4ATAV = x.items[0].A4ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.A5ATAV = x.items[0].A5ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.A6ATAV = x.items[0].A6ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.A7ATAV = x.items[0].A7ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.A8ATAN = x.items[0].A8ATAN);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.A9ATAN = x.items[0].A9ATAN);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.AHATAN = x.items[0].AHATAN);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.B1ATAN = x.items[0].B1ATAN);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.B2ATAV = x.items[0].B2ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.B3ATAV = x.items[0].B3ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.B4ATAV = x.items[0].B4ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.B5ATAV = x.items[0].B5ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.B6ATAV = x.items[0].B6ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.B7ATAV = x.items[0].B7ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.B8ATAV = x.items[0].B8ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.B9ATAV = x.items[0].B9ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.C1ATAV = x.items[0].C1ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.C2ATAV = x.items[0].C2ATAV);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.MTNO_BANO = x.items[0].VMBANO);
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.MTNO_RAS = x.items[0].V3ATAV);

      this.itemService.SetLocation(this.BunkerLeft);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocBano = x.items[0].MTBANO);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocRas = x.items[0].AGATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocLVO = x.items[0].A1ATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocSize = x.items[0].A2ATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocGGN = x.items[0].A3ATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocPP = x.items[0].A4ATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocGrasp = x.items[0].A5ATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocSpring = x.items[0].A6ATVA);

      this.itemService.SetCustomer(this.Cuno);
      this.itemService.getCustomerDataEventEmitter().subscribe(x => this.F1A030 = x.items[0].A030);

      for (let i = 0; i < 10; i++) {
         if (!this.LocBano) {
            await delay(1000);
         }
      }

      if (this.LocBano) {
         this.LocGGNcheck = true;
      }
      if (this.Dooslabel) {
         this.ShowButtonBoxLabel = true
      }
      if (this.MTNO_RAS != this.LocRas && this.BunkerLeft != "" && this.BunkerLeft != "HAND" && this.BunkerLeft != "Nog niet gekoppeld") {
         this.Rasfout = true
         this.RasOk = false
      } else {
         this.Rasfout = false
         this.RasOk = true
      }
      if (this.MTNO_RAS != this.LocRas || this.BunkerLeft == "Nog niet gekoppeld") {

         this.ShowbuttonToReceive = false;
         this.ShowButtonBoxLabel = false;
      } else {

         this.ShowbuttonToReceive = true;
      }

      if (this.A1ATAV != this.LocGGN && this.BunkerLeft != "" && this.BunkerLeft != "HAND" && this.BunkerLeft != "Nog niet gekoppeld") {
         this.GGNfout = true
         this.GGNOk = false
      } else {
         this.GGNfout = false
         this.GGNOk = true
      }

   }

   async ReceiveQuantityLeft(event: any) {
      if (this.ShowButtonSaveControles === true) { this.UpdateAttributes(event) }
      this.isValid = false;
      this.MAQA = Number(this.QuantityToReceiveLeft);
      const MaxQuantityToReceiveLeft = Number(this.MaxQuantityToReceiveLeft);
      this.itemService.SetLocation(this.BunkerLeft);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocBano = x.items[0].MTBANO);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocRas = x.items[0].AGATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocLVO = x.items[0].A1ATVA);
      this.StockLeft = '';
      this.itemService.setStockLeft(this.MTNOLeft, this.BunkerLeft, this.MTNO_BANO);
      this.itemService.getStockLeftDataEventEmitter().subscribe(x => this.StockLeft = x.items[0].STQT)
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(500)
      const AlreadyProduced = Number(this.AlreadyProducedLeft);
      const LocRas = this.LocRas;
      const MFNO = this.selectedRow['VHMFNO'];
      const PRNO = this.selectedRow['VHPRNO'];
      const Bunker = this.BunkerLeft;
      const Bano = this.ExistingLotcodeLeft;
      const RasOrder = this.selectedRow['A8ATAV'];
      const A8ATAN = this.A8ATAN;
      const B2ATAV = this.B2ATAV;
      const B3ATAV = this.B3ATAV;
      const B1ATAN = this.B1ATAN;
      const B4ATAV = this.B4ATAV;
      const C1ATAV = this.C1ATAV;
      const B9ATAV = this.B9ATAV;
      const AHATAN = this.AHATAN;
      const B5ATAV = this.B5ATAV;
      const B6ATAV = this.B6ATAV;
      const B7ATAV = this.B7ATAV;
      const B8ATAV = this.B8ATAV;
      const PalletLeft = this.PalletLeft;
      const MTNO_BANO = this.MTNO_BANO
      const VHWHST = this.VHWHST;

      let D1QT = Number(this.PalletAantalLeft);
      if (this.PalletLeft === "800050" || this.PalletLeft === "800051") { D1QT = 10 }

      if (VHWHST.substring(1, 2) === "2") {
         this.showMessageModal2('Orderstatus is ' + VHWHST + ' Vraag hulp', 'Order status is ' + VHWHST + ' Request help', 'Status zamówienia to ' + VHWHST + ' Poproś o pomoc');
         this.isValid = true;
         return;
      } else {
         if (Bunker === "" || !Bunker || Bunker === "Nog niet gekoppeld") {
            this.showMessageModal2('Koppel order aan locatie', 'Link order to location ', 'Połącz zamówienie z lokalizacją ');
            this.isValid = true;
            return;
         } else {
            if (Bano === '' || !Bano) {
               this.showMessageModal2('Lotcode niet gevuld', 'Lotcode not filled  ', 'Lot nie jest wypełniony');
               this.isValid = true;
               return;
            }
            if (!MTNO_BANO || MTNO_BANO === "") {
               if (RasOrder != LocRas && Bunker != "HAND") {
                  this.showMessageModal2('Rasfout', 'Potato variety not ok', 'Odmiana ziemniaka nie jest ok');
                  this.isValid = true;
                  return;
               }
            } else { //else-deel  hieronder eventueel vervangen door onderstaande script.
               if (RasOrder != LocRas && Bunker != "HAND") {
                  this.showMessageModal2('Rasfout', 'Potato variety not ok', 'Odmiana ziemniaka nie jest ok');
                  this.isValid = true;
                  return;
               }

               // script t.b.v. ophogen partij.
               // if (!StockLeft) {
               //    this.showMessageModal2('Gekoppelde partij ' + MTNO_BANO + 'bestaat niet meer op deze locatie:' + Bunker, MTNO_RAS, StockLeft);
               //    this.isValid = true;
               //    return;
               // } else {
               //                      if (Number(StockLeft) <= 0) {
               //       this.showMessageModal2('Partij ophogen:' + MTNO_BANO + MTNO_RAS, StockLeft, String(MTNO_totalQty));
               //       this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22MMS310%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWWHLO%22%3e100%3c%2ffield%3e%3cfield +name%3d%22W1ITNO%22%3e' + MTNOLeft + '%3c%2ffield%3e%3cfield +name%3d%22WHBANO%22%3e' + MTNO_BANO + '%3c%2ffield%3e%3cfield +name%3d%22W1WHSL%22%3e' + Bunker + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WWSTAG%22%3e2%3c%2ffield%3e%3cfield +name%3d%22WWSTQI%22%3e' + MTNO_totalQty + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +%2f%3e%3c%2fsequence%3e');
               //       const delay = ms => new Promise(res => setTimeout(res, ms));
               //       await delay(3000)
               //    }
               // }

            }
            if (A8ATAN === 0 || B2ATAV === "" || B3ATAV === "" || B4ATAV === "" || C1ATAV === "" || B9ATAV === "") {
               this.showMessageModal2('Controle Start niet gevuld', 'Check Start not filled', 'Sprawdź Start nie wypełniony');
               this.isValid = true;
               return;
            }
            if (Number(B1ATAN) < 0 || B2ATAV === "N" || B3ATAV === "N" || B4ATAV === "N" || C1ATAV === "N" || B9ATAV === "N") {
               this.showMessageModal2('Controle Start fout', 'Check Start not OK', 'Sprawdź Start nie jest OK');
               this.isValid = true;
               return;
            }
            if (AHATAN != 0 || B5ATAV != "" || B6ATAV != "" || B7ATAV != "" || B8ATAV != "") {
               this.showMessageModal2('Controle Eind reeds gevuld', 'Check End already filled', 'Sprawdź Koniec już wypełniony');
               this.isValid = true;
               return;
            }

            if (MaxQuantityToReceiveLeft > D1QT) {
               this.itemService.loadComponentLeft()
               this.showMessageModal2('Aantal te groot! Maximaal ' + D1QT + ' per pallet', 'Quantity too large! Maximum ' + D1QT + ' per pallet', 'Ilość za duża! Maksymalnie ' + D1QT + ' na paletę');
            } else {
               if (this.MAQA > MaxQuantityToReceiveLeft) {
                  const mformsResponse1 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep +command%3d%22RUN%22+value%3d%22PMS050%22+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WHFACI%22%3e100%3c%2ffield%3e%3cfield +name%3d%22WHPRNO%22%3e' + PRNO + '%3c%2ffield%3e%3cfield +name%3d%22WHMFNO%22%3e' + MFNO + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WHBANO%22%3e' + Bano + '%3c%2ffield%3e%3cfield +name%3d%22WHPAC2%22%3e' + PalletLeft + '%3c%2ffield%3e%3cfield +name%3d%22WHMAQA%22%3e' + MaxQuantityToReceiveLeft + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +%2f%3e%3c%2fsequence%3e');
                  // }
               } else {
                  //                            //extra enter tbv overproductie
                  const mformsResponse2 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep +command%3d%22RUN%22+value%3d%22PMS050%22+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WHFACI%22%3e100%3c%2ffield%3e%3cfield +name%3d%22WHPRNO%22%3e' + PRNO + '%3c%2ffield%3e%3cfield +name%3d%22WHMFNO%22%3e' + MFNO + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WHBANO%22%3e' + Bano + '%3c%2ffield%3e%3cfield +name%3d%22WHPAC2%22%3e' + PalletLeft + '%3c%2ffield%3e%3cfield +name%3d%22WHMAQA%22%3e' + MaxQuantityToReceiveLeft + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +%2f%3e%3c%2fsequence%3e');
               }
            }

            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(3000)

            this.itemService.loadComponentLeft()
            this.OrderQuantityLeft = this.selectedRow['VHORQA'];
            this.itemService.SetAttributesOrder(this.selectedProductionOrderNumberLeft, this.selectedProductLeft)
            this.itemService.getAttributesDataEventEmitter().subscribe(x => this.QuantityToReceiveLeft = x.items[0].V_1235);
            await delay(500)
            this.AlreadyProducedLeft = Number(this.OrderQuantityLeft) - Number(this.QuantityToReceiveLeft)

            for (let i = 0; i < 5; i++) {
               const AlreadyProducedAfter = Number(this.OrderQuantityLeft) - Number(this.QuantityToReceiveLeft);
               if (AlreadyProducedAfter > AlreadyProduced) {
                  this.showMessageModal2('Label voor ' + this.MaxQuantityToReceiveLeft + ' stuks wordt geprint!', 'Label is printing!', 'Etykieta jest drukowana!')
                  this.messageModal3.afterClose(() => {
                  })
                  this.isValid = true;

                  return;
               } else {
                  await delay(3000)
               }
            }
            this.showMessageModal2('Ontvangst niet uitgevoerd! Probeer opnieuw of vraag hulp.', 'Reception not carried out! Please try again or ask for help.', 'Odbiór nie został przeprowadzony! Spróbuj ponownie lub poproś o pomoc.')
            this.messageModal3.afterClose(() => {
               this.isValid = true;
            })
         }
      }
   }

   private showMessageModal2(title: string, message: string, message2: string) {
      this.messageModal2 = this.sohoModalService.message('<label>' + message + message2 + '</label>');
      this.messageModal2.options({
         title: '<header>' + title + '</header>',
         buttons: [

            {
               text: 'OK',
               click: (e, model) => {

                  this.messageModal2.close();
               },
               isDefault: true
            }
         ],
         content: '<div><h4>' + message + '<br>' + message2 + '</h4></div>'
      });
      this.messageModal2.open();
   }

}
