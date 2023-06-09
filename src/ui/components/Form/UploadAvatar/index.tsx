import styles from "./styles.module.scss";
import React, { useRef, useState } from "react";
import { HiOutlineCamera, HiPencilAlt } from "react-icons/hi";

interface FileInputProps {
  onFileChange: (file: File) => void;
  className?: string;
}

function UploadAvatar({ onFileChange, className }: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        onFileChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageMouseEnter = () => {
    setIsHovered(true);
  };

  const handleImageMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={styles.inputWrapper + " " + className}>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        ref={fileInputRef}
        className={styles.fileInput}
        onMouseEnter={handleImageMouseEnter}
        onMouseLeave={handleImageMouseLeave}
        onChange={handleFileInputChange}
      />
      {selectedImage ? (
        <div
          style={{
            backgroundImage: `url(${selectedImage})`,
          }}
          className={styles.backgroundImage}
        >
          {isHovered && (
            <div className={styles.hoverMessage}>
              Editar imagem <HiPencilAlt size={16} />
            </div>
          )}
        </div>
      ) : (
        <>
          <HiOutlineCamera size={80} />
          <p>
            <span>Escolha</span> uma foto ou <span>arraste</span> ela aqui.
          </p>
        </>
      )}
    </div>
  );
}

export default UploadAvatar;
