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

   protected ComponentLeftDataEventEmitter: EventEmitter<IMIResponse>;
   protected AttributesDataEventEmitter: EventEmitter<IMIResponse>;
   protected LocationDataEventEmitter: EventEmitter<IMIResponse>;
   protected UploadAttributesDataEventEmitter: EventEmitter<IMIResponse>;
   protected ItemDataEventEmitter: EventEmitter<IMIResponse>;
   protected CustomerCugexDataEventEmitter: EventEmitter<IMIResponse>;
   protected StockLeftDataEventEmitter: EventEmitter<IMIResponse>;

   BunkerLeft: any;
   MTNOStockLocationLeft: any;
   MachineLeft: any;
   WHLO: any;
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
      this.LocationDataEventEmitter = new EventEmitter<IMIResponse>();
      this.UploadAttributesDataEventEmitter = new EventEmitter<IMIResponse>();
      this.ItemDataEventEmitter = new EventEmitter<IMIResponse>();
      this.CustomerCugexDataEventEmitter = new EventEmitter<IMIResponse>();
      this.StockLeftDataEventEmitter = new EventEmitter<IMIResponse>();
   }

   public getMachine(event) {
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





   public getCustomerDataEventEmitter() {
      return this.CustomerCugexDataEventEmitter;
   }
   SetCustomer(customerNumber: String) {
      this.CustomerNumber = customerNumber;
      this.loadCustomerCugexdata(customerNumber)
   }
   loadCustomerCugexdata(customerNumber) {
      const miRequestRight: IMIRequest = {
         program: "CUSEXTMI",
         transaction: 'LstFieldValue',
         record: {
            FILE: "OCUSMA",
            PK01: this.CustomerNumber,

         },
         includeMetadata: true,
         maxReturnedRecords: 100,

      };
      this.miService.execute(miRequestRight).subscribe(x =>
         this.CustomerCugexDataEventEmitter.emit(x)
      )
      return this.miService.execute(miRequestRight).toPromise();
   };





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
}
