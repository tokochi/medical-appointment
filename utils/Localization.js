import { loadCldr, L10n } from "@syncfusion/ej2-base";
import * as gregorian from "cldr-data/main/ar-DZ/ca-gregorian.json";
import * as currency from "cldr-data/main/ar-DZ/currencies.json";
import * as numbers from "cldr-data/main/ar-DZ/numbers.json";
import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import * as timeZoneNames from "cldr-data/main/ar-DZ/timeZoneNames.json";
import { setCulture, setCurrencyCode } from "@syncfusion/ej2-base";
setCulture("ar-DZ");
setCurrencyCode("DZD");
loadCldr(numberingSystems, gregorian, numbers,currency, timeZoneNames);
export default function Localization(props) {
  L10n.load({
    // "fr-BE": {
    //   daterangepicker: {
    //     placeholder: "Choisir la période",
    //     startLabel: "Choisir la date de début",
    //     endLabel: "Choisir la date de fin",
    //     applyText: "Appliquer",
    //     cancelText: "Annuler",
    //     selectedDays: "Jours sélectionnés",
    //     days: "jours",
    //     customRange: "plage personnalisée",
    //   },
    //   'listbox': { 
    //     'noRecordsTemplate': "Aucun éléve abonner ", 
    //     } ,
    //   uploader: {
    //     invalidMinFileSize: "La taille du fichier est trop petite! S'il vous plaît télécharger des fichiers avec une taille minimale de 10 Ko",
    //     invalidMaxFileSize: "La taille du fichier dépasse 28 Mo",
    //     invalidFileType: "Le type de fichier n'est pas autorisé",
    //     Browse: "Parcourir",
    //     Clear: "Clair",
    //     Upload: "Télécharger",
    //     dropFilesHint: "",
    //     uploadFailedMessage: "Impossible d'importer le fichier",
    //     uploadSuccessMessage: "Fichier téléchargé avec succès",
    //     removedSuccessMessage: "Fichier supprimé avec succès",
    //     removedFailedMessage: "Le fichier n'a pas pu être supprimé",
    //     inProgress: "Téléchargement",
    //     readyToUploadMessage: "Prêt à télécharger",
    //     remove: "Retirer",
    //     cancel: "Annuler",
    //     delete: "Supprimer le fichier",
    //   },
    //   schedule: {
    //     day: "journée",
    //     week: "La semaine",
    //     workWeek: "Semaine de travail",
    //     month: "Mois",
    //     agenda: "Ordre du jour",
    //     weekAgenda: "Agenda de la semaine",
    //     workWeekAgenda: "Agenda de la semaine de travail",
    //     monthAgenda: "Agenda du mois",
    //     today: "Aujourd'hui",
    //     noEvents: "Pas d'événements",
    //     emptyContainer: "Aucun événement n'est prévu ce jour-là.",
    //     allDay: "Toute la journée",
    //     start: "Début",
    //     end: "Fin",
    //     more: "plus",
    //     close: "Fermer",
    //     cancel: "Annuler",
    //     noTitle: "(Pas de titre)",
    //     delete: "Effacer",
    //     deleteEvent: "Supprimer un événement",
    //     deleteMultipleEvent: "Supprimer plusieurs événements",
    //     selectedItems: "Articles sélectionnés",
    //     deleteSeries: "Supprimer la série",
    //     edit: "modifier",
    //     editSeries: "Modifier la série",
    //     editEvent: "Modifier l'événement",
    //     createEvent: "Créer",
    //     subject: "Assujettir",
    //     addTitle: "",
    //     moreDetails: "Plus de détails",
    //     save: "sauvegarder",
    //     editContent: "Voulez-vous modifier uniquement cet événement ou une série entière?",
    //     deleteRecurrenceContent: "Voulez-vous supprimer uniquement cet événement ou une série entière?",
    //     deleteContent: "Êtes-vous sûr de vouloir supprimer cet événement?",
    //     deleteMultipleContent: "Êtes-vous sûr de vouloir supprimer les événements sélectionnés?",
    //     newEvent: "Nouvel évènement",
    //     title: "Titre",
    //     location: "Emplacement",
    //     description: "La description",
    //     timezone: "Fuseau horaire",
    //     startTimezone: "Début du fuseau horaire",
    //     endTimezone: "Fin du fuseau horaire",
    //     repeat: "Répéter",
    //     saveButton: "sauvegarder",
    //     cancelButton: "Annuler",
    //     deleteButton: "Effacer",
    //     recurrence: "Récurrence",
    //     wrongPattern: "Le modèle de récurrence n'est pas valide.",
    //     seriesChangeAlert: "Les modifications apportées à des instances spécifiques de cette série seront annulées et ces événements correspondront à nouveau à la série.",
    //     createError: "La durée de l'événement doit être plus courte que sa fréquence. Raccourcissez la durée ou modifiez le modèle de récurrence dans l'éditeur d'événement de récurrence.",
    //     recurrenceDateValidation: "Certains mois ont moins que la date sélectionnée. Pour ces mois, l'événement se produira à la dernière date du mois.",
    //     sameDayAlert: "Deux occurrences du même événement ne peuvent pas se produire le même jour.",
    //     editRecurrence: "Modifier la récurrence",
    //     repeats: "Répète",
    //     alert: "Alerte",
    //     startEndError: "La date de fin sélectionnée se produit avant la date de début.",
    //     invalidDateError: "La valeur de date saisie est invalide.",
    //     ok: "D'accord",
    //     occurrence: "Occurrence",
    //     series: "Séries",
    //     previous: "précédent",
    //     next: "Prochain",
    //     timelineDay: "Journée chronologique",
    //     timelineWeek: "Semaine chronologique",
    //     timelineWorkWeek: "Semaine de travail chronologique",
    //     timelineMonth: "Mois de la chronologie",
    //   },
    //   recurrenceeditor: {
    //     none: "Aucun",
    //     daily: "Par jour",
    //     weekly: "Par Semaine",
    //     monthly: "Par Mois",
    //     month: "Mois",
    //     yearly: "Annuel",
    //     never: "Jamais",
    //     until: "Jusqu'à",
    //     count: "Compter",
    //     first: "Premier",
    //     second: "Seconde",
    //     third: "Troisième",
    //     fourth: "Quatrième",
    //     last: "Dernier",
    //     repeat: "Répéter",
    //     repeatEvery: "Répéter tous les",
    //     on: "Répéter sur",
    //     end: "Fin",
    //     onDay: "journée",
    //     days: "Journées",
    //     weeks: "Semaines",
    //     months: "Mois",
    //     years: "Années",
    //     every: "chaque",
    //     summaryTimes: "fois",
    //     summaryOn: "sur",
    //     summaryUntil: "jusqu'à",
    //     summaryRepeat: "Répète",
    //     summaryDay: "journées",
    //     summaryWeek: "semaines",
    //     summaryMonth: "mois",
    //     summaryYear: "années",
    //     monthWeek: "Mois Semaine",
    //     monthPosition: "Position du mois",
    //     monthExpander: "Mois Expander",
    //     yearExpander: "Année Expander",
    //     repeatInterval: "Intervalle de répétition",
    //   },

    //   dialog: {
    //     close: "Fermer",
    //     open: "Ouvrir",
    //   },
    //   datetimepicker: {
    //     placeholder: "Date",
    //     today: "Aujourd'hui",
    //   },
    //   grid: {
    //     Add: "Ajouter",
    //     Edit: "Modifier",
    //     Cancel: "Annuler",
    //     CancelButton: "Annuler",
    //     Update: "Mettre à jour",
    //     Delete: "Supprimer",
    //     EmptyRecord: "Aucun enregistrement à afficher",
    //     EmptyDataSourceError: "Aucun enregistrement à afficher",
    //     Item: "Article",
    //     Print: "Imprimer",
    //     Columnchooser: "Colonne",
    //     ChooseColumns: "Choisir colonnes",
    //     Pdfexport: "Exporter PDF",
    //     Excelexport: "Exporter Excel",
    //     Search: "Recherche",
    //     Save: "Sauvgarder",
    //     SaveButton: "Sauvgarder",
    //     ConfirmDelete: "Voulez-vous vraiment supprimer cette ligne ?",
    //     CancelEdit: "Voulez-vous vraiment annuler les modifications ?",
    //     Matchs: "Aucun résultat",
    //     Export: "Exporter",
    //     EditOperationAlert: "Aucune ligne sélectionnée pour l'opération de modification",
    //     DeleteOperationAlert: "Aucune ligne sélectionnée pour l'opération de suppression",
    //   },
    //   pager: {
    //     FirstPage: "Première page",
    //     LastPage: "Dernière page",
    //     PreviousPage: "Page précédente",
    //     currentPageInfo: "{0} sur {1} pages",
    //     NextPage: "Page suivante",
    //     firstPageTooltip: "Première page",
    //     lastPageTooltip: "Dernière page",
    //     nextPageTooltip: "Page suivante",
    //     nextPagerTooltip: "Page suivante",
    //     previousPageTooltip: "page précédente",
    //     previousPagerTooltip: "page précédente",
    //     totalItemsInfo: `({0} ${props})`,
    //   },

    //   dropdowns: {
    //     actionFailureTemplate: "Modèle d'échec d'action",
    //     noRecordsTemplate: "Aucun enregistrement trouvé",
    //   },
    // },
    "ar-DZ":{
    "daterangepicker": {
        "placeholder": "اختر الفترة",
        "startLabel": "اختر تاريخ البدء",
        "endLabel": "اختر تاريخ الانتهاء",
        "applyText": "تطبيق",
        "cancelText": "إلغاء",
        "selectedDays": "الأيام المختارة",
        "days": "أيام",
        "customRange": "نطاق مخصص",
      },
      "listbox": {
        "noRecordsTemplate": "لا يوجد طلاب مسجلين",
      },
      "uploader": {
        "invalidMinFileSize": "حجم الملف صغير جدًا! يرجى تحميل ملفات بحجم لا يقل عن 10 كيلوبايت",
        "invalidMaxFileSize": "حجم الملف يتجاوز 28 ميغابايت",
        "invalidFileType": "نوع الملف غير مسموح به",
        "Browse": "تصفح",
        "Clear": "مسح",
        "Upload": "تحميل",
        "dropFilesHint": "",
        "uploadFailedMessage": "تعذر استيراد الملف",
        "uploadSuccessMessage": "تم تحميل الملف بنجاح",
        "removedSuccessMessage": "تم حذف الملف بنجاح",
        "removedFailedMessage": "تعذر حذف الملف",
        "inProgress": "تحميل",
        "readyToUploadMessage": "جاهز للتحميل",
        "remove": "إزالة",
        "cancel": "إلغاء",
        "delete": "حذف الملف",
      },
      "schedule": {
        "day": "يوم",
        "week": "الأسبوع",
        "workWeek": "أسبوع العمل",
        "month": "شهر",
        "agenda": "جدول الأعمال",
        "weekAgenda": "جدول أعمال الأسبوع",
        "workWeekAgenda": "جدول أعمال أسبوع العمل",
        "monthAgenda": "جدول أعمال الشهر",
        "today": "اليوم",
        "noEvents": "لا توجد أحداث",
        "emptyContainer": "لا يوجد أحداث مقررة لهذا اليوم.",
        "allDay": "اليوم بأكمله",
        "start": "البدء",
        "end": "النهاية",
        "more": "المزيد",
        "close": "إغلاق",
        "cancel": "إلغاء",
        "noTitle": "(بدون عنوان)",
        "delete": "حذف",
        "deleteEvent": "حذف حدث",
        "deleteMultipleEvent": "حذف عدة أحداث",
        "selectedItems": "العناصر المحددة",
        "deleteSeries": "حذف السلسلة",
        "edit": "تعديل",
        "editSeries": "تعديل السلسلة",
        "editEvent": "تعديل الحدث",
        "createEvent": "إنشاء",
        "subject": "الموضوع",
        "addTitle": "",
        "moreDetails": "مزيد من التفاصيل",
        "save": "حفظ",
        "editContent": "هل تريد تعديل هذا الحدث فقط أم سلسلة كاملة؟",
        "deleteRecurrenceContent": "هل تريد حذف هذا الحدث فقط أم سلسلة كاملة؟",
        "deleteContent": "هل أنت متأكد من أنك تريد حذف هذا الحدث؟",
        "deleteMultipleContent": "هل أنت متأكد من أنك تريد حذف الأحداث المحددة؟",
        "newEvent": "حدث جديد",
        "title": "العنوان",
        "location": "الموقع",
        "description": "الوصف",
        "timezone": "المنطقة الزمنية",
        "startTimezone": "منطقة زمنية البدء",
        "endTimezone": "منطقة زمنية النهاية",
        "repeat": "تكرار",
        "saveButton": "حفظ",
        "cancelButton": "إلغاء",
        "deleteButton": "حذف",
        "recurrence": "تكرار",
        "wrongPattern": "النموذج التكراري غير صحيح.",
        "seriesChangeAlert": "سيتم إلغاء التغييرات التي تم إجراؤها على مثيلات محددة من هذه السلسلة وستتطابق هذه الأحداث مرة أخرى مع السلسلة.",
        "createError": "يجب أن تكون مدة الحدث أقصر من تكرارتها. قم بتقصير المدة أو قم بتعديل نموذج التكرار في محرر حدث التكرار.",
        "recurrenceDateValidation": "بعض الأشهر لديها أقل من عدد الأيام المحدد في نموذج التكرار. لشهر هذه الأحداث ستحدث في اليوم الأخير من الشهر.",
        "sameDayAlert": "لا يمكن أن يحدث حدثان من نفس السلسلة في نفس اليوم.",
        "editRecurrence": "تعديل التكرار",
        "repeats": "يتكرر",
        "alert": "تنبيه",
        "startEndError": "تاريخ النهاية المحدد يحدث قبل تاريخ البدء.",
        "invalidDateError": "قيمة التاريخ المدخلة غير صالحة.",
        "ok": "موافق",
        "occurrence": "الحدث",
        "series": "السلسلة",
        "previous": "السابق",
        "next": "التالي",
        "timelineDay": "خط زمني يومي",
        "timelineWeek": "خط زمني أسبوعي",
        "timelineWorkWeek": "خط زمني أسبوعي للعمل",
        "timelineMonth": "خط زمني شهري",
      },
      "recurrenceeditor": {
        "none": "لا شيء",
        "daily": "يوميًا",
        "weekly": "أسبوعيًا",
        "monthly": "شهريًا",
        "month": "شهر",
        "yearly": "سنويًا",
        "never": "أبدا",
        "until": "حتى",
        "count": "العدد",
        "first": "أول",
        "second": "ثاني",
        "third": "ثالث",
        "fourth": "رابع",
        "last": "أخير",
        "repeat": "تكرار",
        "repeatEvery": "كرر كل",
        "on": "في",
        "end": "نهاية",
        "onDay": "يوم",
        "days": "أيام",
        "weeks": "أسابيع",
        "months": "أشهر",
        "years": "سنوات",
        "every": "كل",
        "summaryTimes": "مرتين",
        "summaryOn": "في",
        "summaryUntil": "حتى",
        "summaryRepeat": "كرر",
        "summaryDay": "أيام",
        "summaryWeek": "أسابيع",
        "summaryMonth": "أشهر",
        "summaryYear": "سنوات",
        "monthWeek": "أسبوع الشهر",
        "monthPosition": "موضع الشهر",
        "monthExpander": "توسيع الشهر",
        "yearExpander": "توسيع السنة",
        "repeatInterval": "فاصل التكرار",
      },
      'calendar': {
        today: "اليوم"
      },
      'datepicker': {
        "today": "اليوم",
      },
      "dialog": {
        "close": "إغلاق",
        "open": "فتح",
      },
      "datetimepicker": {
        "placeholder": "التاريخ",
        "today": "اليوم",
      },
      "grid": {
        "Add": "إضافة",
        "Edit": "تعديل",
        "Cancel": "إلغاء",
        "CancelButton": "إلغاء",
        "Update": "تحديث",
        "Delete": "حذف",
        "EmptyRecord": "لا يوجد سجلات لعرضها",
        "EmptyDataSourceError": "لا يوجد سجلات لعرضها",
        "Item": "صنف",
        "Print": "طباعة",
        "Columnchooser": "العمود",
        "ChooseColumns": "اختر الأعمدة",
        "Pdfexport": "تصدير إلى PDF",
        "Excelexport": "تصدير إلى Excel",
        "Search": "بحث",
        "Save": "حفظ",
        "SaveButton": "حفظ",
        "ConfirmDelete": "هل تريد حقًا حذف هذا السطر؟",
        "CancelEdit": "هل تريد حقًا إلغاء التغييرات؟",
        "Matchs": "لا نتائج",
        "Export": "تصدير",
        "ToolBar": "شريط الأدوات",
        "Filter": "فلتر",
        "Sort": "ترتيب",
        "Insert": "إدراج",
        "Remove": "إزالة",
        "Clear": "مسح",
        "Refresh": "تحديث",
        "GroupBy": "تجميع حسب",
        "Sum": "المجموع",
        "Count": "العد",
        "Average": "المتوسط",
        "Maximum": "الحد الأقصى",
        "Minimum": "الحد الأدنى",
        "First": "الأول",
        "Last": "الأخير",
        "Previous": "السابق",
        "Next": "التالي",
        "Page": "الصفحة",
        "Of": "من",
        "Records": "السجلات",
        "Copy": "نسخ",
        "Cut": "قص",
        "Paste": "لصق",
        "Find": "بحث عن",
        "SelectAll": "تحديد الكل",
        "DeselectAll": "إلغاء تحديد الكل",
        "NoRecords": "لا توجد سجلات مطابقة",
        "Loading": "جار التحميل...",
      },
      pager: {
        FirstPage: "الصفحة الأولى",
        LastPage: "الصفحة الأخيرة",
        PreviousPage: "الصفحة السابقة",
        currentPageInfo: "{0} من {1} صفحات",
        NextPage: "الصفحة التالية",
        firstPageTooltip: "الصفحة الأولى",
        lastPageTooltip: "الصفحة الأخيرة",
        nextPageTooltip: "الصفحة التالية",
        nextPagerTooltip: "الصفحة التالية",
        previousPageTooltip: "الصفحة السابقة",
        previousPagerTooltip: "الصفحة السابقة",
        totalItemsInfo: `({0} ${props})`,
        totalItemInfo: `({0} ${props})`,
      },
      dropdowns: {
        actionFailureTemplate: "نموذج فشل الإجراء",
        noRecordsTemplate: "لا توجد سجلات مطابقة",
      },
    }
  });
}

