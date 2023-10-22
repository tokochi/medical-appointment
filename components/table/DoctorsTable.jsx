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
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { useStore } from "@context/store";
import Localization from "../../utils/Localization";
import Status from "@components/table/templates/doctors/DoctorStatus";
import DoctorsGridName from "@components/table/templates/doctors/DoctorName";
import SignupInputsForm from "@components/forms/doctor/SignupInputsForm";
import DoctorSub from "@components/cards/DoctorSub";

function DoctorsTable() {
  // ******** Get Doctors List  ********
  Localization("اطباء");
  // ******** Column Templates  ********
  const doctorsGridStatus = (props) => <Status {...props} />;
  const doctorsGridName = (props) => <DoctorsGridName {...props} />;
  // ******** Grid Table  ********
  const [active, setActive] = useState({ all: true, sub: false });
  const gridRef = useRef(null);
  const { doctors, handleAddGrid, handleDeleteGrid, handleEditGrid, handleSubGrid } = useStore();
  const doctorsData = useStore((state) => state.doctors)
    .filter((doctor) => filterDoctor(doctor))
    ;
  const SubscribedDoctors = useStore((state) => state.doctors).filter(
    (doctor) => doctor?.subscription != null
  );
  function filterDoctor(doctor) {
    if (active.all === true) {
      return doctor === doctor;
    }
    if (active.sub === true) {
      return doctor.subscription != null;
    }
  }
  const toolbarOptions = [
    { text: "إشتراك", tooltipText: "إشتراك", prefixIcon: "e-timeline-agenda", id: "sub" },
    { text: "إضافة", tooltipText: "إضافة", prefixIcon: "e-add", id: "add" },
    { text: "تعديل", tooltipText: "تعديل", prefixIcon: "e-edit", id: "edit" },
    { text: "حذف", tooltipText: "حذف", prefixIcon: "e-delete", id: "delete" },
    "Search",
    "Print",
    "ExcelExport",
  ];

  function filterDoctor(doctor) {
    if (active.all === true) {
      return doctor === doctor;
    }
    if (active.sub === true) {
      return doctor.sub > 0;
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
            title: "إضافة طبيب",
            content: "",
            children: <SignupInputsForm />,
            textBtn_1: "موافقة",
            textBtn_2: "إلغـــــاء",
            onClickBtn_1: (e) => {
              handleAddGrid(e, toast, "/api/doctors", "doctorInfo");
              // gridRef?.current?.refresh();
            },
            onClickBtn_2: (e) => {
              useStore.setState((state) => ({ modal: state.modalClosed }));
            },
          },
        });
        break;
      case args.item.id.includes("sub"):
        const selectedDoctor = gridRef?.current?.getSelectedRecords()[0];
        if (selectedDoctor) {
          useStore.setState({
            doctorInfo:
              selectedDoctor.subscription == null
                ? {
                    _id: gridRef?.current?.getSelectedRecords()[0]._id,
                    subscription: {
                      startDate: moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                      endDate: moment().add(1, "years").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                    },
                  }
                : selectedDoctor,
            modal: {
              isOpen: true,
              title: "إضافة إشتراك",
              content: "",
              children: <DoctorSub doctor={gridRef?.current?.getSelectedRecords()[0]} />,
              textBtn_1: "موافقة",
              textBtn_2: "إلغـــــاء",
              onClickBtn_1: (e) => {
                handleSubGrid(
                  e,
                  toast,
                  `/api/doctors/${gridRef?.current?.getSelectedRecords()[0]._id}`,
                  "doctorInfo",
                  selectedDoctor.subscription == null ? "إضافة" : "تعديل",
                  gridRef?.current?.getSelectedRecords()[0]._id
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

      case args.item.id.includes("edit"):
        if (gridRef?.current?.getSelectedRecords()?.length > 0) {
          useStore.setState({
            doctorInfo: gridRef?.current?.getSelectedRecords()[0],
            modal: {
              isOpen: true,
              title: "تعديل طبيب",
              content: "",
              children: <SignupInputsForm />,
              textBtn_1: "موافقة",
              textBtn_2: "إلغـــــاء",
              onClickBtn_1: (e) => {
                handleEditGrid(
                  e,
                  toast,
                  `/api/doctors/${gridRef?.current?.getSelectedRecords()[0]._id}`,
                  "doctorInfo"
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
            doctorInfo: gridRef?.current?.getSelectedRecords()[0],
            modal: {
              isOpen: true,
              title: "حذف طبيب",
              content: "هل أنت متأكد من عملية الحذف!",
              textBtn_1: "موافقة",
              textBtn_2: "إلغـــــاء",
              onClickBtn_1: (e) => {
                handleDeleteGrid(
                  e,
                  toast,
                  `/api/doctors/${gridRef?.current?.getSelectedRecords()[0]._id}`,
                  "doctorInfo"
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
        <ul className='flex w-full md:w-auto justify-center items-center'>
          <li className='m-1 '>
            <button
              className={`${active.all ? "btn-active" : "btn-disable"} flex gap-1`}
              onClick={() => {
                setActive((state) => ({ all: true, sub: false }));
              }}>
              الكُّل <span className='ml-1 text-indigo-200'>{doctors.length}</span>
            </button>
          </li>
          <li className='m-1 flex'>
            <button
              className={`${active.sub ? "btn-active" : "btn-disable"} flex gap-1`}
              onClick={() => {
                setActive((state) => ({ all: false, sub: true }));
              }}>
              المشتركين <span className='ml-1  text-green-600'>{SubscribedDoctors.length}</span>
            </button>
          </li>
        </ul>
        <div className='card rounded-xl mx-auto grow md:grow-0 p-2 flex justify-center items-center'>
          عـــدد الأطبــــاء: <span className='text-sky-500 mr-1'>{doctors.length}</span>
        </div>
      </div>
      <div className=''>
        <GridComponent
          ref={gridRef}
          dataSource={active.sub ? SubscribedDoctors : doctorsData}
          enableHover={false}
          allowPaging
          allowExcelExport
          allowPdfExport
          allowSelection
          enableRtl
          height='100%'
          width='100%'
          locale='ar-DZ'
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
              template={doctorsGridName}
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
            <ColumnDirective
              field='status'
              headerText='الحالة'
              textAlign='center'
              headerTextAlign='center'
              width='100'
              template={doctorsGridStatus}
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

export default DoctorsTable;
