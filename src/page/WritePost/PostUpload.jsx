import { useState } from "react";
import { Model } from "../../components/common/Model/Model";
import AWS from "../../config/awsConfig";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { BlogWrite, editBlog } from "../../service/quiries/UserAuth";
import toast, { Toaster } from "react-hot-toast";
import { Loading } from "../../components/common/Loading/Loading";

export const PostUpload = ({
  isOpen,
  closeModel,
  contentData,
  url,
  writeType,
}) => {
  const [blogContent, setBlogContent] = useState(contentData || {});
  const [isWriteLoading, setIsWriteLoading] = useState(false);
  // const [imageFile, setImageFile] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const {
    mutateAsync: BlogSend,
    // isLoading: BlogLoading,
  } = useMutation({
    mutationFn: BlogWrite,
    onSuccess: () => {
      closeModel();
      setIsWriteLoading(false);
      toast.success("Blog posted successfully");
      navigate("/");
    },
    onError: (error) => {
      // closeModel();
      toast.error("Something went wrong, please try again");
      setIsWriteLoading(false);
      console.log(error);
    },
  });

  const {
    mutateAsync: editUserBlog,
    // isLoading: editBlogLoading,
  } = useMutation({
    mutationFn: editBlog,
    onSuccess: () => {
      closeModel();
      setIsWriteLoading(false);
      navigate("/");
    },
    onError: (error) => {
      toast.error("Something went wrong, please try again");
      setIsWriteLoading(false);
      console.log(error);
    },
  });

  const handleTitleChange = (e) => {
    setBlogContent((prevData) => ({
      ...prevData,
      blogHeader: {
        ...prevData.blogHeader,
        header: {
          ...prevData.blogHeader.header,
          data: {
            ...prevData.blogHeader.header.data,
            text: e.target.value,
          },
        },
      },
    }));
  };

  const handleParagraphChange = (e) => {
    setBlogContent((prevData) => ({
      ...prevData,
      blogHeader: {
        ...prevData.blogHeader,
        paragraph: {
          ...prevData.blogHeader.paragraph,
          data: {
            ...prevData.blogHeader.paragraph.data,
            text: e.target.value,
          },
        },
      },
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // setImageFile(file);
      setIsUploading(true);

      const uploadResult = await handleUpload(file);
      if (uploadResult.success) {
        setBlogContent((prevData) => ({
          ...prevData,
          blogHeader: {
            ...prevData.blogHeader,
            image: {
              data: {
                url: uploadResult.file.url,
              },
            },
          },
        }));
      }

      setIsUploading(false);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;

    const params = {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: file.name,
      Body: file,
      ContentType: file.type || "image/png",
    };

    try {
      const parallelUploadS3 = new AWS.S3.ManagedUpload({ params });

      // Start the upload
      const data = await parallelUploadS3.promise();

      // Reset states after upload completes
      return {
        success: 1,
        file: {
          url: data.Location,
        },
      };
    } catch (error) {
      // Handle errors
      console.error("Error uploading file:", error);
      return {
        success: 0,
        file: {
          url: "",
        },
      };
    }
  };

  const handlePublish = async () => {
    try {
      // loading start
      setIsWriteLoading(true);

      if (writeType === "edit") {
        await editUserBlog({
          params: url,
          body: blogContent,
        });
      } else {
        await BlogSend(blogContent);
      }
    } catch (error) {
      setIsWriteLoading(false);
      console.log(error, "error");
    }
  };

  return (
    <Model type={"pop-up-full"} isOpen={isOpen} closeModel={closeModel}>
      {blogContent ? (
        <div className="w-full h-full flex flex-col md:flex-row gap-3 md:gap-2">
          <div className="w-full flex flex-col gap-4 justify-between">
            <div className="w-full h-full flex flex-col gap-2">
              <img
                className={
                  "block mx-auto w-full h-full max-w-[400px] max-h-[350px] rounded bg-black-25"
                }
                src={
                  blogContent?.blogHeader?.image?.data?.url ||
                  blogContent?.blogHeader?.image?.data?.file?.url ||
                  ""
                }
              />
              <div className="w-full flex flex-row justify-end gap-2">
                {!isChange ? (
                  <button
                    onClick={() => setIsChange(!isChange)}
                    className="w-fit px-3 py-1 font-Golos text-xs font-normal rounded-12 text-black-500 border border-black-500"
                  >
                    Change
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setIsChange(!isChange)}
                      className="w-fit px-3 py-1 font-Golos text-xs font-normal rounded-12 text-black-500 border border-black-500"
                    >
                      Change
                    </button>
                    <button
                      onClick={() => setIsChange(!isChange)}
                      className="w-fit px-3 py-1 font-Golos text-xs font-normal rounded-12 text-black-500 border border-black-500"
                    >
                      Change
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
            {isUploading && <p>Uploading...</p>}

            <p className="w-full font-Golos text-[10px] text-normal text-black-300">
              Changes here will affect how your story appears in public places
              like blog's homepage and in subscribers’ inboxes — not the
              contents of the story itself.
            </p>
          </div>

          <div className="w-full h-full flex flex-col justify-between gap-4 md:px-4">
            <div className="w-full h-fit flex flex-col gap-4">
              <input
                placeholder="Please enter your blog title.."
                value={blogContent?.blogHeader?.header?.data?.text || ""}
                onChange={handleTitleChange}
                className="w-full px-2 py-3 rounded font-Golos text-base font-normal text-black-500 border border-black-50 "
              />

              <textarea
                placeholder="Please enter your blog title.."
                value={blogContent?.blogHeader?.paragraph?.data?.text || ""}
                onChange={handleParagraphChange}
                className="w-full min-h-[100px] p-2 rounded font-Golos text-xs font-normal text-black-700 border border-black-50 "
              />
            </div>

            <div className="w-full flex flex-row justify-end gap-2">
              <button
                onClick={() => closeModel()}
                className="w-fit py-2 px-4 rounded-full font-Golos text-xs capitalize transform duration-200 text-green-200 border border-white hover:border-green-200"
              >
                cancel
              </button>
              <button
                onClick={handlePublish}
                disabled={isWriteLoading}
                className={`w-fit min-w-24 px-2 flex flex-row gap-1 justify-center items-center whitespace-nowrap rounded-full font-Golos text-xs transform duration-200 capitalize text-white bg-green-200 hover:bg-green-300 active:bg-green-500 ${
                  isWriteLoading && "bg-green-300"
                }`}
              >
                {writeType === "edit" ? "Update" : "Publish"}
                {isWriteLoading && <Loading />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="block m-auto font-Golos text-sm text-normal text-black-500">
          Loading...
        </p>
      )}
      <Toaster />
    </Model>
  );
};
