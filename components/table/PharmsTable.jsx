"use client";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Reorder,
  Page,
  Selection,
  Resize,
  Search,
  Inject,
  Edit,
  Toolbar,
  PdfExport,
  ExcelExport,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useStore } from "@context/store";
import Localization from "../../utils/Localization";
import PharmsGridName from "@components/table/templates/pharms/PharmName";
import SignupInputsForm from "@components/forms/pharm/SignupInputsForm";

function PharmsTable() {
  // ******** Get Pharms List  ********
  Localization("صيديلة");
  // ******** Column Templates  ********
  const pharmsGridName = (props) => <PharmsGridName {...props} />;
  // ******** Grid Table  ********
  const gridRef = useRef(null);
  const { handleAddGrid, handleDeleteGrid, handleEditGrid, pharms } = useStore();
  const pharmsData = useStore((state) => state.pharms);
  const toolbarOptions = [
    { text: "إضافة", tooltipText: "إضافة", prefixIcon: "e-add", id: "add" },
    { text: "تعديل", tooltipText: "تعديل", prefixIcon: "e-edit", id: "edit" },
    { text: "حذف", tooltipText: "حذف", prefixIcon: "e-delete", id: "delete" },
    "Search",
    "Print",
    "ExcelExport",
  ];
  function toolbarClick(args) {
    switch (true) {
      case args.item.id.includes("print"):
        gridRef.current.print();
        break;
      case args.item.id.includes("excelexport"):
        gridRef.current.excelExport({
          fileName: "صيديلة.xlsx",
        });
        break;
      case args.item.id.includes("pdfexport"):
        break;
      case args.item.id.includes("add"):
        useStore.setState({
          modal: {
            isOpen: true,
            title: "إضافة صيديلة",
            content: "",
            children: <SignupInputsForm />,
            textBtn_1: "موافقة",
            textBtn_2: "إلغـــــاء",
            onClickBtn_1: (e) => {
              handleAddGrid(e, toast, "/api/pharms", "pharmInfo");
            },
            onClickBtn_2: (e) => {
              useStore.setState((state) => ({ modal: state.modalClosed }));
            },
          },
        });
        break;
      case args.item.id.includes("edit"):
        if (gridRef?.current?.getSelectedRecords()?.length > 0) {
          useStore.setState({
            pharmInfo: gridRef?.current?.getSelectedRecords()[0],
            modal: {
              isOpen: true,
              title: "تعديل صيديلة",
              content: "",
              children: <SignupInputsForm />,
              textBtn_1: "موافقة",
              textBtn_2: "إلغـــــاء",
              onClickBtn_1: (e) => {
                handleEditGrid(
                  e,
                  toast,
                  `/api/pharms/${gridRef?.current?.getSelectedRecords()[0]._id}`,
                  "pharmInfo"
                );
                // gridRef?.current?.refresh();
              },
              onClickBtn_2: (e) => {
                useStore.setState((state) => ({ modal: state.modalClosed }));
              },
            },
          });
        } else {
          useStore.setState({
            modal: {
              isOpen: true,
              title: "⚠️ خطأ في التعديل",
              content: " يرجى تحديد السطر المراد تعديله، لم يتم الظغط على أي سطر للتعديل",
            },
          });
        }
        break;
      case args.item.id.includes("delete"):
        if (gridRef?.current?.getSelectedRecords()?.length > 0) {
          useStore.setState({
            pharmInfo: gridRef?.current?.getSelectedRecords()[0],
            modal: {
              isOpen: true,
              title: "حذف صيديلة",
              content: "هل أنت متأكد من عملية الحذف!",
              textBtn_1: "موافقة",
              textBtn_2: "إلغـــــاء",
              onClickBtn_1: (e) => {
                handleDeleteGrid(
                  e,
                  toast,
                  `/api/pharms/${gridRef?.current?.getSelectedRecords()[0]._id}`,
                  "pharmInfo"
                );
                // gridRef?.current?.refresh();
              },
              onClickBtn_2: (e) => {
                useStore.setState((state) => ({ modal: state.modalClosed }));
              },
            },
          });
        } else {
          useStore.setState({
            modal: {
              isOpen: true,
              title: "⚠️ خطأ في الحذف",
              content: "يرجى تحديد السطر المراد حذفه، لم يتم الظغط على أي سطر للحذف",
            },
          });
        }
        break;
    }
  }
  function beforePrint(args) {
    let tbodyEle = gridRef.current.element
      .querySelector(".e-gridcontent .e-content tbody")
      .cloneNode(true);
    let arrOfChildren = tbodyEle.children;
    args.element
      .querySelector(".e-gridcontent .e-content tbody")
      .replaceChildren(...[].slice.call(arrOfChildren));
  }
  return (
    <div className='p-2 md:p-10'>
      <div className='mb-2 md:mb-4 md:mx-4 flex flex-wrap items-start justify-between'>
        <div className='card rounded-xl mx-auto grow md:grow-0 p-2 flex justify-center items-center'>
          عـــدد الصيديــــلات: <span className='text-sky-500 mr-1'>{pharms.length}</span>
        </div>
      </div>
      <div className=''>
        <GridComponent
          ref={gridRef}
          dataSource={pharmsData}
          enableHover={false}
          allowPaging
          allowExcelExport
          allowPdfExport
          allowSelection
          enableRtl
          height='100%'
          width='100%'
          locale='AR'
          pageSettings={{ pageSize: 10 }}
          toolbar={toolbarOptions}
          beforePrint={beforePrint}
          toolbarClick={toolbarClick}
          selectionSettings={{ type: "Multiple" }}
          allowResizing
          allowSorting
          allowReordering
          BorderLineStyle='Thin'
          // enablePersistence
        >
          <ColumnsDirective>
            {/* <ColumnDirective type='checkbox' width='50' /> */}
            <ColumnDirective
              field='name'
              headerText='الاسم'
              textAlign='center'
              headerTextAlign='center'
              width='250'
              template={pharmsGridName}
            />
            <ColumnDirective
              field='email'
              headerText='البريد الإلكتروني'
              textAlign='center'
              headerTextAlign='center'
              width='100'
            />
            <ColumnDirective
              field='phone.mobile'
              headerText='الهاتف'
              textAlign='center'
              headerTextAlign='center'
              width='100'
            />
            <ColumnDirective
              field='address?.wilaya?.text'
              headerText='الولاية'
              textAlign='center'
              headerTextAlign='center'
              width='80'
            />
            <ColumnDirective
              field='date'
              headerText='وقت التسجيل'
              textAlign='center'
              headerTextAlign='center'
              width='80'
              type='datetime'
              format='dd/MM/yyyy'
            />
          </ColumnsDirective>
          <Inject
            services={[
              Page,
              Resize,
              Selection,
              Reorder,
              Search,
              Toolbar,
              Edit,
              Sort,
              Filter,
              ExcelExport,
              PdfExport,
            ]}
          />
        </GridComponent>
      </div>
    </div>
  );
}

export default PharmsTable;
