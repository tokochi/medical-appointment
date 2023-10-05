"use client";
import ReactQuill from "react-quill";
import { DropInput, IconInput, SelectInput } from "@components/inputs";
import { storage } from "@utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-quill/dist/quill.snow.css"; // Import styles
import "./styles.css";
import Image from "next/image";
import { useStore } from "@context/store";
const PostsEditor = () => {
  const {
    editedPost,
    handleInputChange,
    medicalSpecialties,
    uploadSingleImage,
    uploadDone,
    handleSelectInput,
    loadingSppiner,
  } = useStore();

  const handleChange = (html) => {

    useStore.setState((state) => ({ editedPost: { ...state.editedPost, text: html } }));
  };

  return (
    <div>
      {/* <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
        المعلومات المهنية
      </div> */}
      <div className='p-2 flex flex-col gap-2 justify-center'>
        <div id='phone' className=''>
          <IconInput
            icon='/images/inscription.png'
            name='title'
            value={editedPost?.title}
            onChange={(e) => handleInputChange(e, "editedPost")}
            type='text'
            placeholder='العنوان'
            label='العنوان:'
          />
        </div>
        <div id='main-speciality' className=''>
          <SelectInput
            name='speciality'
            value={editedPost?.speciality?.value}
            onChange={(e) => handleSelectInput(e, "editedPost")}
            options={medicalSpecialties}
            option_value='value'
            option_text='text'
            placeholder='التخصص'
            label='التخصص :'
          />
        </div>
        <div id='avatar' className='flex gap-2 justify-center items-center min-w-[250px]'>
          <DropInput
            id='12'
            name='image'
            accept='image/*'
            completed={uploadDone?.image}
            loader={loadingSppiner?.image}
            onChange={(e) =>
              uploadSingleImage(
                e,
                ref,
                uploadBytes,
                getDownloadURL,
                storage,
                `posts/${editedPost?.title}/`,
                "editedPost"
              )
            }
            label='الصورة الشخصية: '
          />
          <div className='pt-4'>
            <div className=' '>
              {editedPost?.image && (
                <button
                  name={editedPost?.image}
                  onClick={(e) =>
                    useStore.setState((state) => ({
                      editedPost: { ...state.editedPost, image: "images/logo.png" },
                    }))
                  }>
                  <svg
                    className='w-6 h-6 z-20 relative top-2 select-none pointer-events-none'
                    viewBox='0 0 24 24'>
                    <path
                      d='M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M16.707,15.293 c0.391,0.391,0.391,1.023,0,1.414C16.512,16.902,16.256,17,16,17s-0.512-0.098-0.707-0.293L12,13.414l-3.293,3.293 C8.512,16.902,8.256,17,8,17s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L10.586,12L7.293,8.707 c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L12,10.586l3.293-3.293c0.391-0.391,1.023-0.391,1.414,0 s0.391,1.023,0,1.414L13.414,12L16.707,15.293z'
                      fill='#7D7D7D'
                    />
                  </svg>
                </button>
              )}
              <Image
                className='rounded-xl w-auto h-auto'
                src={editedPost?.image || "images/logo.png"}
                width={70}
                height={70}
                alt='avatar'
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <ReactQuill
          value={editedPost?.text}
          onChange={handleChange}
          modules={PostsEditor.modules}
          formats={PostsEditor.formats}
        />
      </div>
    </div>
  );
};

// Define modules and formats (you can customize these as needed)
PostsEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
PostsEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

/*
 * PropType validation
 */
// PostsEditor.propTypes = {
//   placeholder: PropTypes.string,
// };
export default PostsEditor;
