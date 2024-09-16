import { Component, Input, ViewChild } from '@angular/core';
import { IUserContext, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService, ApplicationService, FormService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoModalDialogRef, SohoModalDialogService, } from 'ids-enterprise-ng';
import { ItemService } from '../item.service';
import { filter } from 'rxjs';

@Component({
   selector: 'app-component-Left',
   templateUrl: './component-Left.component.html',
   styleUrls: ['./component-Left.component.css']
})
export class ComponentLeftComponent {
   private messageModal: SohoModalDialogRef<any>;
   private messageModal2: SohoModalDialogRef<any>;
   public Actie: string;
   public Machine: any;
   AlreadyProducedLeft: any;
   checkExpiDate: any;
   CUNMLeft: any;
   EANcodeLeft: string = '';
   ExistingLotcodeLeft: any;
   ExistingThTLeft: any;
   ExpiApiDate: any;
   ExpirationDateLeft: any;
   PalletAantalLeft: any;
   MachineLeft: any;
   RasBunkerLeft: any;
   RasBunkerLeft2: any;
   MTNOLeft: string;
   MFNOLeft: string;
   MTNOStockLocation: string;
   OrderQuantityLeft: any;
   PalletLeft: any;
   ProdApiDateLeft: String;
   ProductionDateLeft: String;
   QuantityToReceiveLeft: String;
   RemainToReceiveLeft: string;
   RemarkLeft: any;
   selectedProductionOrderDescriptionLeft: any;
   selectedProductionOrderNumberLeft: string = '';
   selectedRow: MIRecord;
   selectedRowIndex: number;
   StockLeft: any;
   WarningExpiDate: any;
   selectedProductLeft: any;
   ConnectedOrderStatus: string = '';
   RemarkLeft_ST: string = '';
   FACI: any;
   PREA: any;
   RORN: any;
   THTMin: any;
   THTMAx: any;
   NAPQTY: any;
   messageModal3: SohoModalDialogRef<unknown>;
   VHWHST: any;
   public apiDateLeft: any;
   MaxQuantityToReceiveLeft: any;
   D1QT: any;
   selectedFilterChange: any;
   MAQA: number;
   ToDPS: any;
   BANOhand: boolean;
   BANOLeft: any;
   apiBANOLeft: any;
   MTNOLeft2: any;
   StockLeft2: any;
   RasBunkerLeft1: any;
   BunkerLeft: string;
   GGNBunker: any;
   ITDS: any;
   FUDS: any;
   CUNM: any;
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

   id: string;
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

   title(title: any) {
      throw new Error('Method not implemented.');
   }
   userContext = {} as IUserContext;


