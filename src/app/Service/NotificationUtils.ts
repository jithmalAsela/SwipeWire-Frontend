// import {ToastsManager, ToastOptions} from "ng2-toastr/ng2-toastr";
// import {Injectable} from "@angular/core";
// import { Observable } from "rxjs";

// declare var $: any;

// @Injectable()
// export class NotificationUtils {

//   constructor(public _toastr: ToastsManager){
//   }

//   showSuccessNotification(msg: string, title?: string) {
//     title = NotificationUtils.validateTitle(title);
//     this._toastr.success(msg, title);
//   }

//   showErrorNotification(msg: string, title?: string) {
//     title = NotificationUtils.validateTitle(title);
//     this._toastr.error(msg, title);
//   }

//   showNoDataErrorNotification(title?: string) {
//     title = NotificationUtils.validateTitle(title);
//     this._toastr.error("Sorry!. No Data Found.", title);
//   }

//   showRestErrorNotification(error: any) {
//     this._toastr.error(error.error.message, "Error");
//   }

//   showInfoNotification(msg: string, title?: string) {
//     title = NotificationUtils.validateTitle(title);
//     this._toastr.info(msg, title);
//   }

//   showWarningNotification(msg: string, title?: string) {
//     title = NotificationUtils.validateTitle(title);
//     this._toastr.warning(msg, title);
//   }

//   showNodataErrorNotification() {
//     this._toastr.error("Cannot find data.",  NotificationUtils.validateTitle(''));
//   }


//   clearAllNotifications() {
//     this._toastr.clearAllToasts();
//   }
//   showMainLoading() {
//     $('#loading-layer-custom').show();
//   }

//   hideMainLoading() {
//     $('#loading-layer-custom').hide();
//   }
//   showMainLoadingWithoutTransparent() {
//     $('#loading-layer-without-transparent').show();
//   }

//   hideMainLoadingWithoutTransparent() {
//     $('#loading-layer-without-transparent').hide();
//   }
//   private static validateTitle(title: string): string {
//     if (title == undefined || title == null) {
//       return '';
//     }
//     return title;
//   }

// }
