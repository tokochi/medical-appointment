"use client";
import React from "react";
import { useStore } from "@context/store";
import Image from "next/image";
import PostsEditor from "@components/forms/post/PostsEditor";
import toast from "react-hot-toast";
import ShowPost from "@components/cards/ShowPost";
import { usePathname } from "next/navigation";
function PostsTable() {
  const path = usePathname();
  const { posts, handlePostUpdate, handlePostDelete, handleAddPost } = useStore();
  return (
    <div className=''>
      <div className='p-4 flex flex-wrap gap-4'>
        <button
          onClick={() =>
            useStore.setState({
              editedPost: {
                text: "",
                image: "/images/logo.webp",
                speciality: {},
                title: "",
              },
              modal: {
                isOpen: true,
                title: "إضــافة مقال",
                content: "",
                children: <PostsEditor />,
                textBtn_1: "موافقة",
                textBtn_2: "إلغـــــاء",
                onClickBtn_1: (e) => {
                  handleAddPost(toast);
                },
                onClickBtn_2: (e) => {
                  useStore.setState((state) => ({ modal: state.modalClosed }));
                },
              },
            })
          }
          className='btn2 p-1 grow md:grow-0'>
          إضـــــــــافة مقال ➕{" "}
        </button>
        <div className='card   rounded-xl mx-auto grow md:grow-0 p-2 flex justify-center items-center'>
          عـــدد المقــــــــالات: <span className='text-sky-500 mr-1'>{posts?.length}</span>
        </div>
      </div>
      <div className=' flex flex-wrap gap-2 justify-center items-center'>
        {posts.length === 0 && (
          <div className='bg-sky-50 w-full dark:bg-primary m-4 md:m-4 rounded '>
            <div className='card rounded-lg p-4  m-10 text-xl font-semibold'>
              لايوجد أي مقال طبي خاص بك
            </div>
          </div>
        )}
        {posts.map((post, index) => {
          if (path === "doctor/posts" && post.author === session?._id) {
            return (
              <div
                key={index}
                className='relative card p-4 max-w-[270px] rounded-md flex flex-col gap-2'>
                <div className='absolute top-[-10px] z-50 flex gap-4'>
                  <button
                    onClick={() =>
                      useStore.setState({
                        editedPost: post,
                        modal: {
                          isOpen: true,
                          title: "حذف مقال",
                          content: "هل أنت متأكد من عملية الحذف!",
                          textBtn_1: "موافقة",
                          textBtn_2: "إلغـــــاء",
                          onClickBtn_1: (e) => {
                            handlePostDelete(toast, post?._id);
                            // gridRef?.current?.refresh();
                          },
                          onClickBtn_2: (e) => {
                            useStore.setState((state) => ({ modal: state.modalClosed }));
                          },
                        },
                      })
                    }>
                    <svg
                      //   onClick={(e) => e.stopPropagation()}
                      className='w-6 h-6 fill-cyan-800'
                      viewBox='0 0 48 48'>
                      <path d='M24,4C12.954,4,4,12.954,4,24c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20C44,12.954,35.046,4,24,4z M31.561,29.439c0.586,0.586,0.586,1.535,0,2.121C31.268,31.854,30.884,32,30.5,32s-0.768-0.146-1.061-0.439L24,26.121l-5.439,5.439C18.268,31.854,17.884,32,17.5,32s-0.768-0.146-1.061-0.439c-0.586-0.586-0.586-1.535,0-2.121L21.879,24l-5.439-5.439c-0.586-0.586-0.586-1.535,0-2.121s1.535-0.586,2.121,0L24,21.879l5.439-5.439c0.586-0.586,1.535-0.586,2.121,0s0.586,1.535,0,2.121L26.121,24L31.561,29.439z' />
                    </svg>
                  </button>
                  <button
                    onClick={(e) =>
                      useStore.setState({
                        editedPost: post,
                        modal: {
                          isOpen: true,
                          title: "تعديل مقال",
                          content: "",
                          children: (
                            <div>
                              <PostsEditor post={post} />
                            </div>
                          ),
                          textBtn_1: "موافقة",
                          textBtn_2: "إلغـــــاء",
                          onClickBtn_1: (e) => {
                            handlePostUpdate(toast, post?._id);
                          },
                          onClickBtn_2: (e) => {
                            useStore.setState((state) => ({ modal: state.modalClosed }));
                          },
                        },
                      })
                    }>
                    <svg
                      //   onClick={(e) => e.stopPropagation()}
                      className='w-6 h-6 fill-cyan-800'
                      viewBox='0 0 48 48'>
                      <path d='M38.657 18.536l2.44-2.44c2.534-2.534 2.534-6.658 0-9.193-1.227-1.226-2.858-1.9-4.597-1.9s-3.371.675-4.597 1.901l-2.439 2.439L38.657 18.536zM27.343 11.464L9.274 29.533c-.385.385-.678.86-.848 1.375L5.076 41.029c-.179.538-.038 1.131.363 1.532C5.726 42.847 6.108 43 6.5 43c.158 0 .317-.025.472-.076l10.118-3.351c.517-.17.993-.463 1.378-.849l18.068-18.068L27.343 11.464z' />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={(e) =>
                    useStore.setState({
                      modal: {
                        isOpen: true,
                        title: post?.title,
                        children: <ShowPost post={post} />,
                      },
                    })
                  }>
                  <div className='relative w-60 h-40'>
                    <Image src={post?.image} className='rounded-xl' fill alt='image' />
                  </div>
                  <h2 id='title' className='font-bold truncate  text-sky-500'>
                    {post?.title}
                  </h2>
                </button>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className='relative card p-4 max-w-[270px] rounded-md flex flex-col gap-2'>
                <div className='absolute top-[-10px] z-50 flex gap-4'>
                  <button
                    onClick={() =>
                      useStore.setState({
                        editedPost: post,
                        modal: {
                          isOpen: true,
                          title: "حذف مقال",
                          content: "هل أنت متأكد من عملية الحذف!",
                          textBtn_1: "موافقة",
                          textBtn_2: "إلغـــــاء",
                          onClickBtn_1: (e) => {
                            handlePostDelete(toast, post?._id);
                            // gridRef?.current?.refresh();
                          },
                          onClickBtn_2: (e) => {
                            useStore.setState((state) => ({ modal: state.modalClosed }));
                          },
                        },
                      })
                    }>
                    <svg
                      //   onClick={(e) => e.stopPropagation()}
                      className='w-6 h-6 fill-cyan-800'
                      viewBox='0 0 48 48'>
                      <path d='M24,4C12.954,4,4,12.954,4,24c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20C44,12.954,35.046,4,24,4z M31.561,29.439c0.586,0.586,0.586,1.535,0,2.121C31.268,31.854,30.884,32,30.5,32s-0.768-0.146-1.061-0.439L24,26.121l-5.439,5.439C18.268,31.854,17.884,32,17.5,32s-0.768-0.146-1.061-0.439c-0.586-0.586-0.586-1.535,0-2.121L21.879,24l-5.439-5.439c-0.586-0.586-0.586-1.535,0-2.121s1.535-0.586,2.121,0L24,21.879l5.439-5.439c0.586-0.586,1.535-0.586,2.121,0s0.586,1.535,0,2.121L26.121,24L31.561,29.439z' />
                    </svg>
                  </button>
                  <button
                    onClick={(e) =>
                      useStore.setState({
                        editedPost: post,
                        modal: {
                          isOpen: true,
                          title: "تعديل مقال",
                          content: "",
                          children: (
                            <div>
                              <PostsEditor post={post} />
                            </div>
                          ),
                          textBtn_1: "موافقة",
                          textBtn_2: "إلغـــــاء",
                          onClickBtn_1: (e) => {
                            handlePostUpdate(toast, post?._id);
                          },
                          onClickBtn_2: (e) => {
                            useStore.setState((state) => ({ modal: state.modalClosed }));
                          },
                        },
                      })
                    }>
                    <svg
                      //   onClick={(e) => e.stopPropagation()}
                      className='w-6 h-6 fill-cyan-800'
                      viewBox='0 0 48 48'>
                      <path d='M38.657 18.536l2.44-2.44c2.534-2.534 2.534-6.658 0-9.193-1.227-1.226-2.858-1.9-4.597-1.9s-3.371.675-4.597 1.901l-2.439 2.439L38.657 18.536zM27.343 11.464L9.274 29.533c-.385.385-.678.86-.848 1.375L5.076 41.029c-.179.538-.038 1.131.363 1.532C5.726 42.847 6.108 43 6.5 43c.158 0 .317-.025.472-.076l10.118-3.351c.517-.17.993-.463 1.378-.849l18.068-18.068L27.343 11.464z' />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={(e) =>
                    useStore.setState({
                      modal: {
                        isOpen: true,
                        title: post?.title,
                        children: <ShowPost post={post} />,
                      },
                    })
                  }>
                  <div className='relative w-60 h-40'>
                    <Image src={post?.image} className='rounded-xl' fill alt='image' />
                  </div>
                  <h2 id='title' className='font-bold truncate  text-sky-500'>
                    {post?.title}
                  </h2>
                </button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default PostsTable;
