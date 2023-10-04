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
import { useEffect, useRef, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useStore } from "@context/store";
import Localization from "../../utils/Localization";
import LabsGridName from "@components/table/templates/labs/LabName";
import SignupInputsForm from "@components/forms/lab/SignupInputsForm";

function LabsTable() {
  // ******** Get Labs List  ********
  Localization("مختبر");
  // ******** Column Templates  ********
  const labsGridName = (props) => <LabsGridName {...props} />;
  // ******** Grid Table  ********
  const [active, setActive] = useState({ all: true, sub: false });
  const gridRef = useRef(null);
  const { labs, handleAddGrid, handleDeleteGrid, handleEditGrid } = useStore();

  const labsData = useStore((state) => state.labs).filter((lab) => filterLab(lab));
  const SubscribedLabs = useStore((state) => state.labs).filter((lab) => lab.subscription != null);
  function filterLab(lab) {
    if (active.all === true) {
      return lab === lab;
    }
    if (active.sub === true) {
      return lab.subscription != null;
    }
  }
  const toolbarOptions = [
    { text: "إضافة", tooltipText: "إضافة", prefixIcon: "e-add", id: "add" },
    { text: "تعديل", tooltipText: "تعديل", prefixIcon: "e-edit", id: "edit" },
    { text: "حذف", tooltipText: "حذف", prefixIcon: "e-delete", id: "delete" },
    "Search",
    "Print",
    "ExcelExport",
  ];

  function filterLab(lab) {
    if (active.all === true) {
      return lab === lab;
    }
    if (active.sub === true) {
      return lab.sub > 0;
    }
  }
  function toolbarClick(args) {
    switch (true) {
      case args.item.id.includes("print"):
        gridRef.current.print();
        break;
      case args.item.id.includes("excelexport"):
        gridRef.current.excelExport({
          fileName: "الأطباء.xlsx",
        });
        break;
      case args.item.id.includes("pdfexport"):
        break;
      case args.item.id.includes("add"):
        useStore.setState({
          modal: {
            isOpen: true,
            title: "إضافة مختبر",
            content: "",
            children: <SignupInputsForm />,
            textBtn_1: "موافقة",
            textBtn_2: "إلغـــــاء",
            onClickBtn_1: (e) => {
              handleAddGrid(e, toast, "/api/labs", "labInfo");
              // gridRef?.current?.refresh();
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
            labInfo: gridRef?.current?.getSelectedRecords()[0],
            modal: {
              isOpen: true,
              title: "تعديل مختبر",
              content: "",
              children: <SignupInputsForm />,
              textBtn_1: "موافقة",
              textBtn_2: "إلغـــــاء",
              onClickBtn_1: (e) => {
                handleEditGrid(
                  e,
                  toast,
                  `/api/labs/${gridRef?.current?.getSelectedRecords()[0]._id}`,"labInfo"
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
        console.log(gridRef?.current?.getSelectedRecords()[0]);
        if (gridRef?.current?.getSelectedRecords()?.length > 0) {
          useStore.setState({
            labInfo: gridRef?.current?.getSelectedRecords()[0],
            modal: {
              isOpen: true,
              title: "حذف مختبر",
              content: "هل أنت متأكد من عملية الحذف!",
              textBtn_1: "موافقة",
              textBtn_2: "إلغـــــاء",
              onClickBtn_1: (e) => {
                handleDeleteGrid(
                  e,
                  toast,
                  `/api/labs/${gridRef?.current?.getSelectedRecords()[0]._id}`,
                  "labInfo"
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
        {/* <ul className='flex w-full md:w-auto justify-center items-center'>
          <li className='m-1 '>
            <button
              className={`${active.all ? "btn-active" : "btn-disable"} flex gap-1`}
              onClick={() => {
                setActive((state) => ({ all: true, sub: false }));
              }}>
              الكُّل <span className='ml-1 text-indigo-200'>{labs.length}</span>
            </button>
          </li>
          <li className='m-1 flex'>
            <button
              className={`${active.sub ? "btn-active" : "btn-disable"} flex gap-1`}
              onClick={() => {
                setActive((state) => ({ all: false, sub: true }));
              }}>
              المشتركين <span className='ml-1  text-sky-600'>{SubscribedLabs.length}</span>
            </button>
          </li>
        </ul> */}
        <div className='card rounded-xl mx-auto grow md:grow-0 p-2 flex justify-center items-center'>
          عـــدد المختبـــرات: <span className='text-sky-500 mr-1'>{labs.length}</span>
        </div>
      </div>
      <div className=''>
        <GridComponent
          ref={gridRef}
          dataSource={labsData}
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
              template={labsGridName}
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
              field='address.wilaya.text'
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

export default LabsTable;