   @ViewChild('datagridLeft', { static: false }) dataGrid: SohoDataGridComponent;
   @Input() artikel: ItemService[];
   private datagrid: SohoDataGridComponent;
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
         width: 35, id: 'MFNO', name: 'Ordernummer', field: 'VHMFNO', cssClass: this.customCssClass.bind(this), sortable: false
      });
      columns.push({
         width: 120, id: 'ITNO', name: 'Omschrijving', field: 'V_5035', cssClass: this.customCssClass.bind(this), sortable: false
      });
      columns.push({
         width: 95, id: 'CUNM', name: 'Klant', field: 'V_3002', cssClass: this.customCssClass.bind(this), sortable: false
      });
      columns.push({
         width: 25, id: 'Aantal', name: 'Aantal', field: 'V_1235', cssClass: this.customCssClass2.bind(this), sortable: false,
      });
      columns.push({
         width: 70, id: 'Ras', name: 'Ras', field: 'A8ATAV', cssClass: this.customCssClass.bind(this), sortable: false
      });
      return columns;
   }

   private customCssClass(row: number, cell: number, fieldValue: any, columnDef: SohoDataGridColumn, rowData: any): string {
      const dateTime: Date = new Date();

      const Actualdate = new Date(dateTime.getDate() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getFullYear());
      const dateOrder = new Date(rowData.V_1600.substring(3, 5) + '-' + rowData.V_1600.substring(0, 2) + '-' + rowData.V_1600.substring(6, 10))

      if (Actualdate.getTime() < dateOrder.getTime()) {
         return 'grey';
      } else {
         return 'normal'
      }
      // const ToProduce = Number(rowData.V_1235);
      // const AlreadyProduced = Number(rowData.VHORQA) - Number(rowData.V_1235)
      // if (ToProduce <= 0) {
      //    return 'green';
      // } else {
      //    if (AlreadyProduced > 0) {
      //       return 'orange';
      //    } else {

      //    }
      // }
   }
   private customCssClass2(row: number, cell: number, fieldValue: any, columnDef: SohoDataGridColumn, rowData: any): string {
      const ToProduce = Number(rowData.V_1235);
      const AlreadyProduced = Number(rowData.VHORQA) - Number(rowData.V_1235)

      if (ToProduce <= 0) {
         return 'greenqty';
      } else {
         if (AlreadyProduced > 0) {
            return 'orange';
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
      const OrderQuantityLeft = Number(this.selectedRow['VHORQA']);
      let QuantityBoxLabels = Number(this.QuantityBoxLabels);
      if (QuantityBoxLabels > 300) {
         this.showMessageModal2('Max 300 labels kunnen geprint worden', 'Max 300 labels can be printed', 'Można wydrukować maksymalnie 300 etykiet');
         this.isValid = true;
         return;
      }


      for (let i = 0; QuantityBoxLabels > 99; i++) {
         const mformsResponse1 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep +command%3d%22RUN%22+value%3d%22PMS250%22+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WWFACI%22%3e100%3c%2ffield%3e%3cfield +name%3d%22WAPRNO%22%3e' + PRNO + '%3c%2ffield%3e%3cfield +name%3d%22WAOPNO%22%3e%3c%2ffield%3e%3cfield +name%3d%22WAMFNO%22%3e' + MFNO + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22LSTOPT%22+value%3d%22-1%22+%2f%3e%3cstep+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WANUC1%22%3e99%3c%2ffield%3e%3cfield +name%3d%22WANUC4%22%3e%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +%2f%3e%3c%2fsequence%3e');
         QuantityBoxLabels = QuantityBoxLabels - 99
      }
      const mformsResponse1 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep +command%3d%22RUN%22+value%3d%22PMS250%22+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WWFACI%22%3e100%3c%2ffield%3e%3cfield +name%3d%22WAPRNO%22%3e' + PRNO + '%3c%2ffield%3e%3cfield +name%3d%22WAOPNO%22%3e%3c%2ffield%3e%3cfield +name%3d%22WAMFNO%22%3e' + MFNO + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22LSTOPT%22+value%3d%22-1%22+%2f%3e%3cstep+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WANUC1%22%3e' + QuantityBoxLabels + '%3c%2ffield%3e%3cfield +name%3d%22WANUC4%22%3e%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +%2f%3e%3c%2fsequence%3e');
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


      this.ShowButtonSaveControles = false
      this.ShowButtonBoxLabel = false
      this.ShowButtonCloseOrder = false
      this.IsBIO = false
      this.isValid = false
      this.Rasfout = false
      this.GGNfout = false
      this.LocBano = "";
      this.LocRas = "";
      this.LocLVO = "";
      this.LocSize = "";
      this.LocGGN = "";
      this.LocPP = "";
      this.LocGrasp = "";
      this.LocSpring = "";
      this.LocGGNcheck = false;
      this.itemService.loadComponentLeft();
      const delay = ms => new Promise(res => setTimeout(res, ms));
      this.selectedRow = event.rows[0].data
      this.selectedProductLeft = this.selectedRow['VHPRNO'];
      this.selectedProductionOrderNumberLeft = this.selectedRow['VHMFNO'];
      this.selectedProductionOrderDescriptionLeft = this.selectedRow['V_5035'];
      this.CUNMLeft = this.selectedRow['V_3002'];
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

      // this.itemService.loadComponentLeft();
      this.itemService.SetAttributesOrder(this.selectedProductionOrderNumberLeft, this.selectedProductLeft)
      this.itemService.getAttributesDataEventEmitter().subscribe(x => this.MMITGR = x.items[0].MMITGR);
      await delay(300)
      if (this.MMITGR === "558") {
         this.IsBIO = true
      }
      if (this.Dooslabel) {
         this.ShowButtonBoxLabel = true
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

      this.itemService.SetItem(this.PalletLeft)
      this.itemService.getItemDataEventEmitter().subscribe(x => this.Palletname = x.items[0].FUDS);

      this.itemService.SetLocation(this.BunkerLeft);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocBano = x.items[0].MTBANO);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocRas = x.items[0].AGATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocLVO = x.items[0].A1ATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocSize = x.items[0].A2ATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocGGN = x.items[0].A3ATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocPP = x.items[0].A4ATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocGrasp = x.items[0].A5ATVA);
      this.itemService.getLocationDataEventEmitter().subscribe(x => this.LocSpring = x.items[0].A6ATVA);
      await delay(500)
      if (this.LocBano) {
         this.LocGGNcheck = true;
      }
      if (this.MTNO_RAS != this.LocRas && this.BunkerLeft != "" && this.BunkerLeft != "HAND" && this.BunkerLeft != "Nog niet gekoppeld") {
         this.Rasfout = true
         this.RasOk = false
      } else {
         this.Rasfout = false
         this.RasOk = true
      }
      if (this.A1ATAV != this.LocGGN && this.BunkerLeft != "" && this.BunkerLeft != "HAND" && this.BunkerLeft != "Nog niet gekoppeld") {
         this.GGNfout = true
         this.GGNOk = false
      } else {
         this.GGNfout = false
         this.GGNOk = true
      }


      // if ((this.MTNO_RAS != this.LocRas) && (this.A1ATAV != this.LocGGN)) {
      //    for (let i = 0; i < 6; i++) {
      //       await delay(500)
      //       this.Rasfout = false
      //       this.GGNfout = false
      //       this.RasOk = true
      //       this.GGNOk = true
      //       await delay(500)
      //       this.Rasfout = true
      //       this.GGNfout = true
      //       this.RasOk = false
      //       this.GGNOk = false
      //    }
      // } else {
      //    if (this.MTNO_RAS != this.LocRas) {
      //       for (let i = 0; i < 5; i++) {
      //          await delay(500)
      //          this.Rasfout = false
      //          this.RasOk = true
      //          await delay(500)
      //          this.Rasfout = true
      //          this.RasOk = false
      //       }
      //    } else {
      //       this.Rasfout = false
      //       this.RasOk = true
      //       if (this.A1ATAV != this.LocGGN) {
      //          for (let i = 0; i < 5; i++) {
      //             await delay(500)
      //             this.GGNfout = false
      //             this.GGNOk = true
      //             await delay(500)
      //             this.GGNfout = true
      //             this.GGNOk = false
      //          }
      //       } else {
      //          this.GGNfout = false
      //          this.GGNOk = true
      //       }
      //    }
      // }
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
      const MTNOLeft = this.selectedRow['Z5MTNO'];
      //    const RemainToReceive = Number(this.RemainToReceiveLeft);
      const AlreadyProduced = Number(this.AlreadyProducedLeft);
      // const FACI = this.FACI;
      const LocRas = this.LocRas;
      const MFNO = this.selectedRow['VHMFNO'];
      const PRNO = this.selectedRow['VHPRNO'];
      const YEAR = this.selectedRow['V_1600'].substring(8, 10);
      const Bunker = this.BunkerLeft;
      const Bano = this.ExistingLotcodeLeft;
      const RasOrder = this.selectedRow['A8ATAV'];
      const RasBunker = this.selectedRow['A7ATVA'];
      const A8ATAN = this.A8ATAN;
      const B2ATAV = this.B2ATAV;
      const B3ATAV = this.B3ATAV;

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
      const MTNO_RAS = this.MTNO_RAS
      const StockLeft = this.StockLeft
      const MTNOqty = this.MTNOqty
      // const MTNO_totalQty = Number(this.StockLeft) + (Number(this.MTNOqty) * Number(this.MaxQuantityToReceiveLeft))
      const MTNO_totalQty = (Number(this.MTNOqty) * Number(this.MaxQuantityToReceiveLeft))
      //    const PREA = this.PREA;
      //    const RORN = this.MFNOLeft
      //    const NAPQTY = this.NAPQTY;
      //    const STAQ = this.StockLeft;
      //    const STAQ2 = this.StockLeft2;
      //    const WHSL = this.itemService.MTNOStockLocationLeft;
      const VHWHST = this.VHWHST;
      //    const WHST = this.ConnectedOrderStatus;
      //    const BRE2 = this.itemService.MTNOStockLocationLeft.substring(6, 12);
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
            // if (AlreadyProduced === 0) {
            //             // if (CheckEmptyExpiDate === '' || !CheckEmptyExpiDate) {
            //             //    this.showMessageModal2('ThT niet gevuld', 'ThT not filled  ', 'ThT nie jest wypełniony');
            //             //    this.isValid = true;
            //             //    return;
            //             // }
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
            } else {
               if (!StockLeft) {
                  this.showMessageModal2('Gekoppelde partij ' + MTNO_BANO + 'bestaat niet meer op deze locatie:' + Bunker, MTNO_RAS, StockLeft);
                  this.isValid = true;
                  return;
               } else {
                  // this.showMessageModal2('Backflush van partij:' + MTNO_BANO, MTNO_RAS, StockLeft);
                  if (Number(StockLeft) <= 0) {
                     this.showMessageModal2('Partij ophogen:' + MTNO_BANO + MTNO_RAS, StockLeft, String(MTNO_totalQty));
                     this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22MMS310%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWWHLO%22%3e100%3c%2ffield%3e%3cfield +name%3d%22W1ITNO%22%3e' + MTNOLeft + '%3c%2ffield%3e%3cfield +name%3d%22WHBANO%22%3e' + MTNO_BANO + '%3c%2ffield%3e%3cfield +name%3d%22W1WHSL%22%3e' + Bunker + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WWSTAG%22%3e2%3c%2ffield%3e%3cfield +name%3d%22WWSTQI%22%3e' + MTNO_totalQty + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +%2f%3e%3c%2fsequence%3e');
                     const delay = ms => new Promise(res => setTimeout(res, ms));
                     await delay(3000)
                  }
               }

            }
            if (A8ATAN === 0 || B2ATAV === "" || B3ATAV === "" || B4ATAV === "" || C1ATAV === "" || B9ATAV === "") {
               this.showMessageModal2('Controle Start niet gevuld', 'Potato variety not ok', 'Odmiana ziemniaka nie jest ok');
               this.isValid = true;
               return;
            }
            if (AHATAN != 0 || B5ATAV != "" || B6ATAV != "" || B7ATAV != "" || B8ATAV != "") {
               this.showMessageModal2('Controle Eind reeds gevuld', 'Potato variety not ok', 'Odmiana ziemniaka nie jest ok');
               this.isValid = true;
               return;
            }






            //             // if (this.itemService.MachineLeft === "KCD" || this.itemService.MachineLeft === "KS ") {
            //             //    const NewBANO = this.BANOLeft.substring(0, 6) + '-' + this.ExpiApiDate.substring(0, 2);
            //             //    this.showMessageModal('ThT en Lotcode akkoord?', ' ThT and Lot code approved?', 'Zatwierdzone kody ThT i Lot?', 'ThT &emsp;&emsp;&emsp;:&ensp;' + this.WarningExpiDate, 'Lotcode &emsp;&nbsp;:&ensp;' + NewBANO);
            //             // } else {
            // const NewBANO = this.ExistingLotcodeLeft + '-' + YEAR;
            // this.showMessageModal('Lotcode akkoord?', ' Lot code approved?', 'Zatwierdzone kody Lot?', '', 'Lotcode &emsp;&nbsp;:&ensp;' + NewBANO);
            // }

            //          } else {
            //             if (this.MAQA > RemainToReceive && NAPQTY > 0) {
            //                this.itemService.loadComponentLeft()
            //                this.showMessageModal2('Aantal te groot! Op deze order kunnen nog maximaal ' + RemainToReceive + ' stuks worden ontvangen', 'Quantity to large! Max. ' + RemainToReceive + ' pieces can be received on this order', 'Ilość za duża! w ramach tego zamówienia może być maksymalnie ' + RemainToReceive + ' sztuk')
            //                this.isValid = true;
            //                return;
            // } else {
            if (MaxQuantityToReceiveLeft > D1QT) {
               this.itemService.loadComponentLeft()
               this.showMessageModal2('Aantal te groot! Maximaal ' + D1QT + ' per pallet', 'Quantity too large! Maximum ' + D1QT + ' per pallet', 'Ilość za duża! Maksymalnie ' + D1QT + ' na paletę');
            } else {
               //                   if (RORN != '' && (STAQ <= 0 || !STAQ)) {
               //                      if (!WHST || WHST === "90") {
               //                         this.showMessageModal2('Gekoppelde order fout!', 'Error connected order!', 'Blad przyporzadkowania zamówienia!');
               //                         this.isValid = true;
               //                         return;
               //                      } else {
               //                         //set SPMT to 2

               //                         if (this.MAQA <= MaxQuantityToReceiveLeft) {
               const mformsResponse1 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep +command%3d%22RUN%22+value%3d%22PMS050%22+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WHFACI%22%3e100%3c%2ffield%3e%3cfield +name%3d%22WHPRNO%22%3e' + PRNO + '%3c%2ffield%3e%3cfield +name%3d%22WHMFNO%22%3e' + MFNO + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22AUTOSET%22%3e%3cfield +name%3d%22WHBANO%22%3e' + Bano + '%3c%2ffield%3e%3cfield +name%3d%22WHPAC2%22%3e' + PalletLeft + '%3c%2ffield%3e%3cfield +name%3d%22WHMAQA%22%3e' + MaxQuantityToReceiveLeft + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +%2f%3e%3c%2fsequence%3e');
            }
            //  } else {
            //                            //extra enter tbv overproductie
            //                            const mformsResponse2 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
            //                         }
            //                         await delay(3000);
            //                      }
            //                   } else {

            //                      if (this.MachineLeft = "KCD" && (STAQ <= 0 || STAQ2 <= 0)) {
            //                         this.showMessageModal2('Geen voorraad!', 'Not enough stock!', 'Wza mało zapasów!');
            //                         this.isValid = true;
            //                         return;
            //                      } else {
            //                         if (this.MachineLeft = "KCD" && (STAQ <= this.MAQA || STAQ2 <= this.MAQA)) {
            //                            if (Number(STAQ2) <= Number(STAQ)) {
            //                               const MaxMAQA = STAQ2
            //                               this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA + ' sztuk');
            //                               this.isValid = true;
            //                               return;
            //                            } else {
            //                               const MaxMAQA = STAQ
            //                               this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA + ' sztuk');
            //                               this.isValid = true;
            //                               return;
            //                            }
            //                         }
            //                      }
            //                      if (STAQ <= 0 || !STAQ) {
            //                         this.showMessageModal2('Trechter leeg!', 'Funnel empty!', 'Wsyp/podajnik jest pusty!');
            //                         this.isValid = true;
            //                         return;
            //                      } else {
            //                         if (RORN != '') {
            //                            this.ToDPS = " (x)";
            //                         }
            //                         else {
            //                            this.ToDPS = "";
            //                         }
            //                         //set SPMT to 3 and WHSL to StockLocation
            //    if (this.MAQA <= MaxQuantityToReceiveLeft) {
            //       const mformsResponse3 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + this.ToDPS + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
            //    } else {
            //       //extra enter tbv overproductie
            //       const mformsResponse4 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + this.ToDPS + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
            //    }
            // }
            //                   }
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(3000)

            this.itemService.loadComponentLeft()

            // this.selectedRow = event.rows[0].data
            // this.QuantityToReceiveLeft = '';
            this.OrderQuantityLeft = this.selectedRow['VHORQA'];
            // this.QuantityToReceiveLeft = this.selectedRow['V_1235'];
            // this.itemService.getComponentLeftDataEventEmitter().subscribe(x => this.QuantityToReceiveLeft = x.items[0].V_1235);
            // // this.itemService.setSelectedOrderLeft(this.selectedProductionOrderNumberLeft);
            // await delay(3000);
            // this.itemService.setStockLeft(MTNOLeft, WHSL);
            // this.itemService.SetAttributesOrder(this.selectedProductionOrderNumberLeft, this.selectedProductLeft)

            this.itemService.SetAttributesOrder(this.selectedProductionOrderNumberLeft, this.selectedProductLeft)
            this.itemService.getAttributesDataEventEmitter().subscribe(x => this.QuantityToReceiveLeft = x.items[0].V_1235);
            await delay(500)
            this.AlreadyProducedLeft = Number(this.OrderQuantityLeft) - Number(this.QuantityToReceiveLeft)

            for (let i = 0; i < 5; i++) {
               const AlreadyProducedAfter = Number(this.OrderQuantityLeft) - Number(this.QuantityToReceiveLeft);
               if (AlreadyProducedAfter > AlreadyProduced) {
                  this.showMessageModal3('Label voor ' + this.MaxQuantityToReceiveLeft + ' stuks wordt geprint!', 'Label is printing!', 'Etykieta jest drukowana!')
                  this.messageModal3.afterClose(() => {
                  })
                  this.isValid = true;

                  return;
               } else {
                  await delay(3000)
               }
            }
            this.showMessageModal3('Ontvangst niet uitgevoerd! Probeer opnieuw of vraag hulp.', 'Reception not carried out! Please try again or ask for help.', 'Odbiór nie został przeprowadzony! Spróbuj ponownie lub poproś o pomoc.')
            this.messageModal3.afterClose(() => {
               this.isValid = true;
            })
            // }
            // }
            // }
         }
         //       await this.itemService.loadComponentLeft()
         //       this.itemService.setSelectedOrderLeft(this.selectedProductionOrderNumberLeft);
         //       this.itemService.setStockLeft(MTNOLeft, WHSL);

         //       this.isValid = true
      }
   }



   private showMessageModal(title: string, message: string, message2: string, message3: string, message4: string) {
      this.messageModal = this.sohoModalService.message('<label>' + message + message2 + message3 + message4 + '</label>');
      this.messageModal.options({
         title: title,
         buttons: [
            {
               text: 'OK',
               click: async (e, model) => {
                  this.messageModal.close();
                  const EXPI = this.ExpiApiDate;
                  const FACI = this.selectedRow['VHFACI'];
                  const MFNO = this.selectedRow['VOMFNO'];
                  const PRNO = this.selectedRow['VOPRNO'];
                  const NewBANO = this.selectedRow['V_3010'].substring(0, 7) + this.ExpiApiDate.substring(0, 2);
                  const MaxQuantityToReceiveLeft = Number(this.MaxQuantityToReceiveLeft);
                  this.itemService.setSelectedOrderLeft(this.selectedProductionOrderNumberLeft);
                  this.itemService.setStockLeft(this.MTNOLeft, this.itemService.MTNOStockLocationLeft, '');
                  const delay = ms => new Promise(res => setTimeout(res, ms));
                  const MTNOLeft = this.selectedRow['VMMTNO'];
                  const RemainToReceive = Number(this.RemainToReceiveLeft);
                  const AlreadyProduced = Number(this.AlreadyProducedLeft);
                  const RORN = this.MFNOLeft
                  const NAPQTY = this.NAPQTY;
                  const STAQ = this.StockLeft;
                  const STAQ2 = this.StockLeft2
                  const checkExpiDate = this.checkExpiDate;
                  const THTMin = this.THTMin;
                  const THTMax = this.THTMAx;
                  const WHSL = this.itemService.MTNOStockLocationLeft;
                  const WHST = this.ConnectedOrderStatus;
                  const BRE2 = this.itemService.MTNOStockLocationLeft.substring(6, 12);
                  const D1QT = Number(this.D1QT);

                  //set ThT en BANO

                  if (this.ExistingThTLeft != "00-00-0000") {
                     this.ExpirationDateLeft = this.ExistingThTLeft
                     this.apiDateLeft = this.ExpirationDateLeft;
                     this.checkExpiDate = this.apiDateLeft.substring(6, 10) + this.apiDateLeft.substring(3, 5) + this.apiDateLeft.substring(0, 2);
                     this.ExpiApiDate = this.apiDateLeft.substring(0, 2) + this.apiDateLeft.substring(3, 5) + this.apiDateLeft.substring(8, 10);
                     this.WarningExpiDate = this.apiDateLeft.substring(0, 2) + '-' + this.apiDateLeft.substring(3, 5) + '-' + this.apiDateLeft.substring(6, 10);
                  } else {
                     this.ExpirationDateLeft = this.WarningExpiDate
                  }
                  if (checkExpiDate < THTMin || checkExpiDate > THTMax) {
                     this.showMessageModal2('ThT ' + this.WarningExpiDate + ' valt buiten bereik', 'Experation date ' + this.WarningExpiDate + ' is out of range', 'Data ważności ' + this.WarningExpiDate + ' jest poza zakresem');
                  } else {
                     const mformsResponse = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WHFACI%22%3e' + FACI + '%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WHBANO%22%3e' + NewBANO + '%3c%2ffield%3e%3cfield+name%3d%22WWMEXP%22%3e' + EXPI + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                     await delay(500);

                     if (this.MAQA > RemainToReceive && NAPQTY > 0) {
                        this.itemService.loadComponentLeft()
                        this.showMessageModal2('Aantal te groot! Op deze order kunnen nog maximaal ' + RemainToReceive + ' stuks worden ontvangen', 'Quantity to large! Max. ' + RemainToReceive + ' pieces can be received on this order', 'Ilość za duża! w ramach tego zamówienia może być maksymalnie ' + RemainToReceive + ' sztuk')
                     } else {
                        if (this.MAQA > D1QT) {
                           this.itemService.loadComponentLeft()
                           this.showMessageModal2('Aantal te groot! Maximaal ' + MaxQuantityToReceiveLeft + ' per pallet', 'Quantity too large! Maximum ' + MaxQuantityToReceiveLeft + ' per pallet', 'Ilość za duża! Maksymalnie ' + MaxQuantityToReceiveLeft + ' na paletę');
                        } else {
                           if (RORN != '' && (STAQ <= 0 || !STAQ)) {
                              if (!WHST || WHST === "90") {
                                 this.showMessageModal2('Gekoppelde order fout!', 'Error connected order!', 'Blad przyporzadkowania zamówienia!');
                                 this.isValid = true;
                                 return;
                              } else {
                                 //set SPMT to 2

                                 if (this.MAQA <= MaxQuantityToReceiveLeft) {
                                    const mformsResponse1 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                 } else {
                                    //extra enter tbv overproductie
                                    const mformsResponse2 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                 }
                              }
                           } else {

                              if (this.MachineLeft = "KCD" && (STAQ <= 0 || STAQ2 <= 0)) {
                                 this.showMessageModal2('Geen voorraad!', 'Not enough stock!', 'Wza mało zapasów!');
                                 this.isValid = true;
                                 return;
                              } else {
                                 if (this.MachineLeft = "KCD" && (STAQ <= this.MAQA || STAQ2 <= this.MAQA)) {
                                    if (Number(STAQ2) <= Number(STAQ)) {
                                       const MaxMAQA = STAQ2
                                       this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA + ' sztuk');
                                       this.isValid = true;
                                       return;
                                    } else {
                                       const MaxMAQA = STAQ
                                       this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA + ' sztuk');
                                       this.isValid = true;
                                       return;
                                    }
                                 }
                              }
                              if (STAQ <= 0 || !STAQ) {
                                 this.showMessageModal2('Trechter leeg!', 'Funnel empty!', 'Wsyp/podajnik jest pusty!');
                                 this.isValid = true;
                                 return;
                              } else {
                                 if (RORN != '') {
                                    this.ToDPS = " (x)";
                                 }
                                 else {
                                    this.ToDPS = "";
                                 }
                                 //set SPMT to 3 and WHSL to StockLocation and delete WHRORN
                                 if (this.MAQA <= MaxQuantityToReceiveLeft) {
                                    const mformsResponse3 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + this.ToDPS + this.ToDPS + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                 } else {
                                    //extra enter tbv overproductie
                                    const mformsResponse4 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + this.ToDPS + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                 }
                              }
                           }
                           await delay(3000);

                           this.itemService.loadComponentLeft()
                           this.itemService.setSelectedOrderLeft(this.selectedProductionOrderNumberLeft);
                           await delay(3000)
                           this.itemService.setStockLeft(MTNOLeft, WHSL, '');


                           const AlreadyProducedAfter = Number(this.AlreadyProducedLeft);
                           for (let i = 0; i < 3; i++) {
                              if (AlreadyProducedAfter > AlreadyProduced) {
                                 this.showMessageModal3('Label voor ' + this.MAQA + ' stuks wordt geprint!', 'Label is printing!', 'Etykieta jest drukowana!')
                                 this.messageModal3.afterClose(() => {
                                 })
                                 this.isValid = true;

                                 return;
                              } else {
                                 await delay(3000)
                              }
                           }
                           this.showMessageModal3('Ontvangst niet uitgevoerd! Probeer opnieuw of vraag hulp.', 'Reception not carried out! Please try again or ask for help.', 'Odbiór nie został przeprowadzony! Spróbuj ponownie lub poproś o pomoc.')
                           this.messageModal3.afterClose(() => {
                              this.isValid = true;
                           })
                        }
                     }
                  }
               },
               isDefault: false
            }
            ,
            {
               text: 'Annuleren',
               click: () => {
                  this.messageModal.close();

                  this.isValid = true;
                  return;
               },
               isDefault: true
            }
         ],
         content: '<div><h4>' + message + '<br>' + message2 + '</h4><br><br><h1>' + message3 + '<br>' + message4 + '</h1></div>'
      });
      this.messageModal.open();
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

   private showMessageModal3(title: string, message: string, message2: string) {
      this.messageModal3 = this.sohoModalService.message('<label>' + message + message2 + '</label>');
      this.messageModal3.options({
         title: '<header>' + title + '</header>',
         buttons: [
            {
               text: 'OK',
               click: (e, model) => { this.messageModal3.close(); },
               isDefault: true
            }
         ],
         content: '<div><h4>' + message + '<br>' + message2 + '</h4></div>'
      });
      this.messageModal3.open();
   }


}
function Highlight(id) {
   var rows = $('#tbl > tbody > tr').each(function (i, elem) {
      elem.style.background = 'green';
   })
   var tr = document.getElementById(id);
   tr.style.background = 'red';
}
