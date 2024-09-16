import { EventEmitter, Injectable } from '@angular/core';
import { IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';

@Injectable({
   providedIn: 'root'
})

export class ItemService {

   public selectedItem: String;
   public MainWarehouse: String = "";
   resolve: Function;
   reject: Function;
   subscriber: Function;

   protected ConectedOrderLeftDataEventEmitter: EventEmitter<IMIResponse>;
   protected AttributesDataEventEmitter: EventEmitter<IMIResponse>;
   protected UploadAttributesDataEventEmitter: EventEmitter<IMIResponse>;
   protected ItemDataEventEmitter: EventEmitter<IMIResponse>;
   protected CustomerDataEventEmitter: EventEmitter<IMIResponse>;
   protected LocationDataEventEmitter: EventEmitter<IMIResponse>;

   protected ProductionOrderLeftDataEventEmitter: EventEmitter<IMIResponse>;
   protected StockLeftDataEventEmitter: EventEmitter<IMIResponse>;
   protected StockLeftDataEventEmitter2: EventEmitter<IMIResponse>;
   protected ComponentLeftDataEventEmitter: EventEmitter<IMIResponse>;



   isBusy: any;
   items: any[];
   itemNumber: any[];
   Day: String;
   EAN: String;
   MFNO: any[];
   miExtendedService: any;
   LstWarehouseData: any;
   ProductionOrderNumber: String;

   MFNOLeft: any;

   BunkerLeft: any;

   MTNOStockLocationLeft: any;


   MachineRight: any;
   MachineLeft: any;

   ConnectedOrderDataEventEmitter: any;
   WHLO: any;

   BunkerLeft2: String;
   ItemNumber: String;
   CustomerNumber: String;
   AttributeNumber: String;
   OrderNumber: String;
   ATID: String;
   ATAV: String;
   Location: String;
   BANO: String;





   constructor(private miService: MIService) {
      this.ComponentLeftDataEventEmitter = new EventEmitter<IMIResponse>();
      this.AttributesDataEventEmitter = new EventEmitter<IMIResponse>();
      this.UploadAttributesDataEventEmitter = new EventEmitter<IMIResponse>();
      this.ItemDataEventEmitter = new EventEmitter<IMIResponse>();
      this.CustomerDataEventEmitter = new EventEmitter<IMIResponse>();
      this.LocationDataEventEmitter = new EventEmitter<IMIResponse>();

      this.ProductionOrderLeftDataEventEmitter = new EventEmitter<IMIResponse>();
      this.StockLeftDataEventEmitter = new EventEmitter<IMIResponse>();
      this.StockLeftDataEventEmitter2 = new EventEmitter<IMIResponse>();

      this.ConectedOrderLeftDataEventEmitter = new EventEmitter<IMIResponse>();
   }

   public getMachine(event) {
      // if (this.MachineLeft) { window.location.reload(); }
      let StockLocation: any;
      StockLocation = event;
      this.MachineLeft = StockLocation
      this.loadComponentLeft();
   }


   public getComponentLeftDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.ComponentLeftDataEventEmitter;
   }


   loadComponentLeft(): Promise<IMIResponse> {
      const miRequestRight: IMIRequest = {
         program: "CMS100MI",
         transaction: this.MachineLeft,
         record: {

         },
         includeMetadata: true,
         maxReturnedRecords: 100,

      };
      this.miService.execute(miRequestRight).subscribe(x =>
         this.ComponentLeftDataEventEmitter.emit(x)
      )
      return this.miService.execute(miRequestRight).toPromise();
   };




   public getAttributesDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.AttributesDataEventEmitter;
   }
   SetAttributesOrder(OrderNumber: String, ItemNumber: String) {
      this.OrderNumber = OrderNumber;
      this.ItemNumber = ItemNumber
      this.loadAttributes();
   }


   loadAttributes() {
      const miRequestRight: IMIRequest = {
         program: "CMS100MI",
         transaction: 'Lst_SDK_013_02',
         record: {
            VOFACI: '100',
            VOPRNO: this.ItemNumber,
            VOMFNO: this.OrderNumber,
         },
         includeMetadata: true,
         maxReturnedRecords: 2,

      };
      this.miService.execute(miRequestRight).subscribe(x =>
         this.AttributesDataEventEmitter.emit(x)
      )
      return this.miService.execute(miRequestRight).toPromise();
   };

   public getLocationDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.LocationDataEventEmitter;
   }
   SetLocation(Location: String) {
      this.Location = Location;

      this.loadLocation();
   }


   loadLocation() {
      const miRequestRight: IMIRequest = {
         program: "CMS100MI",
         transaction: 'Lst_SDK_013_03',
         record: {
            MTWHLO: '100',
            F_WHSL: this.Location,
            T_WHSL: this.Location,
         },
         includeMetadata: true,
         maxReturnedRecords: 10,

      };
      this.miService.execute(miRequestRight).subscribe(x =>
         this.LocationDataEventEmitter.emit(x)
      )
      return this.miService.execute(miRequestRight).toPromise();
   };

   public NowUploadAttributesDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.UploadAttributesDataEventEmitter;
   }

   UploadAttributesOrder(AttributeNumber: String, ATID: String, ATAV: String) {
      this.AttributeNumber = AttributeNumber;
      this.ATID = ATID;
      this.ATAV = ATAV
      this.UploadAttributes();
   }


   UploadAttributes() {
      const miRequestRight: IMIRequest = {
         program: "ATS101MI",
         transaction: 'SetAttrValue',
         record: {
            ATNR: this.AttributeNumber,
            ATID: this.ATID,
            ATAV: this.ATAV,

         },
         includeMetadata: true,
         maxReturnedRecords: 2,

      };
      this.miService.execute(miRequestRight).subscribe(x =>
         this.UploadAttributesDataEventEmitter.emit(x)
      )
      return this.miService.execute(miRequestRight).toPromise();
   };


   public getItemDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.ItemDataEventEmitter;
   }
   SetItem(itemNumber: String) {
      this.ItemNumber = itemNumber;
      this.loadItemdata(itemNumber);
   }



   loadItemdata(itemNumber) {
      const miRequestRight: IMIRequest = {
         program: "MMS200MI",
         transaction: 'Get',
         record: {
            ITNO: this.ItemNumber,

         },
         includeMetadata: true,
         maxReturnedRecords: 100,

      };
      this.miService.execute(miRequestRight).subscribe(x =>
         this.ItemDataEventEmitter.emit(x)
      )
      return this.miService.execute(miRequestRight).toPromise();
   };

   public getCustomerDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.CustomerDataEventEmitter;
   }
   SetCustomer(customerNumber: String) {
      this.CustomerNumber = customerNumber;
      this.loadCustomerdata(customerNumber);
   }



   loadCustomerdata(customerNumber) {
      const miRequestRight: IMIRequest = {
         program: "CRS610MI",
         transaction: 'GetBasicData',
         record: {
            CUNO: this.CustomerNumber,

         },
         includeMetadata: true,
         maxReturnedRecords: 100,

      };
      this.miService.execute(miRequestRight).subscribe(x =>
         this.CustomerDataEventEmitter.emit(x)
      )
      return this.miService.execute(miRequestRight).toPromise();
   };










   public getProductionOrderLeftDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.ProductionOrderLeftDataEventEmitter;
   }
   setSelectedOrderLeft(ProductionOrderNumber: String) {
      this.ProductionOrderNumber = ProductionOrderNumber;
      this.loadProductionOrdersLeft();
   }

   loadProductionOrdersLeft() {
      const miRequest: IMIRequest = {
         program: "CMS100MI",
         transaction: "Lst_SDK_011_02",
         record: {
            VOFACI: '200',
            VOMFNO: this.ProductionOrderNumber
            ,

         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.ProductionOrderLeftDataEventEmitter.emit(x)
      )
      return this.miService.execute(miRequest).toPromise();
   }

   public getStockLeftDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.StockLeftDataEventEmitter;
   }
   setStockLeft(MTNO: String, MTNOStockLocationLeft: String, BANO: String) {
      this.BunkerLeft = MTNO;
      this.MTNOStockLocationLeft = MTNOStockLocationLeft;
      this.BANO = BANO
      this.loadStockLeft();
   }

   loadStockLeft() {
      const miRequest: IMIRequest = {
         program: "MMS060MI",
         transaction: "LstBalID",
         record: {
            WHLO: '100',
            ITNO: this.BunkerLeft,
            WHSL: this.MTNOStockLocationLeft,
            BANO: this.BANO,
            STAS: '2',
         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.StockLeftDataEventEmitter.emit(x)
      )
   }

   public getStockLeftDataEventEmitter2(): EventEmitter<IMIResponse> {
      return this.StockLeftDataEventEmitter2;
   }
   setStockLeft2(MTNO: String, MTNOStockLocationLeft: String) {
      this.BunkerLeft2 = MTNO;
      this.MTNOStockLocationLeft = MTNOStockLocationLeft;
      this.loadStockLeft();
   }

   loadStockLeft2() {
      const miRequest: IMIRequest = {
         program: "MMS060MI",
         transaction: "LstBalID",
         record: {
            WHLO: '200',
            ITNO: this.BunkerLeft2,
            WHSL: this.MTNOStockLocationLeft,
            STAS: '2',
         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.StockLeftDataEventEmitter2.emit(x)
      )
   }




   public getConnectedOrderLeftDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.ConectedOrderLeftDataEventEmitter;
   }

   setCheckConnectedOrdersLeft(BunkerLeft: String, MFNOLeft: String) {
      this.BunkerLeft = BunkerLeft;
      this.MFNOLeft = MFNOLeft;
      this.CheckConnectedOrderLeft();
   }

   CheckConnectedOrderLeft() {
      const miRequest: IMIRequest = {
         program: "PMS100MI",
         transaction: "Get",
         record: {
            FACI: '200',
            PRNO: this.BunkerLeft,
            MFNO: this.MFNOLeft
            ,

         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.ConectedOrderLeftDataEventEmitter.emit(x)
      )
   }






   // if (this.MachineLeft === "KS ") {
   //    this.MTNOStockLocationLeft = '210GEPAST'
   //    this.WHLO = '210';
   // } else {
   //    if (this.MachineLeft === "KCD ") {
   //       this.MTNOStockLocationLeft = '210EXP'
   //       this.WHLO = '200';
   //    } else {
   //       if (this.MachineLeft.substring(0, 1) === "K") {
   //          this.MTNOStockLocationLeft = '210INP' + this.MachineLeft.substring(2, 1);
   //          this.WHLO = '210';
   //       } else {
   //          this.MTNOStockLocationLeft = '200INP' + this.MachineLeft;
   //          this.WHLO = '200';
   //       }
   //    }
   // }
   // }
}
