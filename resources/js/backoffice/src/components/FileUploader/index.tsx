import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import useFileUploader from "./useFileUploader";
import React from "react";
import Swal from "sweetalert2";
import { HelperFunction } from "../../helpers/HelpersFunction";

export interface FileType extends File {
    preview?: string;
    formattedSize?: string;
}

interface FileUploaderProps extends ChildrenProps {
    onFileUpload?: (files: FileType[]) => void;
    onFileDelete: (index: any) => void;
    showPreview?: boolean;
    multipleUploads?: boolean;
    singleFile?: boolean;
}

type ChildrenProps = {
    icon?: string;
    text?: string;
    textClass?: string;
    extraText?: string;
    classname?: string;
    prevData?: any;
    maxSizeParms?: any;
    handleDeletePrevImage: (parms: any, idx: any) => void;
    detailData: any
};

const FileUploader = ({
    showPreview = true,
    onFileUpload,
    onFileDelete,
    maxSizeParms = import.meta.env.VITE_REACT_APP_MAX_UPLOAD_SIZE,
    icon,
    text,
    singleFile = false,
    multipleUploads = true,
    prevData,
    handleDeletePrevImage,
    detailData = '',
}: FileUploaderProps) => {
    const { selectedFiles, handleAcceptedFiles, removeFile } =
        useFileUploader(showPreview);
    const maxSize = maxSizeParms * 1024 * 1024; // 2MB in bytes

    const validateFiles = (acceptedFiles: File[]) => {
        const validFiles = acceptedFiles.filter((file) => file.size <= maxSize);
        const invalidFiles = acceptedFiles.filter(
            (file) => file.size > maxSize,
        );

        if (invalidFiles.length > 0) {
            Swal.fire(
                "warning",
                `Beberapa file tidak diunggah karena ukurannya lebih dari ${import.meta.env.VITE_REACT_APP_MAX_UPLOAD_SIZE}MB.`,
                "warning",
            );
        }


        handleAcceptedFiles(validFiles, onFileUpload);
    };


  
    return (
        <>
            <Dropzone
                disabled={singleFile ? selectedFiles.length > 0 : false}
                multiple={multipleUploads}
                onDropAccepted={(acceptedFiles) => validateFiles(acceptedFiles)}
            >
                {({ getRootProps, getInputProps }) => (
                    <div
                        className="dropzone flex justify-center items-center"
                        {...getRootProps()}
                    >
                        <div className="fallback">
                            <input
                                {...getInputProps()}
                                name="file"
                                type="file"
                                multiple
                            />
                        </div>
                        <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                        >
                            <div
                                className="mb-3"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <i className={icon}></i>
                            </div>
                            <h5 className="text-xl text-gray-600 dark:text-gray-200">
                                {text}
                            </h5>
                        </div>
                    </div>
                )}
            </Dropzone>

            {((showPreview && selectedFiles.length > 0) || prevData) && (
                <div>
                    {(selectedFiles || []).map((file, idx) => (
                        <React.Fragment key={idx}>
                            <div className="border rounded-md border-gray-200 p-3 mb-2 dark:border-gray-600 mt-2">
                                <div className="float-right">
                                    <Link to="" className="btn btn-link">
                                        <i
                                            className="ri-close-line text-lg"
                                            onClick={() => {removeFile(file), onFileDelete(idx)}}
                                        ></i>
                                    </Link>
                                </div>

                                <div className="flex items-center gap-3">
                                    {file.preview && (
                                        <img
                                            data-dz-thumbnail=""
                                            className="h-12 w-12 rounded bg-light"
                                            style={{ objectFit: "cover" }}
                                            alt={file.name}
                                            src={file.preview}
                                        />
                                    )}
                                    {!file.preview && (
                                        <span className="flex items-center justify-center bg-primary/10 text-primary font-semibold rounded-md w-12 h-12">
                                            {file.type.split("/")[0]}
                                        </span>
                                    )}
                                    <div>
                                        <Link to="" className="font-semibold">
                                            {file.name}
                                        </Link>
                                        <p>{file.formattedSize}</p>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}

                    {prevData?.map((file: any, idx: any) => (
                        <React.Fragment key={file?.id}>
                            <div className="border rounded-md border-gray-200 p-3 mb-2 dark:border-gray-600 mt-2">
                            <div className="float-right">
                                    <Link to="" className="btn btn-link">
                                        <i
                                            className="ri-close-line text-lg"
                                            onClick={() => {handleDeletePrevImage(file?.id, idx)}}
                                        ></i>
                                    </Link>
                                </div>
                        
                                <div className="flex items-center gap-3">
                                    {file.image && (
                                        <img
                                            data-dz-thumbnail=""
                                            className="h-12 w-12 rounded bg-light"
                                            style={{ objectFit: "cover" }}
                                            alt={file.name}
                                            src={HelperFunction.GetImage(file.image)}
                                        />
                                    )}
                                    
                                <div>
                                        <Link to="" className="font-semibold">
                                            Foto {detailData?.name}  { idx + 1 } 
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </React.Fragment>
                    ))}
                </div>
            )}
        </>
    );
};

export { FileUploader };
