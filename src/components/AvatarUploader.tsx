import {
  Box,
  Flex,
  Input as ThemeInput,
  Label,
  Image as ThemeImage,
} from "theme-ui";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useState } from "react";
import Button from "../components/Button";
import BackDrop from "../components/BackDrop";
import { base64ToFile } from "../utils/file-converter";

interface IProps {
  state: string;
  src: string;
  onChange: (payload: { base64: string; file?: File }) => void;
}

export const AvatarUploader = (props: IProps) => {
  const { state, src, onChange } = props;
  const [fileName, setFileName] = useState("");
  const [crop, setCrop] = useState<any>({
    x: 10,
    y: 10,
    width: 30,
    height: 30,
    aspect: 1,
    unit: "%",
  });
  const [edit, setEdit] = useState(false);

  const handleFileChanged = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setEdit(true);
      setFileName(e.target.files[0].name);
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => onChange({ base64: reader.result as string }),
        false
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCropChanged = (crop: any) => {
    setCrop(crop);
    getCroppedImg(src, crop);
  };

  const handleSaved = async () => {
    const base64 = window.localStorage.getItem(state) as string;
    const file = base64ToFile(base64, fileName);
    onChange({ base64, file });
    setEdit(false);
  };

  const getCroppedImg = (image: string, pixelCrop: any) => {
    const canvas = document.createElement("canvas");
    const reactCropElement = document.getElementsByClassName(
      "ReactCrop"
    ) as any;
    const reactCropWidth = reactCropElement[0].offsetWidth;
    const reactCropHeight = reactCropElement[0].offsetHeight;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image;
    canvas.width = img.width / (reactCropWidth / pixelCrop.width);
    canvas.height = img.height / (reactCropHeight / pixelCrop.height);

    img.onload = () => {
      ctx?.drawImage(
        img,
        pixelCrop.x * (img.width / reactCropWidth),
        pixelCrop.y * (img.height / reactCropHeight),
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
      const base64Image = canvas.toDataURL("image/jpeg");
      window.localStorage.setItem(state, base64Image);
    };
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Label
            htmlFor={state}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Flex
              sx={{ gap: 2, flexDirection: "column", alignItems: "center" }}
            >
              <ThemeImage
                sx={{
                  width: 150,
                  height: 150,
                  border: "1px solid",
                  borderColor: "primary",
                  cursor: "pointer",
                  borderRadius: 75,
                }}
                src={src}
              />
            </Flex>
          </Label>
        </Box>

        <ThemeInput
          sx={{ display: "none" }}
          type="file"
          name="photo"
          id={state}
          onChange={handleFileChanged}
        />
      </Box>
      <BackDrop hidden={!edit}>
        <Flex
          sx={{
            width: "100%",
            height: 333,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReactCrop
            style={{
              position: "relative",
              backgroundColor: "#fff",
              border: "2px solid #fff",
              maxWidth: 600,
            }}
            src={src}
            crop={crop}
            onChange={handleCropChanged}
            circularCrop
          >
            <Box
              sx={{
                position: "absolute",
                bottom: 1,
                right: 1,
                zIndex: 100,
              }}
            >
              <Button borderWidth={2} text="Cắt" onClick={handleSaved} />
            </Box>
          </ReactCrop>
        </Flex>
      </BackDrop>
    </>
  );
};

export default AvatarUploader;
